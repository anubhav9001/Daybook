'use strict';
// Daybook for Outlook — the task pane. It talks only to Daybook on this PC (http://127.0.0.1) and to Outlook.
// It reads the open email when the user asks, fills in text the user reviews, and never sends email.
(() => {
  const PORTS = [47812, 47813, 47814, 47815, 47816];
  const TOKEN_KEY = 'daybook-token';
  const CATEGORIES = {
    reply: { name: 'Daybook · Needs reply', text: 'Needs a reply', color: 'Preset4' },
    info: { name: 'Daybook · For your info', text: 'For your info', color: 'Preset7' },
    other: { name: 'Daybook · Other', text: 'Other', color: 'Preset12' }
  };
  const $ = id => document.getElementById(id);
  let base = '', view = new URLSearchParams(location.search).get('view') || 'reply', lastSummary = null, streamAbort = null;

  // ---- small helpers
  const show = (id, on = true) => $(id).classList.toggle('hidden', !on);
  const setError = message => { $('error').textContent = message || ''; show('error', !!message); };
  const setStatus = message => { $('status').textContent = message || ''; show('status', !!message); };
  const busy = (button, on, label) => { button.disabled = on; if (label) { button.dataset.label = button.dataset.label || button.textContent; button.textContent = on ? label : button.dataset.label; } };
  const call = (fn, ...args) => new Promise((resolve, reject) => fn(...args, result => (result.status === Office.AsyncResultStatus.Succeeded ? resolve(result.value) : reject(new Error(result.error?.message || 'Outlook could not do that.')))));
  const token = () => { try { return localStorage.getItem(TOKEN_KEY) || ''; } catch { return ''; } };
  const saveToken = value => { try { value ? localStorage.setItem(TOKEN_KEY, value) : localStorage.removeItem(TOKEN_KEY); } catch {} };
  const PIN_TIP_KEY = 'daybook-pin-tip-seen';
  const pinTipSeen = () => { try { return localStorage.getItem(PIN_TIP_KEY) === '1'; } catch { return false; } };
  const escapeHtml = text => String(text).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const toHtml = text => String(text).trim().split(/\n{2,}/).map(p => `<p>${escapeHtml(p).replace(/\n/g, '<br>')}</p>`).join('');
  const address = r => (r ? (r.displayName && r.displayName !== r.emailAddress ? `${r.displayName} <${r.emailAddress}>` : r.emailAddress || r.displayName || '') : '');
  const options = () => ({ tone: $('tone').value, length: $('length').value, language: $('language').value });
  const style = () => document.querySelector('input[name="style"]:checked')?.value || 'sent';

  async function api(path, body, { method = body ? 'POST' : 'GET', auth = true } = {}) {
    if (!base) await findDaybook();
    let response;
    try {
      response = await fetch(base + path, { method, headers: { ...(body ? { 'content-type': 'application/json' } : {}), ...(auth && token() ? { authorization: `Bearer ${token()}` } : {}) }, body: body ? JSON.stringify(body) : undefined });
    } catch {
      base = '';
      throw unreachable('Daybook isn’t reachable. Make sure Daybook is running on this PC and “Allow the Outlook add-in” is on in its Settings.');
    }
    const data = await response.json().catch(() => ({}));
    if (response.status === 401 && data.pair) { saveToken(''); render(); throw new Error(data.error); }
    if (!response.ok) throw new Error(data.error || `Daybook returned ${response.status}.`);
    return data;
  }
  async function findDaybook() {
    for (const port of PORTS) {
      try {
        const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), 1500);
        const r = await fetch(`http://127.0.0.1:${port}/v1/hello`, { signal: controller.signal }); clearTimeout(timer);
        if (r.ok && (await r.json()).app === 'daybook') { base = `http://127.0.0.1:${port}`; return base; }
      } catch {}
    }
    throw unreachable('Daybook isn’t running, or the Outlook add-in is turned off. Open Daybook → Settings → Outlook add-in and turn on “Allow the Outlook add-in”.');
  }
  // An error that also shows the steps to install or start Daybook.
  const unreachable = message => Object.assign(new Error(message), { help: true });
  // Daybook is a Windows app; Outlook on a Mac, phone or tablet can't reach it.
  const onWindowsOrWeb = () => { const p = Office.context.diagnostics?.platform; return !p || p === 'PC' || p === 'OfficeOnline' || p === 'Universal'; };
  function showHelp(on) {
    show('help', on);
    if (!on) return;
    const windows = onWindowsOrWeb();
    show('help-platform', !windows); show('help-steps', windows); show('help-retry', windows);
    ['view-pair', 'view-reply', 'view-summary', 'view-compose', 'style-box', 'options-box'].forEach(id => show(id, false));
  }

  // ---- what Outlook shows
  const item = () => Office.context.mailbox.item;
  const isCompose = () => typeof item()?.displayReplyForm !== 'function';
  const accountEmail = () => Office.context.mailbox.userProfile?.emailAddress || '';
  async function readItem() {
    const it = item();
    const body = await call(it.body.getAsync.bind(it.body), Office.CoercionType.Text);
    return { from: address(it.from), to: (it.to || []).map(address), cc: (it.cc || []).map(address), subject: it.subject || '', date: it.dateTimeCreated ? new Date(it.dateTimeCreated).toISOString() : '', body };
  }
  async function readCompose() {
    const it = item();
    const [subject, to, body] = await Promise.all([call(it.subject.getAsync.bind(it.subject)), call(it.to.getAsync.bind(it.to)), call(it.body.getAsync.bind(it.body), Office.CoercionType.Text)]);
    let composeType = '';
    if (typeof it.getComposeTypeAsync === 'function') { try { composeType = (await call(it.getComposeTypeAsync.bind(it))).composeType; } catch {} }
    const isReply = composeType ? composeType !== 'newMail' : /^(re|aw|sv|antw)\s*:/i.test(subject || '');
    return { subject: subject || '', to: (to || []).map(address), body: body || '', isReply };
  }

  // ---- views
  async function render() {
    setError(''); setStatus(''); showHelp(false); show('pin-tip', false);
    if (!onWindowsOrWeb()) { $('conn').textContent = 'Not available here'; showHelp(true); return; }
    if (!token()) { $('conn').textContent = 'Not connected'; ['view-reply', 'view-summary', 'view-compose', 'style-box', 'options-box'].forEach(id => show(id, false)); show('view-pair'); return; }
    show('view-pair', false);
    if (isCompose()) view = 'compose';
    show('view-reply', view === 'reply'); show('view-summary', view === 'summary'); show('view-compose', view === 'compose');
    show('style-box', view !== 'summary'); show('options-box', view !== 'summary');
    try {
      const status = await api('/v1/status');
      $('conn').textContent = 'Connected ✓';
      show('pin-tip', !pinTipSeen() && view !== 'compose');
      byLine(status.by, status.local);
      if (status.consentNeeded) setError(`Daybook uses ${status.by}, but its cloud notice isn’t confirmed yet. Confirm it in Daybook → Settings → AI provider.`);
    } catch (error) {
      $('conn').textContent = 'Not connected';
      if (error.help) { showHelp(true); return; }
      setError(error.message);
    }
    if (view === 'compose') {
      const c = await readCompose().catch(() => null);
      $('compose-context').textContent = c ? `${c.isReply ? 'Your reply' : 'New email'}${c.to.length ? ` · to ${c.to.join(', ')}` : ''}${c.subject ? ` · ${c.subject}` : ''}` : 'Writing an email';
      show('compose-select-hint', !!c?.isReply);
    } else {
      const it = item();
      const context = `${it.from?.displayName || it.from?.emailAddress || ''} · “${it.subject || '(no subject)'}”`;
      $('reply-context').textContent = `Replying to ${context}`;
      $('summary-context').textContent = context;
      $('reply-text').value = ''; show('reply-result', false);
      $('summary-points').replaceChildren(); show('summary-label', false); $('summary-reason').textContent = ''; show('summary-result', false); lastSummary = null;
    }
  }
  function byLine(by, local) {
    $('by').textContent = local ? `🔒 Written by ${by}.` : `☁ Uses ${by}, chosen in Daybook. This email’s text is sent to ${by} to write the result.`;
    $('by').classList.toggle('cloud', !local);
  }

  // ---- actions
  async function pair() {
    const button = $('pair-go'); setError(''); busy(button, true, 'Connecting…');
    try {
      const result = await api('/v1/pair', { code: $('pair-code').value.trim() }, { auth: false });
      saveToken(result.token); $('pair-code').value = '';
      await render(); setStatus('Connected to Daybook.'); listen();
    } catch (error) { if (error.help) showHelp(true); else setError(error.message); }
    finally { busy(button, false, 'Connecting…'); }
  }
  async function suggestReply() {
    const button = $('reply-go'); setError(''); setStatus(''); busy(button, true, 'Writing…');
    try {
      const notes = $('reply-notes').value.trim();
      const result = await api('/v1/draft', { mode: notes ? 'reply-notes' : 'reply', item: await readItem(), notes, options: options(), style: style(), accountEmail: accountEmail() });
      byLine(result.by, result.local);
      if (result.noReply) { setStatus(result.message); return; }
      $('reply-text').value = result.text; show('reply-result');
      if (result.styleFallback && style() === 'sent') setStatus('This account isn’t connected in Daybook, so your style notes were used instead of sent mail.');
      $('reply-text').focus();
    } catch (error) { setError(error.message); }
    finally { busy(button, false, 'Writing…'); }
  }
  function insertReply(all) {
    const text = $('reply-text').value.trim();
    if (!text) return;
    const it = item();
    (all ? it.displayReplyAllForm : it.displayReplyForm).call(it, { htmlBody: toHtml(text) });
    setStatus('The reply window is open with the text. Review it, then send when you’re ready.');
  }
  async function summarize() {
    const button = $('summary-go'); setError(''); setStatus(''); busy(button, true, 'Summarizing…');
    try {
      const result = await api('/v1/summary', { item: await readItem() });
      lastSummary = result; byLine(result.by, result.local);
      $('summary-points').replaceChildren(...result.points.map(p => Object.assign(document.createElement('li'), { textContent: p })));
      const cat = CATEGORIES[result.category] || CATEGORIES.info;
      $('summary-label').textContent = cat.text; $('summary-label').className = `label ${result.category}`; show('summary-label');
      $('summary-reason').textContent = result.reason || '';
      show('summary-result'); $('summary-points').setAttribute('tabindex', '-1'); $('summary-points').focus();
    } catch (error) { setError(error.message); }
    finally { busy(button, false, 'Summarizing…'); }
  }
  async function applyLabel() {
    if (!lastSummary) return;
    const button = $('summary-apply'); setError(''); busy(button, true, 'Adding…');
    try {
      const mailbox = Office.context.mailbox, it = item();
      const master = await call(mailbox.masterCategories.getAsync.bind(mailbox.masterCategories));
      const have = new Set((master || []).map(c => c.displayName));
      const missing = Object.values(CATEGORIES).filter(c => !have.has(c.name)).map(c => ({ displayName: c.name, color: Office.MailboxEnums.CategoryColor[c.color] }));
      if (missing.length) await call(mailbox.masterCategories.addAsync.bind(mailbox.masterCategories), missing);
      const current = (await call(it.categories.getAsync.bind(it.categories))) || [];
      const ours = current.map(c => c.displayName).filter(name => Object.values(CATEGORIES).some(c => c.name === name));
      if (ours.length) await call(it.categories.removeAsync.bind(it.categories), ours);
      const target = (CATEGORIES[lastSummary.category] || CATEGORIES.info).name;
      await call(it.categories.addAsync.bind(it.categories), [target]);
      setStatus(`Category “${target}” added to this email.`);
    } catch (error) { setError(`Outlook couldn’t add the label: ${error.message}`); }
    finally { busy(button, false, 'Adding…'); }
  }
  async function write(action) {
    const button = action ? document.querySelector(`[data-action="${action}"]`) : $('compose-go');
    setError(''); setStatus(''); busy(button, true, action ? undefined : 'Writing…');
    try {
      const it = item(), c = await readCompose();
      let draft = c.body;
      if (action) {
        const selected = await call(it.getSelectedDataAsync.bind(it), Office.CoercionType.Text).catch(() => null);
        if (selected?.data?.trim()) draft = selected.data;
        else if (c.isReply) throw new Error('Select the text you want Daybook to change, then choose again.');
      }
      const body = action
        ? { mode: 'improve', action, draft, item: { to: c.to, subject: c.subject }, options: options(), style: style(), accountEmail: accountEmail() }
        : { mode: c.isReply ? 'reply-notes' : 'compose', notes: $('compose-notes').value.trim(), item: { to: c.to, subject: c.subject, body: c.isReply ? c.body : '' }, options: options(), style: style(), accountEmail: accountEmail() };
      const result = await api('/v1/draft', body);
      byLine(result.by, result.local);
      $('compose-text').value = result.text; show('compose-result'); $('compose-text').focus();
      $('compose-replace').textContent = action && c.isReply ? 'Replace selected text' : c.isReply ? 'Insert at top' : 'Replace my draft';
      $('compose-replace').dataset.mode = action && c.isReply ? 'selection' : c.isReply ? 'top' : 'all';
    } catch (error) { setError(error.message); }
    finally { busy(button, false, action ? undefined : 'Writing…'); }
  }
  async function placeText(where) {
    const text = $('compose-text').value.trim();
    if (!text) return;
    const it = item(), html = toHtml(text), opts = { coercionType: Office.CoercionType.Html };
    try {
      if (where === 'all') await call(it.body.setAsync.bind(it.body), html, opts);
      else if (where === 'top') await call(it.body.prependAsync.bind(it.body), html, opts);
      else await call(it.body.setSelectedDataAsync.bind(it.body), html, opts);
      setStatus('Inserted. Review it in the message, then send when you’re ready.');
    } catch (error) { setError(`Outlook couldn’t insert the text: ${error.message}`); }
  }

  // ---- Daybook shortcut: Daybook tells a pinned panel to act on the email it shows
  async function listen() {
    if (!token() || isCompose()) return;
    streamAbort?.abort();
    const controller = streamAbort = new AbortController();
    try {
      if (!base) await findDaybook();
      const response = await fetch(`${base}/v1/events`, { headers: { authorization: `Bearer ${token()}` }, signal: controller.signal });
      if (!response.ok || !response.body) return;
      const reader = response.body.getReader(), decoder = new TextDecoder();
      let buffer = '';
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let index;
        while ((index = buffer.indexOf('\n\n')) >= 0) {
          const chunk = buffer.slice(0, index); buffer = buffer.slice(index + 2);
          const line = chunk.split('\n').find(l => l.startsWith('data: '));
          if (!line) continue;
          const event = JSON.parse(line.slice(6));
          if (event.type === 'suggest') { view = 'reply'; await render(); suggestReply(); }
          if (event.type === 'summary') { view = 'summary'; await render(); summarize(); }
        }
      }
    } catch {}
    if (!controller.signal.aborted) setTimeout(listen, 5000); // Daybook restarted or the connection dropped
  }

  Office.onReady(info => {
    if (info.host !== Office.HostType.Outlook) return;
    $('pair-go').addEventListener('click', pair);
    $('pin-tip-ok').addEventListener('click', () => { try { localStorage.setItem(PIN_TIP_KEY, '1'); } catch {} show('pin-tip', false); });
    $('help-retry').addEventListener('click', () => { base = ''; render().then(listen); });
    $('pair-code').addEventListener('keydown', e => { if (e.key === 'Enter') pair(); });
    $('reply-go').addEventListener('click', suggestReply);
    $('reply-insert').addEventListener('click', () => insertReply(false));
    $('reply-insert-all').addEventListener('click', () => insertReply(true));
    $('summary-go').addEventListener('click', summarize);
    $('summary-apply').addEventListener('click', applyLabel);
    $('summary-to-reply').addEventListener('click', async () => { view = 'reply'; await render(); suggestReply(); });
    $('reply-to-summary').addEventListener('click', async () => { view = 'summary'; await render(); summarize(); });
    $('compose-go').addEventListener('click', () => write());
    $('compose-replace').addEventListener('click', () => placeText($('compose-replace').dataset.mode || 'all'));
    $('compose-insert').addEventListener('click', () => placeText('cursor'));
    document.querySelectorAll('[data-action]').forEach(b => b.addEventListener('click', () => write(b.dataset.action)));
    document.querySelectorAll('input[name="style"]').forEach(r => r.addEventListener('change', () => { $('style-current').textContent = r.parentElement.querySelector('span').firstChild.textContent.trim(); }));
    // A pinned panel follows the selected email.
    if (Office.context.mailbox.addHandlerAsync) Office.context.mailbox.addHandlerAsync(Office.EventType.ItemChanged, () => { if (item()) render(); });
    render().then(listen);
  });
})();

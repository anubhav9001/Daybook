---
layout: default
title: Contact
nav_exclude: true
description: Send a message to the Daybook team — accessible contact form, reCAPTCHA v3 protected.
---

# Contact Daybook
{: .no_toc }

Have a question, feedback, or report that isn't a public bug? Use this form.

- Bug reports: please use the [issue tracker](https://github.com/anubhav9001/Daybook/issues/new/choose) instead so others can see and vote.
- Security vulnerabilities: please use GitHub's [private vulnerability reporting](https://github.com/anubhav9001/Daybook/security/advisories/new) — see the [Security Policy](https://github.com/anubhav9001/Daybook/blob/main/SECURITY.md).

<!-- Form action is injected by JS at runtime so the destination email never
     appears in the static HTML. Falls back to a visible notice if JS is off. -->
<form id="contact-form"
      action="javascript:void(0)"
      method="POST"
      novalidate
      aria-describedby="contact-form-help">
  <!-- FormSubmit control fields -->
  <input type="hidden" name="_captcha" value="false">
  <input type="hidden" name="_honey" value="">
  <input type="hidden" name="_template" value="table">
  <!-- Server-side spam keyword blocklist (FormSubmit may or may not honor this on AJAX
       endpoint, so we also filter client-side in the submit handler below) -->
  <input type="hidden" name="_blacklist" value="seo,backlink,backlinks,link building,casino,crypto,bitcoin,ethereum,nft,loan,viagra,escort,investment opportunity,guest post,affordable price,cheap price,SEO service,ranking boost,buy followers,dating,webcam,xxx,porn,gambling,forex,binary options,work from home,make money fast,get rich,crypto investment,earn money,easy money,sex,hookup,adult,penis,horny,milf,nude,naked,enlargement,weight loss,diet pills,miracle cure,ethical hacker,hack,hire a hacker,lottery,prize,winner,inheritance,prince,beneficiary,urgent business,confidential,offshore,wire transfer,darkweb,dark web,counterfeit,fake id,visa service,web design services,unlimited leads,buy leads,increase sales,boost ranking,SEO expert,SEO agency,digital marketing,influencer marketing,lead generation,growth hack">
  <p id="contact-form-help" class="form-help">All fields marked with <span aria-hidden="true">*</span> are required. We reply on a best-effort basis within a few business days.</p>

  <noscript>
    <div class="form-banner">
      <strong>JavaScript is required to send this form.</strong> You can also
      <a href="https://github.com/anubhav9001/Daybook/issues/new/choose">open an issue</a> or
      start a <a href="https://github.com/anubhav9001/Daybook/discussions">discussion</a>.
    </div>
  </noscript>

  <div class="form-row">
    <label for="cf-name">Your name <span class="req" aria-hidden="true">*</span></label>
    <input type="text" id="cf-name" name="name" autocomplete="name" required aria-required="true" aria-describedby="cf-name-hint">
    <small id="cf-name-hint" class="form-hint">So we know who to address when we reply.</small>
  </div>

  <div class="form-row">
    <label for="cf-email">Your email address <span class="req" aria-hidden="true">*</span></label>
    <input type="email" id="cf-email" name="email" autocomplete="email" required aria-required="true" aria-describedby="cf-email-hint" inputmode="email">
    <small id="cf-email-hint" class="form-hint">We only use it to reply to this message. See the <a href="privacy.html">Privacy Policy</a>.</small>
  </div>

  <div class="form-row">
    <label for="cf-subject">Subject <span class="req" aria-hidden="true">*</span></label>
    <input type="text" id="cf-subject" name="_subject" required aria-required="true" maxlength="120" aria-describedby="cf-subject-hint">
    <small id="cf-subject-hint" class="form-hint">A short title for your message (max 120 characters).</small>
  </div>

  <div class="form-row">
    <label for="cf-summary">Message summary <span class="req" aria-hidden="true">*</span></label>
    <input type="text" id="cf-summary" name="summary" required aria-required="true" maxlength="200" aria-describedby="cf-summary-hint">
    <small id="cf-summary-hint" class="form-hint">One sentence describing what the message is about (max 200 characters).</small>
  </div>

  <div class="form-row">
    <label for="cf-message">Message <span class="req" aria-hidden="true">*</span></label>
    <textarea id="cf-message" name="message" rows="8" required aria-required="true" minlength="20" aria-describedby="cf-message-hint"></textarea>
    <small id="cf-message-hint" class="form-hint">Please include enough detail for us to help (minimum 20 characters).</small>
  </div>

  <!-- Spam honeypot: real users leave this blank; bots fill it. Hidden visually and from AT.
       FormSubmit watches _honey; Formspree watches _gotcha. Both covered. -->
  <div class="honeypot" aria-hidden="true" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden">
    <label for="cf-website">Leave this field empty</label>
    <input type="text" id="cf-website" name="_gotcha" tabindex="-1" autocomplete="off">
  </div>

  <!-- reCAPTCHA v3 token injected by JS on submit -->
  <input type="hidden" name="g-recaptcha-response" id="cf-recaptcha-token">

  <div class="form-actions">
    <button type="submit" id="cf-submit" class="btn btn-primary fs-4">Send message</button>
    <span id="cf-status" class="form-status" role="status" aria-live="polite" aria-atomic="true"></span>
  </div>
  <!-- Dedicated assertive region for errors so screen readers interrupt immediately -->
  <div id="cf-status-error" class="sr-only" role="alert" aria-live="assertive" aria-atomic="true"></div>

  <p class="form-legal" id="cf-recaptcha-notice" hidden>
    This form is protected by <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google reCAPTCHA</a> &middot;
    <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Terms</a>.
  </p>
</form>

<script>
  (function () {
    var form   = document.getElementById('contact-form');
    var status = document.getElementById('cf-status');
    var submit = document.getElementById('cf-submit');
    var tokenInput = document.getElementById('cf-recaptcha-token');
    if (!form) return;

    var SITE_KEY = '6LeZIegtAAAAANsxExrRxKfeq969NiPws3m0T6Qu';
    var hasRecaptcha = SITE_KEY && SITE_KEY.indexOf('REPLACE_WITH') !== 0;

    if (hasRecaptcha) {
      var s = document.createElement('script');
      s.src = 'https://www.google.com/recaptcha/api.js?render=' + encodeURIComponent(SITE_KEY);
      s.async = true; s.defer = true;
      document.head.appendChild(s);
      var notice = document.getElementById('cf-recaptcha-notice');
      if (notice) notice.hidden = false;
    }

    var statusError = document.getElementById('cf-status-error');
    function announce(msg, isError) {
      /* Prefix errors with the word "Error:" so sighted and non-sighted users
         both immediately recognise the message type. */
      var text = isError ? 'Error: ' + msg : msg;
      status.textContent = text;
      status.className = 'form-status ' + (isError ? 'is-error' : 'is-ok');
      /* Route errors to the assertive live region so screen readers interrupt. */
      if (statusError) {
        if (isError) {
          /* Clear then set so repeated identical errors still re-announce */
          statusError.textContent = '';
          setTimeout(function () { statusError.textContent = text; }, 20);
        } else {
          statusError.textContent = '';
        }
      }
    }
    function focusFirstInvalid() {
      var first = form.querySelector(':invalid');
      if (first) { first.focus(); first.scrollIntoView({ block: 'center' }); }
    }

    /* Email is split into parts so it never appears as a plain string in the
       HTML source. Reassembled only when the form is submitted. */
    var EMAIL_PARTS = ['anubhav', '.', 'mitra', '@', 'gmail', '.', 'com'];
    var AJAX_ENDPOINT = 'https://formsubmit.co/ajax/' + EMAIL_PARTS.join('');
    var endpointConfigured = true;
    form.action = AJAX_ENDPOINT; /* so native submit fallback also goes somewhere valid */


    function sendViaAjax() {
      var data = new FormData(form);
      fetch(AJAX_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(function (r) {
        return r.json().then(function (j) { return { ok: r.ok, body: j }; },
                             function () { return { ok: r.ok, body: {} }; });
      }).then(function (res) {
        var ok = res.ok && res.body &&
                 (res.body.success === true || res.body.success === 'true' ||
                  (typeof res.body.message === 'string' && res.body.message.toLowerCase().indexOf('success') !== -1));
        if (ok) {
          form.reset();
          announce('Thanks — your message was sent. We’ll reply by email on a best-effort basis.', false);
        } else {
          var m = (res.body && (res.body.message || res.body.error)) ||
                  'The server could not process the submission. Please try again in a minute.';
          announce(m, true);
        }
      }).catch(function () {
        announce('Network error. Please check your connection and try again.', true);
      }).finally(function () {
        submit.disabled = false;
      });
    }

    /* Client-side spam filter — the only enforcement we can trust 100%.
       Three layers:
       1. Hard keyword/phrase blocklist (English + Hinglish)
       2. Hard single-word blocklist (words a legit Daybook user has no reason to send)
       3. Heuristic quality score (links, repeated words, caps, ALL-CAPS, repeated chars) */
    var BLOCK_PHRASE_RE = new RegExp(
      '\\b(' + [
        /* English spam phrases */
        'seo','backlink','link\\s*building','casino','crypto(?:currency)?','bitcoin','ethereum','nft',
        'loan','viagra','escort','investment\\s*opportunity','guest\\s*post','cheap\\s*price',
        'buy\\s*followers','dating','webcam','xxx','porn','gambling','forex','binary\\s*options',
        'work\\s*from\\s*home','make\\s*money','earn\\s*money','easy\\s*money','get\\s*rich',
        'sex','hookup','adult','penis','horny','milf','nude','naked','enlargement',
        'weight\\s*loss','diet\\s*pills','miracle\\s*cure','hire\\s*a\\s*hacker','hacker',
        'lottery','prize\\s*winner','inheritance','beneficiary','urgent\\s*business',
        'offshore','wire\\s*transfer','dark\\s*web','counterfeit','fake\\s*id','visa\\s*service',
        'web\\s*design\\s*services?','unlimited\\s*leads','buy\\s*leads','increase\\s*sales',
        'boost\\s*ranking','SEO\\s*expert','SEO\\s*agency','digital\\s*marketing',
        'influencer\\s*marketing','lead\\s*generation','growth\\s*hack',
        /* Hinglish / transliteration spam markers (common lead-gen & scam patterns) */
        'tumko','tumhe','tarike','tarkike','banao','banaao','kamao','kamaao','kamana',
        'kamayenge','paise','lakhpati','crorepati','ghar\\s*bethe','ghar\\s*baithe',
        'commission\\s*based','ladkiyan','ladkiya'
      ].join('|') + ')\\b', 'i'
    );
    /* Any one of these words anywhere in subject/summary/message = reject.
       These are strict: a Daybook maintainer accepts bug reports and feature
       requests from users, not pitches or "money" talk. */
    var BLOCK_WORD_RE = /\b(money|cash|salary|profit|income|price|invoice|crypto|wallet|hack|hacking|hacker|whatsapp|telegram|skype|dm\s*me|contact\s*me\s*at|dollars?|rupees?|\$|₹|€)\b/i;

    function heuristicScore(txt) {
      if (!txt) return 0;
      var score = 0;
      var links = (txt.match(/https?:\/\/\S+/gi) || []).length;
      if (links >= 2) score += 2;      /* 2+ links usually = spam */
      if (links >= 1) score += 1;
      /* ALL-CAPS screaming */
      var letters = txt.replace(/[^A-Za-z]/g, '');
      if (letters.length > 20) {
        var upper = letters.replace(/[^A-Z]/g, '').length;
        if (upper / letters.length > 0.6) score += 2;
      }
      /* Repeated exclamations / dollar signs */
      if ((txt.match(/[!$]{2,}/g) || []).length >= 1) score += 1;
      /* Same long word repeated 3+ times (bot pattern) */
      var words = txt.toLowerCase().match(/\b[a-z]{5,}\b/g) || [];
      var counts = {};
      for (var i = 0; i < words.length; i++) {
        counts[words[i]] = (counts[words[i]] || 0) + 1;
        if (counts[words[i]] >= 3) { score += 2; break; }
      }
      /* Very short message that still "sells" */
      if (txt.length < 60 && /(http|www\.|offer|service|contact)/i.test(txt)) score += 2;
      return score;
    }

    function spamReason(form) {
      var fields = ['name','subject','summary','message'];
      var blob = '';
      for (var i = 0; i < fields.length; i++) {
        var el = form.elements[fields[i]];
        if (!el) continue;
        var v = (el.value || '').trim();
        if (!v) continue;
        if (BLOCK_PHRASE_RE.test(v)) return { field: fields[i], why: 'blocked phrase' };
        if (BLOCK_WORD_RE.test(v))   return { field: fields[i], why: 'blocked word' };
        blob += ' ' + v;
      }
      if (heuristicScore(blob) >= 3) return { field: 'message', why: 'heuristics' };
      return null;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        announce('Please correct the highlighted fields and try again.', true);
        focusFirstInvalid();
        return;
      }
      var hit = spamReason(form);
      if (hit) {
        announce('Your message appears to contain content we don’t accept here. Please rephrase and try again.', true);
        var el = form.elements[hit.field];
        if (el) { el.focus(); el.scrollIntoView({ block: 'center' }); }
        return;
      }
      submit.disabled = true;
      announce('Sending…', false);

      if (hasRecaptcha && window.grecaptcha && typeof grecaptcha.ready === 'function') {
        grecaptcha.ready(function () {
          grecaptcha.execute(SITE_KEY, { action: 'contact' }).then(function (token) {
            tokenInput.value = token;
            sendViaAjax();
          }).catch(function () {
            announce('reCAPTCHA could not verify. Please reload and try again.', true);
            submit.disabled = false;
          });
        });
      } else {
        sendViaAjax();
      }
    });
  })();
</script>

<style>
  #contact-form { max-width: 640px; margin-top: 1em; }
  #contact-form .form-row { display: flex; flex-direction: column; gap: 4px; margin: 0 0 18px; }
  #contact-form label { font-weight: 600; }
  #contact-form .req { color: #c7122a; margin-left: 2px; }
  #contact-form input[type="text"],
  #contact-form input[type="email"],
  #contact-form textarea {
    width: 100%;
    padding: 10px 12px;
    font: inherit;
    border: 1px solid #c8ccd3;
    border-radius: 6px;
    background: #ffffff;
    color: #15151c;
  }
  #contact-form textarea { resize: vertical; min-height: 160px; }
  #contact-form input:focus-visible,
  #contact-form textarea:focus-visible {
    outline: 2px solid var(--jtd-focus);
    outline-offset: 2px;
    border-color: var(--jtd-primary);
  }
  #contact-form input:invalid:not(:focus):not(:placeholder-shown),
  #contact-form textarea:invalid:not(:focus):not(:placeholder-shown) {
    border-color: #c7122a;
  }
  #contact-form .form-hint { color: #4a4751; font-size: 0.85em; }
  #contact-form .form-help { color: #4a4751; font-size: 0.95em; margin: 0 0 18px; }
  #contact-form .form-legal { color: #4a4751; font-size: 0.8em; margin-top: 12px; }
  #contact-form .form-actions { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
  #contact-form .form-status { font-weight: 600; min-height: 1.4em; }
  #contact-form .form-status.is-ok { color: #1a6f33; }
  #contact-form .form-status.is-error { color: #c7122a; }
  #contact-form .form-banner {
    padding: 12px 14px;
    margin: 0 0 18px;
    border: 1px solid #e0b100;
    background: #fff8dc;
    color: #5a4600;
    border-radius: 6px;
    font-size: 0.95em;
  }
  #contact-form .form-banner a { color: #0d2d8a; text-decoration: underline; }

  html[data-jtd-theme="dark"] #contact-form input[type="text"],
  html[data-jtd-theme="dark"] #contact-form input[type="email"],
  html[data-jtd-theme="dark"] #contact-form textarea {
    background: #1f1e26 !important;
    color: #f1edf5 !important;
    border-color: #4a4953 !important;
  }
  html[data-jtd-theme="dark"] #contact-form .form-hint,
  html[data-jtd-theme="dark"] #contact-form .form-help,
  html[data-jtd-theme="dark"] #contact-form .form-legal { color: #bdb6c6 !important; }
  html[data-jtd-theme="dark"] #contact-form .form-status.is-ok { color: #7cf59f !important; }
  html[data-jtd-theme="dark"] #contact-form .form-status.is-error { color: #ff8787 !important; }
  html[data-jtd-theme="dark"] #contact-form .req { color: #ff92d0 !important; }
  html[data-jtd-theme="dark"] #contact-form .form-banner {
    background: #332900 !important;
    border-color: #a07a00 !important;
    color: #ffe9a3 !important;
  }
  html[data-jtd-theme="dark"] #contact-form .form-banner a { color: #a9c1ff !important; }

  @media (prefers-color-scheme: dark) {
    html:not([data-jtd-theme="light"]) #contact-form input[type="text"],
    html:not([data-jtd-theme="light"]) #contact-form input[type="email"],
    html:not([data-jtd-theme="light"]) #contact-form textarea {
      background: #1f1e26 !important;
      color: #f1edf5 !important;
      border-color: #4a4953 !important;
    }
    html:not([data-jtd-theme="light"]) #contact-form .form-hint,
    html:not([data-jtd-theme="light"]) #contact-form .form-help,
    html:not([data-jtd-theme="light"]) #contact-form .form-legal { color: #bdb6c6 !important; }
    html:not([data-jtd-theme="light"]) #contact-form .form-status.is-ok { color: #7cf59f !important; }
    html:not([data-jtd-theme="light"]) #contact-form .form-status.is-error { color: #ff8787 !important; }
    html:not([data-jtd-theme="light"]) #contact-form .req { color: #ff92d0 !important; }
    html:not([data-jtd-theme="light"]) #contact-form .form-banner {
      background: #332900 !important;
      border-color: #a07a00 !important;
      color: #ffe9a3 !important;
    }
    html:not([data-jtd-theme="light"]) #contact-form .form-banner a { color: #a9c1ff !important; }
  }
</style>

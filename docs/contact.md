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

<form id="contact-form"
      action="https://formsubmit.co/el/REPLACE_WITH_FORMSUBMIT_HASH"
      method="POST"
      novalidate
      aria-describedby="contact-form-help">
  <!-- FormSubmit control fields -->
  <input type="hidden" name="_captcha" value="false">
  <input type="hidden" name="_honey" value="">
  <input type="hidden" name="_template" value="table">
  <input type="hidden" name="_next" value="https://anubhav9001.github.io/Daybook/contact.html?sent=1">
  <p id="contact-form-help" class="form-help">All fields marked with <span aria-hidden="true">*</span> are required. We reply on a best-effort basis within a few business days.</p>

  <div id="contact-unconfigured-banner" class="form-banner" hidden>
    <strong>Contact form is not yet live.</strong> While it's being set up, please use
    <a href="https://github.com/anubhav9001/Daybook/issues/new/choose">GitHub Issues</a> or
    <a href="https://github.com/anubhav9001/Daybook/discussions">Discussions</a>.
  </div>

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
    <span id="cf-status" class="form-status" aria-live="polite" aria-atomic="true"></span>
  </div>

  <p class="form-legal">
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

    var SITE_KEY = 'REPLACE_WITH_RECAPTCHA_V3_SITE_KEY';
    var hasRecaptcha = SITE_KEY && SITE_KEY.indexOf('REPLACE_WITH') !== 0;

    if (hasRecaptcha) {
      var s = document.createElement('script');
      s.src = 'https://www.google.com/recaptcha/api.js?render=' + encodeURIComponent(SITE_KEY);
      s.async = true; s.defer = true;
      document.head.appendChild(s);
    }

    function announce(msg, isError) {
      status.textContent = msg;
      status.className = 'form-status ' + (isError ? 'is-error' : 'is-ok');
    }
    function focusFirstInvalid() {
      var first = form.querySelector(':invalid');
      if (first) { first.focus(); first.scrollIntoView({ block: 'center' }); }
    }

    var endpointConfigured = form.action.indexOf('REPLACE_WITH') === -1;
    if (!endpointConfigured) {
      var banner = document.getElementById('contact-unconfigured-banner');
      if (banner) banner.hidden = false;
      submit.disabled = true;
    }

    /* Show success state on redirect-back from no-JS fallback */
    if (location.search.indexOf('sent=1') !== -1) {
      announce('Thanks — your message was sent. We’ll reply by email on a best-effort basis.', false);
      try { history.replaceState(null, '', location.pathname); } catch (e) {}
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!endpointConfigured) {
        announce('Contact form is not configured yet. Please open a GitHub issue or discussion for now.', true);
        return;
      }
      if (!form.checkValidity()) {
        announce('Please correct the highlighted fields and try again.', true);
        focusFirstInvalid();
        return;
      }
      submit.disabled = true;
      announce('Sending…', false);

      function post() {
        var data = new FormData(form);
        /* FormSubmit AJAX endpoint variant: append .json suffix for JSON response */
        var url = form.action.replace(/\/el\/([^/?]+)/, '/ajax/el/$1');
        fetch(url, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        }).then(function (r) {
          return r.json().catch(function () { return { success: r.ok }; });
        }).then(function (j) {
          if (j && (j.success === true || j.success === 'true')) {
            form.reset();
            announce('Thanks — your message was sent. We’ll reply by email on a best-effort basis.', false);
          } else {
            var m = (j && (j.message || j.error)) || 'Something went wrong. Please try again.';
            announce(m, true);
          }
        }).catch(function () {
          announce('Network error. Please check your connection and try again.', true);
        }).finally(function () {
          submit.disabled = false;
        });
      }

      if (hasRecaptcha && window.grecaptcha && typeof grecaptcha.ready === 'function') {
        grecaptcha.ready(function () {
          grecaptcha.execute(SITE_KEY, { action: 'contact' }).then(function (token) {
            tokenInput.value = token;
            post();
          }).catch(function () {
            announce('reCAPTCHA could not verify. Please reload and try again.', true);
            submit.disabled = false;
          });
        });
      } else {
        post();
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

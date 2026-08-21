(function () {
  'use strict';

  if (window.__rkSpeedReaderBound) return;
  window.__rkSpeedReaderBound = true;

  var HOST_ID = 'rk-speed-reader-host';
  var reader = null;
  var open = false;

  function ensureHost() {
    var existing = document.getElementById(HOST_ID);
    if (existing) return existing;

    var host = document.createElement('div');
    host.id = HOST_ID;
    host.setAttribute('data-rk-speed-reader', 'true');
    host.innerHTML =
      '<div class="rk-sr-backdrop" data-rk-close></div>' +
      '<section class="rk-sr-panel" role="dialog" aria-label="Speed reader">' +
      '  <header class="rk-sr-head">' +
      '    <p class="rk-sr-brand">RK Speed Reader</p>' +
      '    <button type="button" class="rk-sr-icon" data-rk-close aria-label="Close">×</button>' +
      '  </header>' +
      '  <div class="rk-sr-stage" aria-live="assertive" aria-atomic="true">' +
      '    <p class="rk-sr-guide" aria-hidden="true">―――――――――― ◆ ―――――――――――</p>' +
      '    <div class="rk-sr-word">' +
      '      <span class="rk-sr-before"></span>' +
      '      <span class="rk-sr-focus">S</span>' +
      '      <span class="rk-sr-after"></span>' +
      '    </div>' +
      '    <p class="rk-sr-guide" aria-hidden="true">――――――――――――――――――――――</p>' +
      '    <p class="rk-sr-status">Ready</p>' +
      '  </div>' +
      '  <div class="rk-sr-controls">' +
      '    <label class="rk-sr-label" for="rk-sr-wpm">WPM</label>' +
      '    <input id="rk-sr-wpm" class="rk-sr-wpm" type="range" min="100" max="1500" step="25" value="350" />' +
      '    <span class="rk-sr-wpm-val" data-rk-wpm-val>350</span>' +
      '    <button type="button" class="rk-sr-btn" data-rk-play>Pause</button>' +
      '  </div>' +
      '  <p class="rk-sr-hint">Max 1500 WPM · Esc to close · Alt+Shift+S</p>' +
      '</section>';

    document.documentElement.appendChild(host);

    host.querySelectorAll('[data-rk-close]').forEach(function (el) {
      el.addEventListener('click', closePanel);
    });

    var playBtn = host.querySelector('[data-rk-play]');
    var wpmInput = host.querySelector('#rk-sr-wpm');
    var wpmVal = host.querySelector('[data-rk-wpm-val]');

    playBtn.addEventListener('click', function () {
      if (!reader || !reader.isActive()) return;
      if (reader.isPaused()) {
        reader.resume();
        playBtn.textContent = 'Pause';
      } else {
        reader.pause();
        playBtn.textContent = 'Play';
      }
    });

    wpmInput.addEventListener('input', function () {
      var wpm = Number(wpmInput.value) || 350;
      wpmVal.textContent = String(wpm);
      if (reader) reader.setWpm(wpm);
      try {
        chrome.runtime.sendMessage({ type: 'RK_SET_WPM', wpm: wpm });
      } catch (_) {}
    });

    document.addEventListener(
      'keydown',
      function (e) {
        if (e.key === 'Escape' && open) {
          e.preventDefault();
          closePanel();
        }
      },
      true,
    );

    return host;
  }

  function closePanel() {
    open = false;
    if (reader) reader.stop();
    var host = document.getElementById(HOST_ID);
    if (host) host.remove();
  }

  function openWithText(text, wpm) {
    if (!window.RKSpeedReader) {
      console.warn('RK Speed Reader engine missing');
      return;
    }
    var host = ensureHost();
    open = true;
    var beforeEl = host.querySelector('.rk-sr-before');
    var focusEl = host.querySelector('.rk-sr-focus');
    var afterEl = host.querySelector('.rk-sr-after');
    var statusEl = host.querySelector('.rk-sr-status');
    var playBtn = host.querySelector('[data-rk-play]');
    var wpmInput = host.querySelector('#rk-sr-wpm');
    var wpmVal = host.querySelector('[data-rk-wpm-val]');

    var safeWpm = window.RKSpeedReader.clampWpm(wpm || 350);
    wpmInput.value = String(safeWpm);
    wpmVal.textContent = String(safeWpm);
    playBtn.textContent = 'Pause';

    if (reader) reader.stop();
    reader = window.RKSpeedReader.createSpeedReader({
      onWord: function (parts, index, total) {
        beforeEl.textContent = parts.before;
        focusEl.textContent = parts.focus;
        afterEl.textContent = parts.after;
        statusEl.textContent = 'Word ' + (index + 1) + ' of ' + total;
      },
      onDone: function () {
        playBtn.textContent = 'Play';
        statusEl.textContent = 'Finished — select more text to continue.';
      },
      onEmpty: function () {
        beforeEl.textContent = '';
        focusEl.textContent = '—';
        afterEl.textContent = '';
        playBtn.textContent = 'Play';
        statusEl.textContent = 'No text selected.';
      },
    });

    reader.start(text, safeWpm);
  }

  window.__rkSpeedRead = openWithText;

  chrome.runtime.onMessage.addListener(function (message) {
    if (!message || message.type !== 'RK_SPEED_READ') return;
    openWithText(message.text || '', message.wpm);
  });
})();

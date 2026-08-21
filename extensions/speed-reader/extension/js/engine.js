/**
 * Spritz-style speed reader engine — adapted from Glance/OpenSpritz (MIT).
 * Plain JS build for the browser extension (no bundler required).
 */
(function (global) {
  'use strict';

  var MAX_WPM = 1500;
  var MIN_WPM = 100;

  function clampWpm(wpm) {
    var n = Number(wpm) || 350;
    if (n < MIN_WPM) return MIN_WPM;
    if (n > MAX_WPM) return MAX_WPM;
    return Math.round(n);
  }

  function decodeEntities(s) {
    var temp = document.createElement('p');
    temp.innerHTML = s;
    return temp.textContent || temp.innerText || '';
  }

  function pivot(word) {
    var decoded = decodeEntities(word);
    var length = decoded.length;
    var bestLetter = 1;
    switch (length) {
      case 1:
        bestLetter = 1;
        break;
      case 2:
      case 3:
      case 4:
      case 5:
        bestLetter = 2;
        break;
      case 6:
      case 7:
      case 8:
      case 9:
        bestLetter = 3;
        break;
      case 10:
      case 11:
      case 12:
      case 13:
        bestLetter = 4;
        break;
      default:
        bestLetter = 5;
    }
    var dot = function (s) {
      return s.replace(/\./g, '•');
    };
    return {
      before: dot(decoded.slice(0, bestLetter - 1)),
      focus: dot(decoded.slice(bestLetter - 1, bestLetter)) || dot(decoded),
      after: dot(decoded.slice(bestLetter)),
    };
  }

  function preprocessWords(allWords) {
    var temp = allWords.slice();
    var t = 0;
    for (var i = 0; i < allWords.length; i++) {
      var w = allWords[i];
      if (w.indexOf('.') !== -1) {
        temp[t] = w.replace(/\./g, '•');
      }
      if (
        (w.indexOf(',') !== -1 ||
          w.indexOf(':') !== -1 ||
          w.indexOf('-') !== -1 ||
          w.indexOf('(') !== -1 ||
          w.length > 8) &&
        w.indexOf('.') === -1
      ) {
        temp.splice(t + 1, 0, w, w);
        t += 2;
      }
      if (
        w.indexOf('.') !== -1 ||
        w.indexOf('!') !== -1 ||
        w.indexOf('?') !== -1 ||
        w.indexOf(':') !== -1 ||
        w.indexOf(';') !== -1 ||
        w.indexOf(')') !== -1
      ) {
        temp.splice(t + 1, 0, ' ', ' ', ' ');
        t += 3;
      }
      t++;
    }
    return temp;
  }

  function createSpeedReader(callbacks) {
    var timer = null;
    var words = [];
    var currentWord = 0;
    var active = false;
    var paused = false;
    var wpm = 350;

    function clearTimer() {
      if (timer !== null) {
        clearInterval(timer);
        timer = null;
      }
    }

    function msPerWord() {
      return 60000 / Math.max(1, wpm);
    }

    function showWord() {
      if (currentWord >= words.length) {
        stop();
        callbacks.onDone();
        return;
      }
      callbacks.onWord(pivot(words[currentWord]), currentWord, words.length);
      currentWord++;
    }

    function startInterval() {
      clearTimer();
      timer = setInterval(showWord, msPerWord());
    }

    function stop() {
      clearTimer();
      active = false;
      paused = false;
      currentWord = 0;
      words = [];
    }

    return {
      start: function (text, wpmVal) {
        stop();
        var raw = String(text || '')
          .split(/\s+/)
          .filter(Boolean);
        if (!raw.length) {
          callbacks.onEmpty();
          return;
        }
        wpm = clampWpm(wpmVal);
        words = preprocessWords(raw);
        currentWord = 0;
        active = true;
        paused = false;
        startInterval();
      },
      stop: stop,
      pause: function () {
        if (!active) return;
        paused = true;
        clearTimer();
      },
      resume: function () {
        if (!active || !paused) return;
        paused = false;
        startInterval();
      },
      setWpm: function (wpmVal) {
        wpm = clampWpm(wpmVal);
        if (active && !paused) startInterval();
      },
      isActive: function () {
        return active;
      },
      isPaused: function () {
        return paused;
      },
    };
  }

  global.RKSpeedReader = {
    MAX_WPM: MAX_WPM,
    MIN_WPM: MIN_WPM,
    clampWpm: clampWpm,
    createSpeedReader: createSpeedReader,
    pivot: pivot,
  };
})(typeof globalThis !== 'undefined' ? globalThis : window);

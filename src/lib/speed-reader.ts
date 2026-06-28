/**
 * Spritz-style speed reader engine — adapted from Glance/OpenSpritz (MIT).
 * https://github.com/Miserlou/Glance-Bookmarklet
 */

export type PivotParts = { before: string; focus: string; after: string };

function decodeEntities(s: string): string {
  const temp = document.createElement('p');
  temp.innerHTML = s;
  const str = temp.textContent || temp.innerText || '';
  return str;
}

/** Optimal recognition point — same rules as OpenSpritz. */
export function pivot(word: string): PivotParts {
  const decoded = decodeEntities(word);
  const length = decoded.length;
  let bestLetter = 1;

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

  const dot = (s: string) => s.replace(/\./g, '•');
  const before = dot(decoded.slice(0, bestLetter - 1));
  const focus = dot(decoded.slice(bestLetter - 1, bestLetter)) || dot(decoded);
  const after = dot(decoded.slice(bestLetter));

  return { before, focus, after };
}

/** Word-length and punctuation-aware pacing from OpenSpritz. */
export function preprocessWords(allWords: string[]): string[] {
  const temp = allWords.slice();
  let t = 0;

  for (let i = 0; i < allWords.length; i++) {
    const w = allWords[i];

    if (w.includes('.')) {
      temp[t] = w.replace(/\./g, '•');
    }

    if (
      (w.includes(',') ||
        w.includes(':') ||
        w.includes('-') ||
        w.includes('(') ||
        w.length > 8) &&
      !w.includes('.')
    ) {
      temp.splice(t + 1, 0, w, w);
      t += 2;
    }

    if (
      w.includes('.') ||
      w.includes('!') ||
      w.includes('?') ||
      w.includes(':') ||
      w.includes(';') ||
      w.includes(')')
    ) {
      temp.splice(t + 1, 0, ' ', ' ', ' ');
      t += 3;
    }

    t++;
  }

  return temp;
}

const SKIP_ANCESTOR =
  '#a11y-widget, #fox-widget, #speed-reader-widget, .sr-only, [hidden], script, style, noscript';

/** Collect visible paragraph copy from the page main content. */
export function extractParagraphText(root: ParentNode = document): string {
  const main = root.querySelector('main') || root;
  const parts: string[] = [];

  main.querySelectorAll('p').forEach((p) => {
    if (p.closest(SKIP_ANCESTOR)) return;
    if (p.closest('[aria-hidden="true"]')) return;
    const style = window.getComputedStyle(p);
    if (style.display === 'none' || style.visibility === 'hidden') return;
    const text = (p.innerText || p.textContent || '').replace(/\s+/g, ' ').trim();
    if (text) parts.push(text);
  });

  return parts.join(' ');
}

export type SpeedReaderCallbacks = {
  onWord: (parts: PivotParts, index: number, total: number) => void;
  onDone: () => void;
  onEmpty: () => void;
};

export type SpeedReaderController = {
  start: (text: string, wpm: number) => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
  setWpm: (wpm: number) => void;
  isActive: () => boolean;
  isPaused: () => boolean;
};

export function createSpeedReader(callbacks: SpeedReaderCallbacks): SpeedReaderController {
  let timer: ReturnType<typeof setInterval> | null = null;
  let words: string[] = [];
  let currentWord = 0;
  let active = false;
  let paused = false;
  let wpm = 350;

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

  return {
    start(text, wpmVal) {
      stop();
      const raw = text.split(/\s+/).filter(Boolean);
      if (!raw.length) {
        callbacks.onEmpty();
        return;
      }

      wpm = wpmVal;
      words = preprocessWords(raw);
      currentWord = 0;
      active = true;
      paused = false;
      startInterval();
    },
    stop() {
      clearTimer();
      active = false;
      paused = false;
      currentWord = 0;
      words = [];
    },
    pause() {
      if (!active) return;
      paused = true;
      clearTimer();
    },
    resume() {
      if (!active || !paused) return;
      paused = false;
      startInterval();
    },
    setWpm(wpmVal) {
      wpm = wpmVal;
      if (active && !paused) {
        startInterval();
      }
    },
    isActive: () => active,
    isPaused: () => paused,
  };
}

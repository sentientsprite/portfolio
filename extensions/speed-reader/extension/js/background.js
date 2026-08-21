const MENU_ID = 'rk-speed-read-selection';
const STORAGE_KEY = 'rk-speed-wpm';
const DEFAULT_WPM = 350;

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: MENU_ID,
      title: 'Speed read selection',
      contexts: ['selection'],
    });
  });
});

async function getWpm() {
  const stored = await chrome.storage.sync.get(STORAGE_KEY);
  const n = Number(stored[STORAGE_KEY]);
  if (!Number.isFinite(n)) return DEFAULT_WPM;
  return Math.min(1500, Math.max(100, Math.round(n)));
}

async function injectReader(tabId) {
  const [{ result: already } = {}] = await chrome.scripting.executeScript({
    target: { tabId },
    func: () => Boolean(window.__rkSpeedReaderBound && window.RKSpeedReader),
  });
  if (already) return;

  await chrome.scripting.insertCSS({
    target: { tabId },
    files: ['css/content.css'],
  });
  await chrome.scripting.executeScript({
    target: { tabId },
    files: ['js/engine.js', 'js/content.js'],
  });
}

async function speedReadInTab(tabId, text) {
  if (!tabId || !text || !String(text).trim()) return;
  const wpm = await getWpm();
  try {
    await injectReader(tabId);
    await chrome.scripting.executeScript({
      target: { tabId },
      func: (payload) => {
        if (typeof window.__rkSpeedRead === 'function') {
          window.__rkSpeedRead(payload.text, payload.wpm);
        }
      },
      args: [{ text: String(text), wpm }],
    });
  } catch (err) {
    // Restricted pages (chrome://, Web Store, PDF viewer, etc.)
    console.warn('RK Speed Reader: cannot run on this page', err);
  }
}

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== MENU_ID) return;
  if (!tab?.id) return;
  await speedReadInTab(tab.id, info.selectionText || '');
});

chrome.commands.onCommand.addListener(async (command) => {
  if (command !== 'speed-read-selection') return;
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return;
  const [{ result: selection } = {}] = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => window.getSelection()?.toString() || '',
  });
  await speedReadInTab(tab.id, selection || '');
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type === 'RK_GET_WPM') {
    getWpm().then((wpm) => sendResponse({ wpm }));
    return true;
  }
  if (message?.type === 'RK_SET_WPM') {
    const wpm = Math.min(1500, Math.max(100, Math.round(Number(message.wpm) || DEFAULT_WPM)));
    chrome.storage.sync.set({ [STORAGE_KEY]: wpm }).then(() => sendResponse({ wpm }));
    return true;
  }
  return false;
});

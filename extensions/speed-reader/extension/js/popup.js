const wpmInput = document.getElementById('wpm');
const wpmVal = document.getElementById('wpm-val');

function show(wpm) {
  wpmInput.value = String(wpm);
  wpmVal.textContent = String(wpm);
}

chrome.runtime.sendMessage({ type: 'RK_GET_WPM' }, (res) => {
  if (res?.wpm) show(res.wpm);
});

wpmInput.addEventListener('input', () => {
  const wpm = Number(wpmInput.value) || 350;
  wpmVal.textContent = String(wpm);
  chrome.runtime.sendMessage({ type: 'RK_SET_WPM', wpm });
});

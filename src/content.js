chrome.storage.sync.get({
  shortcutKeys: [],
}, ({ shortcutKeys }) => {
  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey) {
      shortcutKeys.forEach((shortcutKey) => {
        if (shortcutKey.actionKey === event.key) {
          location.href = `javascript:${shortcutKey.scriptCode}`;
        }
      });
    }
  });
});

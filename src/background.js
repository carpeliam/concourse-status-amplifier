chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.executeScript({ file: 'contentScript.js' });
  chrome.tabs.insertCSS({ file: 'contentScript.css' });
});

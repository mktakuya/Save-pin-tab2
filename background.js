chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  var url = tab.url.split('#')[0].split("?")[0];

  var pinnedUrls = localStorage.getItem('pinnedUrls') ?
    JSON.parse(localStorage.getItem('pinnedUrls')) : [];

  if (typeof changeInfo.pinned !== 'undefined') {
    if (changeInfo.pinned === true && pinnedUrls.indexOf(url) === -1) {
      pinnedUrls.push(url);
    } else if (changeInfo.pinned === false && pinnedUrls.indexOf(url) >= 0) {
      pinnedUrls.splice(pinnedUrls.indexOf(url), 1);
    }
    console.log(pinnedUrls);
  }

  if (pinnedUrls.indexOf(url) != -1) {
    chrome.tabs.update(tabId, { 'pinned': true });
  }

  localStorage.setItem('pinnedUrls', JSON.stringify(pinnedUrls));
});


chrome.browserAction.onClicked.addListener(function (tab) {
    ["/static/js/0.js", "/static/js/3.js", "/static/js/content.js"].forEach((file) => {
        chrome.tabs.executeScript(null, { file: file });
    });
});
chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.executeScript(null, { file: "static/js/content.js" });
    chrome.tabs.insertCSS(tab.id, {
        file: "/static/css/content.css"
    });
    chrome.tabs.insertCSS(tab.id, {
        file: "/static/css/iconography.css"
    });
});
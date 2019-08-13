chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('Clicked browser action')
  chrome.storage.sync.get('enabled', result => {
    if (result.enabled != true) {
      result.enabled = false
    }
    result.enabled = !result.enabled
    console.log('Enabled? ', result.enabled)
    chrome.storage.sync.set({ enabled: result.enabled })
    if (result.enabled) {
      chrome.tabs.executeScript(null, { file: 'static/js/content.js' })
      chrome.tabs.insertCSS(tab.id, {
        file: '/static/css/content.css'
      })
      chrome.tabs.insertCSS(tab.id, {
        file: '/static/css/iconography.css'
      })
    } else {
      chrome.tabs.reload(tab.id)
    }
  })
})

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    console.log('Tab finished loading.')
    chrome.storage.sync.get('enabled', result => {
      if (result.enabled) {
        console.log('Enabled, auto-inserting.')
        chrome.tabs.executeScript(tab.id, { file: 'static/js/content.js' })
        chrome.tabs.insertCSS(tab.id, {
          file: '/static/css/content.css'
        })
        chrome.tabs.insertCSS(tab.id, {
          file: '/static/css/iconography.css'
        })
      }
    })
  }
})

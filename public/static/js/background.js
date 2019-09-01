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

function getData(results) {
  console.log('Hey, looks like...')
  console.log(results)
  let pages = results.query.pages
  return pages[Object.keys(pages)[0]]
}
function makeRequest(simple, text, callback) {
  var xhr = new XMLHttpRequest()
  let language = simple ? 'simple' : 'en'
  xhr.open(
    'GET',
    'https://' +
      language +
      '.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=' +
      text,
    true
  )
  xhr.send()

  xhr.onload = () => {
    let results = getData(JSON.parse(xhr.responseText))
    if (results.missing == '' && simple) {
      makeRequest(false, text, callback)
      //callback(results)
    } else {
      callback(results)
    }
  }
}
chrome.runtime.onMessage.addListener(function(request, sender, callback) {
  console.log(
    sender.tab
      ? 'from a content script:' + sender.tab.url
      : 'from the extension'
  )
  makeRequest(true, request.text, callback)
  return true
})

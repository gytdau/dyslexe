import cx from '../components/styles'

let bodyStorage = null
let headStorage = null

const headSelector =
  'head > *:not([data-emotion="css"]):not(#react-tooltip):not([rel="icon"]):not([rel="shortcut icon"]):not(title)'
const bodySelector = 'body > *:not(.' + cx('dyslexi-render') + ')'

// FULLSCREEN
function zap() {
  if (bodyStorage != null) {
    return
  }
  let body = document.getElementsByTagName('body')[0]
  body.classList.add(cx('body-loaded'))
  storeBodyData()
  deleteBodyNodes()
}
function unzap() {
  restoreBodyNodes()
}
function storeBodyData() {
  let elements = document.querySelectorAll(bodySelector)
  bodyStorage = []
  elements.forEach(element => bodyStorage.push(element.cloneNode(true)))
  elements = document.querySelectorAll(headSelector)
  headStorage = []
  elements.forEach(element => headStorage.push(element.cloneNode(true)))
}
function restoreBodyNodes() {
  let body = document.getElementsByTagName('body')[0]
  bodyStorage.forEach(element => body.appendChild(element))
  bodyStorage = null
  let head = document.getElementsByTagName('head')[0]
  headStorage.forEach(element => head.appendChild(element))
  headStorage = null
}
function deleteBodyNodes() {
  document
    .querySelectorAll(bodySelector)
    .forEach(element => element.parentNode.removeChild(element))
  document
    .querySelectorAll(headSelector)
    .forEach(element => element.parentNode.removeChild(element))
}
function detectFullscreen(state) {
  if (state.step == 'onboarding') {
    zap()
    return
  }
  if (state.fullscreen) {
    zap()
  } else {
    if (bodyStorage != null) {
      unzap()
    }
  }
}

// OTHERS

function removeAllBodyClasses() {
  document
    .getElementsByClassName(cx('inserted-content'))[0]
    .classList.remove(cx('sidebar-container'), cx('sidebar-floating'))
}
function addBodyClasses(state) {
  if (state.step != 'article') {
    return
  }
  let container = document.getElementsByClassName(cx('inserted-content'))[0]
    .classList
  if (state.sidebar) {
    container.add(cx('sidebar-container'))
  } else {
    container.add(cx('sidebar-floating'))
  }
}
function updateReadingTheme(state) {
  removeAllBodyClasses()
  addBodyClasses(state)
  detectFullscreen(state)
  let body = document.getElementsByTagName('body')[0]
  var els = Array.from(body.childNodes)
  els.forEach(element => {
    if (!element.classList) {
      return
    }
    if (
      element.classList.contains(cx('sidebar-container')) ||
      element.classList.contains(cx('sidebar-floating'))
    ) {
      return
    }
    element
      .querySelectorAll('*')
      .forEach(element2 => element2.classList.add(cx('text-token')))
  })
}
export { removeAllBodyClasses, addBodyClasses, updateReadingTheme }

import cx from '../components/styles'

let bodyStorage = null
let headStorage = null

// FULLSCREEN
function zap() {
  console.log('Zapping has occured.')
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
  let elements = document.querySelectorAll(
    'body > *:not(.' + cx('dyslexi-render') + ')'
  )
  bodyStorage = []
  elements.forEach(element => bodyStorage.push(element.cloneNode(true)))
  elements = document.querySelectorAll('head > *')
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
  let elements = document.querySelectorAll(
    'body > *:not(.' + cx('dyslexi-render') + ')'
  )
  elements.forEach(element => element.parentNode.removeChild(element))
  elements = document.querySelectorAll('head > *')
  elements.forEach(element => element.parentNode.removeChild(element))
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
  var els = document.getElementsByTagName('*')
  for (var i = 0, all = els.length; i < all; i++) {
    els[i].classList.add(cx('text-token'))
  }
}
export { removeAllBodyClasses, addBodyClasses, updateReadingTheme }

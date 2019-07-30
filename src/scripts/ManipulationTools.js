import styles from '../styles/app.module.scss'

let bodyStorage = null

// FULLSCREEN
function zap() {
  console.log('Zapping has occured.')
  if (bodyStorage != null) {
    return
  }
  let body = document.getElementsByTagName('body')[0]
  body.classList.add(styles['body-loaded'])
  storeBodyData()
  deleteBodyNodes()
}
function unzap() {
  restoreBodyNodes()
}
function storeBodyData() {
  let elements = document.querySelectorAll(
    'body > *:not(.' + styles['dyslexi-render'] + ')'
  )
  bodyStorage = []
  elements.forEach(element => bodyStorage.push(element.cloneNode(true)))
}
function restoreBodyNodes() {
  let body = document.getElementsByTagName('body')[0]
  bodyStorage.forEach(element => body.appendChild(element))
  bodyStorage = null
}
function deleteBodyNodes() {
  let elements = document.querySelectorAll(
    'body > *:not(.' + styles['dyslexi-render'] + ')'
  )
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
    .getElementsByClassName(styles['inserted-content'])[0]
    .classList.remove(styles['sidebar-container'], styles['sidebar-floating'])
}
function addBodyClasses(state) {
  if (state.step != 'article') {
    return
  }
  let container = document.getElementsByClassName(styles['inserted-content'])[0]
    .classList
  if (state.sidebar) {
    container.add(styles['sidebar-container'])
  } else {
    container.add(styles['sidebar-floating'])
  }
}
function updateReadingTheme(state) {
  removeAllBodyClasses()
  addBodyClasses(state)
  detectFullscreen(state)
  var els = document.getElementsByTagName('*')
  for (var i = 0, all = els.length; i < all; i++) {
    els[i].classList.add(styles['text-token'])
  }
}
export { removeAllBodyClasses, addBodyClasses, updateReadingTheme }

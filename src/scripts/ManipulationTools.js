import styles from '../styles/app.module.scss'

// FULLSCREEN
function zap() {
  let body = document.getElementsByTagName('body')[0]
  body.classList.add(styles['body-loaded'])
  let elements = document.querySelectorAll(
    'body > *:not(' + styles['inserted-content'] + ')'
  )
  console.log('ZAP HAS COMMENCED!')
  console.log(elements)
  /*for (var i = 0; i < elements.length; i++) {
    elements[i].parentNode.removeChild(elements[i])
  }
  var elements = document.querySelectorAll('link, style, script')
  for (var i = 0; i < elements.length; i++) {
    elements[i].parentNode.removeChild(elements[i])
  }*/
}
function zapManyTimes() {
  let i = 0
  for (i = 0; i < 10; i++) {
    setTimeout(function() {
      zap()
    }, 200 * i)
  }
}
function becomeFullsceen(state) {
  if (state.fullscreen) {
    zap()
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
  becomeFullsceen(state)
  var els = document.getElementsByTagName('*')
  for (var i = 0, all = els.length; i < all; i++) {
    els[i].classList.add(styles['text-token'])
  }
}
export { removeAllBodyClasses, addBodyClasses, updateReadingTheme }

import React from 'react'
import ReaderView from './ReaderView'
import Onboarding from './Onboarding'
import Readability from '../readability'
import Article from './Article'
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/app.scss'
import Sidebar from './Sidebar'
import { isFulfilled } from 'q'
import ClosedSidebar from './ClosedSidebar'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      appState: null,
      article_data: {
        loading: true
      }
    }
    this.setAppState = this.setAppState.bind(this)
    this.refreshState = this.refreshState.bind(this)
  }
  setAppState(values) {
    console.log('Chrome app state has been updated!')
    console.log(values)
    let appState = this.state.appState
    Object.assign(appState, values)
    this.setState({ appState })
    chrome.storage.sync.set({ appState })
    updateReadingTheme(appState)
  }
  refreshState() {
    chrome.storage.sync.get('appState', result => {
      if (result.appState == undefined) {
        let appState = {
          step: 'onboarding',
          textSize: 1,
          lineHeight: 1
        }
        result.appState = appState
        chrome.storage.sync.set({ appState })
      }
      this.setState({
        appState: result.appState
      })
      updateReadingTheme(result.appState)
    })
  }
  render() {
    if (this.state.appState == null) {
      return (
        <div>
          <i className="mdi mdi-loading" />
        </div>
      )
    }
    switch (this.state.appState.step) {
      case null:
        return (
          <div>
            <i className="mdi mdi-loading" />
          </div>
        )
        break
      case 'onboarding':
        return (
          <div className="full-screen-view">
            <Onboarding setAppState={this.setAppState} />
          </div>
        )
        break
      case 'article':
        if (this.state.appState.sidebar) {
          return (
            <Sidebar
              setAppState={this.setAppState}
              appState={this.state.appState}
            />
          )
        } else {
          return (
            <ClosedSidebar
              setAppState={this.setAppState}
              appState={this.state.appState}
            />
          )
        }
        //return (
        //  <Article article_document={this.state.article_document} />
        //)
        break
    }
    return (
      <div>
        <h1>Try refreshing Dyslexi.</h1>
      </div>
    )
  }

  componentDidMount() {
    this.setState({
      article_document: document.cloneNode(true)
    })

    var elements = document.querySelectorAll('link[rel=stylesheet]')
    for (var i = 0; i < elements.length; i++) {
      //elements[i].parentNode.removeChild(elements[i])
    }

    /* global chrome */
    watchUndesiredContent()
    pruneUndesiredContent()
    this.refreshState()
  }
}
function pruneUndesiredContent() {
  let body = document.getElementsByTagName('body')[0]
  body.classList.add('dyslexi-body-loaded')
  var elements = document.querySelectorAll(
    'body > *:not(.dyslexi-inserted-content)'
  )
  for (var i = 0; i < elements.length; i++) {
    //elements[i].parentNode.removeChild(elements[i])
  }
  var elements = document.querySelectorAll('link, style, script')
  for (var i = 0; i < elements.length; i++) {
    //elements[i].parentNode.removeChild(elements[i])
  }
}
function watchUndesiredContent() {
  let i = 0
  for (i = 0; i < 10; i++) {
    setTimeout(function() {
      pruneUndesiredContent()
    }, 200 * i)
  }
}
function updateReadingTheme(state) {
  let container = document.getElementsByClassName('dyslexi-inserted-content')[0]
    .classList
  if (state.step == 'article') {
    container.add('dyslexi-sidebar-container')
  }
  var els = document.getElementsByTagName('*')
  for (var i = 0, all = els.length; i < all; i++) {
    els[i].classList.remove(
      'textSize-1',
      'textSize-2',
      'textSize-3',
      'lineHeight-1',
      'lineHeight-2',
      'lineHeight-3'
    )
    els[i].classList.add('textSize-' + state.textSize)
    els[i].classList.add('lineHeight-' + state.lineHeight)
  }
}

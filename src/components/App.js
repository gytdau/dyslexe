import React from 'react'
import ReaderView from './ReaderView'
import Onboarding from './Onboarding'
import Readability from '../readability'
import Article from './Article'
import 'bootstrap/dist/css/bootstrap.css'
import styles from '../styles/app.module.scss'
import '../styles/user_adjustments.scss'
import Sidebar from './Sidebar'
import * as ManipulationTools from '../scripts/ManipulationTools'
import ClosedSidebar from './ClosedSidebar'
import ColorTint from './Tools/ColorTint'
import TextStyle from './Tools/TextStyle'

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
    ManipulationTools.updateReadingTheme(appState)
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
      ManipulationTools.updateReadingTheme(result.appState)
    })
  }
  render() {
    let content = (
      <div>
        <i className="mdi mdi-loading" />
      </div>
    )
    if (this.state.appState == null) {
      return content
    }
    switch (this.state.appState.step) {
      case 'onboarding':
        content = (
          <div
            className={
              styles['full-screen-view'] + ' ' + styles['dyslexi-render']
            }
          >
            <Onboarding setAppState={this.setAppState} />
          </div>
        )
        break
      case 'article':
        if (this.state.appState.sidebar) {
          content = (
            <Sidebar
              setAppState={this.setAppState}
              appState={this.state.appState}
            />
          )
        } else {
          content = (
            <ClosedSidebar
              setAppState={this.setAppState}
              appState={this.state.appState}
            />
          )
        }
        break
    }
    return (
      <>
        {content}
        <ColorTint appState={this.state.appState} />
        <TextStyle appState={this.state.appState} />
      </>
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
    this.refreshState()
  }
}

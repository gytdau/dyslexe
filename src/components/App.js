import React from 'react'
import ReaderView from './Tools/ReaderView'
import Onboarding from './Onboarding'
import Readability from '../readability'
import Article from './Article'
import cx from './styles'
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
      article_data: null
    }
    this.setAppState = this.setAppState.bind(this)
    this.refreshState = this.refreshState.bind(this)
  }
  setAppState(values) {
    console.log('Chrome app state has been updated!')
    console.log(values)
    let { appState, article_data } = this.state
    if (!this.state.appState.fullscreen && values.fullscreen) {
      console.log('!!! Document has been cloned, entering fullscreen...')
      article_data = document.cloneNode(true)
    }
    Object.assign(appState, values)
    this.setState({ appState, article_data })
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
      let { article_data } = this.state
      if (result.appState.fullscreen) {
        article_data = document.cloneNode(true)
      }
      this.setState({
        appState: result.appState,
        article_data
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
          <div className={cx('full-screen-view', 'dyslexi-render')}>
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
        if (this.state.appState.fullscreen) {
          content = (
            <>
              {this.state.article_data ? (
                <ReaderView article_document={this.state.article_data} />
              ) : null}
              {content}
            </>
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

    /* global chrome */
    this.refreshState()
  }
}

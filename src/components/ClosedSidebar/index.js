import React from 'react'
import cx from '../styles'
import FloatingButton from './FloatingButton'

export default class ClosedSidebar extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className={cx('sidebar-floating', 'dyslexi-render')}>
        <FloatingButton
          icon="settings"
          onClick={() => this.props.setAppState({ sidebar: true })}
        />
        {window.location.host == 'docs.google.com' ? null : (
          <FloatingButton
            icon={
              this.props.appState.fullscreen ? 'fullscreen-exit' : 'fullscreen'
            }
            onClick={() =>
              this.props.setAppState({
                fullscreen: !this.props.appState.fullscreen
              })
            }
          />
        )}
        <FloatingButton
          icon={'close'}
          onClick={() => {
            chrome.storage.sync.set({ enabled: false }, () => {
              location.reload()
            })
          }}
        />
      </div>
    )
  }
}

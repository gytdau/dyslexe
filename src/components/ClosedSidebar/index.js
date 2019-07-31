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
      </div>
    )
  }
}

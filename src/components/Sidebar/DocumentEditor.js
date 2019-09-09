import React from 'react'
import cx from '../styles'

export default class DocumentEditor extends React.Component {
  enableEditor() {
    this.props.setAppState({
      step: 'editor'
    })
  }
  render() {
    if (this.props.appState.step == 'editor') {
      return null
    }
    return (
      <div className={cx('card', 'mt-4', 'mb-4')}>
        <div className={cx('card-body')}>
          <h5 className={cx('card-title')}>Dyslex.ie Writer</h5>
          <p className={cx('card-text')}>
            Write documents right inside Dyslex.ie.
          </p>
          <div
            onClick={this.enableEditor.bind(this)}
            className={cx('btn', 'btn-primary')}
          >
            Open
          </div>
        </div>
      </div>
    )
  }
}

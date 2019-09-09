import React from 'react'
import cx from '../styles'

export default class DocumentEditor extends React.Component {
  enableEditor() {
    window.location.assign('https://docs.google.com/')
  }
  render() {
    return (
      <div className={cx('card', 'mt-4', 'mb-4')}>
        <div className={cx('card-body')}>
          <h5 className={cx('card-title')}>Use with Google Docs</h5>
          <p className={cx('card-text')}>Enjoy Google Docs with Dyslex.ie.</p>
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

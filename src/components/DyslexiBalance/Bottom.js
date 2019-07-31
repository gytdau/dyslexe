import React from 'react'
import cx from '../styles'

export default class Bottom extends React.Component {
  render() {
    return (
      <div className={cx('balance-bottom') + ' ' + this.props.className}>
        <div className={cx('container')}>{this.props.children}</div>
      </div>
    )
  }
}

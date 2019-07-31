import React from 'react'
import cx from '../styles'

export default class Top extends React.Component {
  render() {
    return (
      <div className={cx('balance-top', 'bg-teal-gradient')}>
        <div className={cx('container')}>{this.props.children}</div>
      </div>
    )
  }
}

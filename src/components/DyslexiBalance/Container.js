import React from 'react'
import cx from '../styles'

export default class Container extends React.Component {
  render() {
    return <div className={cx('dyslexi-balance')}>{this.props.children}</div>
  }
}

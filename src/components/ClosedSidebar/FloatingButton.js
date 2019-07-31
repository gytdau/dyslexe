import React from 'react'
import cx from '../styles'

export default props => (
  <div className={cx('btn-float')} onClick={props.onClick}>
    <i className={'mdi mdi-' + props.icon} />
  </div>
)

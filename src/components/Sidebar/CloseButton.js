import React from 'react'
import cx from '../styles'

export default props => (
  <div
    onClick={() => props.setAppState({ sidebar: false })}
    className={cx(
      'list-group-item',
      'list-group-item-action',
      'bg-light',
      'btn',
      'btn-link'
    )}
  >
    Close <i className="mdi mdi-close" />
  </div>
)

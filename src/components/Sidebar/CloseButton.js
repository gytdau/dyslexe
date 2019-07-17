import React from 'react'

export default props => (
  <div
    onClick={() => props.setAppState({ sidebar: false })}
    className="list-group-item list-group-item-action bg-light btn btn-link"
  >
    Close <i className="mdi mdi-close" />
  </div>
)

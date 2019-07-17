import React from 'react'

export default class ClosedSidebar extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="dyslexi-floating">
        <div
          onClick={() => this.props.setAppState({ sidebar: true })}
          className="btn btn-default btn-lg"
        >
          Open <i className="mdi mdi-chevron-right" />
        </div>
      </div>
    )
  }
}

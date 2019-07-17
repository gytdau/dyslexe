import React from 'react'
import PropertySlider from './PropertySlider'
import TestAgain from './TestAgain'
import DemoNotice from './DemoNotice'
import CloseButton from './CloseButton'
export default class Sidebar extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log(this.props.appState)
    return (
      <div className="dyslexi-sidebar">
        <div className="list-group list-group-flush">
          <CloseButton setAppState={this.props.setAppState} />
        </div>
        <div className="sidebar-content">
          <PropertySlider
            valueName="textSize"
            value={this.props.appState.textSize}
            setAppState={this.props.setAppState}
            label={
              <span>
                <i className="mdi mdi-format-size" /> Text size
              </span>
            }
          />
          <PropertySlider
            valueName="lineHeight"
            value={this.props.appState.lineHeight}
            setAppState={this.props.setAppState}
            label={
              <span>
                <i className="mdi mdi-text" /> Line height
              </span>
            }
          />
          <TestAgain />
          <DemoNotice />
        </div>
      </div>
    )
  }
}

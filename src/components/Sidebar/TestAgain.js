import React from 'react'

export default class TestAgain extends React.Component {
  testAgain() {
    this.props.setAppState({ step: 'onboarding', testingAgain: true })
  }
  render() {
    return (
      <div className="card mt-4 mb-4 ">
        <div className="card-body">
          <h5 className="card-title">Test again</h5>
          <p className="card-text">
            You can complete the Dyslexi test another time if you like.
          </p>
          <div onClick={this.testAgain.bind(this)} className="btn btn-primary">
            Start again
          </div>
        </div>
      </div>
    )
  }
}

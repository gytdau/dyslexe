import React from 'react'
import cx from '../styles'

export default class TestAgain extends React.Component {
  testAgain() {
    this.props.setAppState({
      step: 'onboarding',
      testingAgain: true,
      colorTint: false,
      textEnhancements: false,
      fontChange: false
    })
  }
  render() {
    return (
      <div className={cx('card', 'mt-4', 'mb-4')}>
        <div className={cx('card-body')}>
          <h5 className={cx('card-title')}>Test again</h5>
          <p className={cx('card-text')}>
            You can complete the Dyslexi test another time if you like.
          </p>
          <div
            onClick={this.testAgain.bind(this)}
            className={cx('btn', 'btn-primary')}
          >
            Start again
          </div>
        </div>
      </div>
    )
  }
}

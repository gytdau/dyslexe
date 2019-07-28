import React from 'react'
import PropertySlider from './PropertySlider'
import TestAgain from './TestAgain'
import DemoNotice from './DemoNotice'
import CloseButton from './CloseButton'
import styles from '../../styles/app.module.scss'
import Group from './Group'
import { SliderPicker } from 'react-color'
import FontPicker from './FontPicker'

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log(this.props.appState)
    return (
      <div className={styles['sidebar'] + ' ' + styles['dyslexi-render']}>
        <div className="list-group list-group-flush">
          <CloseButton setAppState={this.props.setAppState} />
        </div>
        <div className={styles['sidebar-content']}>
          <div className="list-group list-group-flush">
            <Group
              label="Text enhancements"
              {...this.props}
              switch="textEnhancements"
            >
              <PropertySlider
                valueName="textSize"
                value={this.props.appState.textSize}
                {...this.props}
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
            </Group>
            <Group label="Font" {...this.props} switch="fontChange">
              <FontPicker {...this.props} />
            </Group>
            <Group label="Color tint" {...this.props} switch="colorTint">
              <SliderPicker
                className="mt-4"
                color={this.props.appState.colorTintColor}
                onChangeComplete={color =>
                  this.props.setAppState({ colorTintColor: color.hex })
                }
              />
            </Group>
            <TestAgain />
            <DemoNotice />
          </div>
        </div>
      </div>
    )
  }
}

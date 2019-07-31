import React from 'react'
import ReactTooltip from 'react-tooltip'
import cx from '../styles'
import CloseButton from './CloseButton'
import ColorPicker from './ColorPicker'
import DemoNotice from './DemoNotice'
import FontPicker from './FontPicker'
import Group from './Group'
import PropertySlider from './PropertySlider'
import TestAgain from './TestAgain'

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log(this.props.appState)
    return (
      <div className={cx('sidebar', 'dyslexi-render')}>
        <div className={cx('list-group', 'list-group-flush')}>
          <CloseButton setAppState={this.props.setAppState} />
        </div>
        <div className={cx('sidebar-content')}>
          <div className={cx('list-group', 'list-group-flush')}>
            <Group
              label="Text enhancements"
              help="Change how big the text is or how spaced apart it is."
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
            <Group
              help="Change the font the text is shown in."
              label="Font"
              {...this.props}
              switch="fontChange"
            >
              <FontPicker {...this.props} />
            </Group>
            <Group
              help="Add a light transparent color to the entire page."
              label="Color tint"
              {...this.props}
              switch="colorTint"
            >
              <ColorPicker {...this.props} />
            </Group>
            <TestAgain {...this.props} />
            <DemoNotice />
          </div>
        </div>
        <ReactTooltip />
      </div>
    )
  }
}

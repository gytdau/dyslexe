import React from 'react'
import ReactTooltip from 'react-tooltip'
import cx from '../styles'
import CloseButton from './CloseButton'
import ColorPicker from './ColorPicker'
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
              help="Only show a couple of lines at a time."
              label="Line focus"
              {...this.props}
              switch="lineFocus"
            >
              <PropertySlider
                valueName="lineFocusHeight"
                value={this.props.appState.lineFocusHeight}
                setAppState={this.props.setAppState}
                label={
                  <span>
                    <i className="mdi mdi-arrow-split-horizontal" /> Size of
                    clear area
                  </span>
                }
              />
            </Group>
            <Group
              help="Show small dots between every syllable"
              label="Split up syllables"
              {...this.props}
              switch="syllables"
            >
              {this.props.appState.fullscreen ? null : (
                <span className={cx('text-muted')}>
                  Turn on full screen mode to use this feature.
                </span>
              )}
            </Group>
            <Group
              help="Add a light transparent color to the entire page, which affects the background color and the text color."
              label="Color tint"
              {...this.props}
              switch="colorTint"
              switchOff="backgroundTint"
            >
              <ColorPicker {...this.props} propertyName="colorTintBase" />
            </Group>
            <Group
              help="Change the background color without affecting the text color."
              label="Background tint"
              {...this.props}
              switch="backgroundTint"
              switchOff="colorTint"
            >
              <ColorPicker {...this.props} propertyName="backgroundTintBase" />
            </Group>
            <TestAgain {...this.props} />
          </div>
        </div>
        <ReactTooltip />
      </div>
    )
  }
}

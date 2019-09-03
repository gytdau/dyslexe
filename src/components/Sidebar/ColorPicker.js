import React from 'react'
import { Alpha } from 'react-color/lib/components/common'
import { CirclePicker } from 'react-color'
import '../../styles/picker.scss'
import cx from '../styles'

export default class ColorPicker extends React.Component {
  render() {
    return (
      <>
        <CirclePicker
          className={cx('mt-4')}
          color={this.props.appState[this.props.propertyName]}
          onChangeComplete={color => {
            color.a = 0.3
            color.hsl.a = color.a
            color.hsv.a = color.a
            color.rgb.a = color.a
            this.props.setAppState({ [this.props.propertyName]: color })
          }}
          width="100%"
        />
        {this.props.appState[this.props.propertyName] ? (
          <div className={cx('alpha-slider-container')}>
            <Alpha
              value={this.props.appState[this.props.propertyName]}
              onChange={color => {
                let colorTintBase = this.props.appState[this.props.propertyName]
                colorTintBase.a = color.a
                colorTintBase.hsl.a = color.a
                colorTintBase.hsv.a = color.a
                colorTintBase.rgb.a = color.a
                this.props.setAppState({
                  [this.props.propertyName]: colorTintBase
                })
              }}
              radius="10px"
              shadow={0}
              direction="horizontal"
              height="15px"
              {...this.props.appState[this.props.propertyName]}
            />
          </div>
        ) : null}
      </>
    )
  }
}

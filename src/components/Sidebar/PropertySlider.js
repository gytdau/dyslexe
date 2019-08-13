import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import React from 'react'
import cx from '../styles'
export default class PropertySlider extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className={cx('input-component')}>
        <h5>{this.props.label}</h5>
        <Slider
          min={1}
          defaultValue={this.props.value}
          max={5}
          marks={{ 1: 'Small', 2: '', 3: '', 4: '', 5: 'Big' }}
          step={1}
          onChange={value =>
            this.props.setAppState({ [this.props.valueName]: value })
          }
        />
      </div>
    )
  }
}

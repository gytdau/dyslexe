import React from 'react'
import Slider, { Range } from 'rc-slider'
import 'rc-slider/assets/index.css'
import styles from '../../styles/app.module.scss'
import Select from 'react-select'

let fonts = [
  'Arial',
  'Open Dyslexic',
  'Calibri',
  'Verdana',
  'Comic Sans MS',
  'Georgia',
  'Tahoma',
  'Trebuchet'
]
let options = []
for (let font of fonts) {
  options.push({ value: font, label: font })
}

export default class FontPicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      font: null
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(selectedOption) {
    this.props.setAppState({ fontChangeFont: selectedOption.value })
    console.log(`Option selected:`, selectedOption)
  }
  render() {
    let value = {
      value: this.props.appState.fontChangeFont,
      label: this.props.appState.fontChangeFont
    }
    return (
      <Select options={options} onChange={this.handleChange} value={value} />
    )
  }
}

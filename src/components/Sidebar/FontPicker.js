import 'rc-slider/assets/index.css'
import React from 'react'
import Select from 'react-select'
import cx from '../styles'

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
  colorStyles() {
    return {
      menuPortal: base => {
        const { zIndex, ...rest } = base // remove zIndex from base by destructuring
        return { ...rest, zIndex: 99999999999 }
      },
      option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
          ...styles,
          fontFamily: data.value
        }
      },
      singleValue: (styles, { data }) => ({ ...styles, fontFamily: data.value })
    }
  }
  render() {
    let value = {
      value: this.props.appState.fontChangeFont,
      label: this.props.appState.fontChangeFont
    }
    return (
      <Select
        options={options}
        onChange={this.handleChange}
        value={value}
        menuPortalTarget={document.body}
        styles={this.colorStyles()}
      />
    )
  }
}

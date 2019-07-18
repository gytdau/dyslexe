import React from 'react'
import Slider, { Range } from 'rc-slider'
import 'rc-slider/assets/index.css'
import styles from '../../styles/app.module.scss'
import Select from 'react-select'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

export default class FontPicker extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <Select options={options} />
  }
}

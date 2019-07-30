import React from 'react'
import ReactDOM from 'react-dom'
import styles from '../../styles/app.module.scss'
import Tool from './Tool'

const body = document.getElementsByTagName('body')[0]

export default class ColorTint extends Tool {
  render() {
    if (!this.props.appState.colorTint) {
      return null
    }
    let color = this.props.appState.colorTintBase
    return ReactDOM.createPortal(
      <div
        className={styles['color-tint']}
        style={{ backgroundColor: color.hex, opacity: color.a }}
      />,
      this.el
    )
  }
}

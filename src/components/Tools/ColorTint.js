import React from 'react'
import ReactDOM from 'react-dom'
import cx from '../styles'
import Tool from './Tool'

const body = document.getElementsByTagName('body')[0]

export default class ColorTint extends Tool {
  render() {
    if (!this.props.appState.colorTint && !this.props.appState.backgroundTint) {
      return null
    }
    let color = null
    let mixBlendMode = null
    if (this.props.appState.colorTint) {
      color = this.props.appState.colorTintBase
      mixBlendMode = 'normal'
    }
    if (this.props.appState.backgroundTint) {
      color = this.props.appState.backgroundTintBase
      mixBlendMode = 'multiply'
    }

    return ReactDOM.createPortal(
      <div
        className={cx('color-tint')}
        style={{ backgroundColor: color.hex, opacity: color.a, mixBlendMode }}
      />,
      this.el
    )
  }
}

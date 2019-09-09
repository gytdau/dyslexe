import React from 'react'
import ReactDOM from 'react-dom'
import cx from '../styles'
import Tool from './Tool'

export default class TextStyle extends Tool {
  generateStyle() {
    const fontSizes = ['8pt', '12pt', '14pt', '18pt', '20pt']
    const lineHeights = [1.5, 2, 2.5, 3, 3.5]
    let style = {}
    let seperatorStyle = {}
    if (this.props.appState.textEnhancements) {
      Object.assign(style, {
        'font-size': fontSizes[this.props.appState.textSize - 1],
        'line-height': lineHeights[this.props.appState.lineHeight - 1]
      })
    }
    if (this.props.appState.fontChange) {
      Object.assign(style, {
        'font-family':
          '"' + this.props.appState.fontChangeFont + '", sans-serif'
      })
    }
    if (this.props.appState.syllables) {
      seperatorStyle = {
        display: 'inline-block'
      }
    } else {
      seperatorStyle = {
        display: 'none'
      }
    }
    // Generate CSS
    let result = ''
    for (var key in style) {
      result += key + ': ' + style[key] + ' !important; '
    }
    let seperatorResult = ''
    for (var key in seperatorStyle) {
      seperatorResult += key + ': ' + seperatorStyle[key] + ' !important; '
    }
    return `.${cx('text-token')} {${result}}\n.${cx(
      'sep'
    )} {${seperatorResult}}`
  }
  render() {
    return ReactDOM.createPortal(
      <style
        dangerouslySetInnerHTML={{
          __html: this.generateStyle()
        }}
      />,
      this.el
    )
  }
}

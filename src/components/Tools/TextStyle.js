import React from 'react'
import ReactDOM from 'react-dom'
import cx from '../styles'
import Tool from './Tool'

export default class TextStyle extends Tool {
  generateStyle() {
    let styles = {
      'text-token': {},
      sep: {},
      p: {},
      'dyslexi-page-inner': {}
    }
    if (this.props.appState.textEnhancements) {
      const fontSizes = ['8pt', '12pt', '14pt', '18pt', '20pt']
      const lineHeights = [1.5, 2, 2.5, 3, 3.5]
      styles['text-token']['font-size'] =
        fontSizes[this.props.appState.textSize - 1]
      styles['text-token']['line-height'] =
        lineHeights[this.props.appState.lineHeight - 1]
    }
    if (this.props.appState.fontChange) {
      styles['text-token']['font-family'] =
        '"' + this.props.appState.fontChangeFont + '", sans-serif'
    }
    if (this.props.appState.syllables) {
      styles['sep']['display'] = 'inline-block'
    } else {
      styles['sep']['display'] = 'none'
    }
    if (this.props.appState.changeLineLength) {
      const pageWidths = ['20em', '30em', '40em', '50em', '60em']
      styles['dyslexi-page-inner']['max-width'] =
        pageWidths[this.props.appState.changeLineLengthWidth]
    }
    if (this.props.appState.paragraphBorder) {
      styles['p'] = {
        border: '2px solid #222',
        padding: '0.5em',
        'border-radius': '5px',
        global: true
      }
    }
    // Generate CSS
    let result = ''
    for (var selector in styles) {
      let style = styles[selector]
      if (!style.global) {
        result += '.' + cx(selector)
        delete style.global
      } else {
        result += selector
      }
      result += ' {'
      for (var key in style) {
        result += key + ': ' + style[key] + ' !important; '
      }
      result += '}\n'
    }
    return result
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

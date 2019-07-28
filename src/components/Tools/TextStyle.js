import React from 'react'
import ReactDOM from 'react-dom'
import styles from '../../styles/app.module.scss'

const body = document.getElementsByTagName('body')[0]

export default class TextStyle extends React.Component {
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
    this.el.className += ' ' + styles['dyslexi-render']
  }

  componentDidMount() {
    body.appendChild(this.el)
  }

  componentWillUnmount() {
    body.removeChild(this.el)
  }
  generateStyle() {
    const fontSizes = ['8pt', '12pt', '14pt', '18pt', '20pt']
    const lineHeights = [1.5, 2, 2.5, 3, 3.5]
    let style = {}
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
    // Generate CSS
    let result = ''
    for (var key in style) {
      result += key + ': ' + style[key] + '; '
    }
    return '.' + styles['text-token'] + ' {' + result + '}'
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

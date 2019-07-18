import React from 'react'
import ReactDOM from 'react-dom'
import styles from '../../styles/app.module.scss'

const body = document.getElementsByTagName('body')[0]

export default class TextStyle extends React.Component {
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
  }

  componentDidMount() {
    body.appendChild(this.el)
  }

  componentWillUnmount() {
    body.removeChild(this.el)
  }

  generateStyle() {
    let style = {}
    const fontSizes = ['12pt', '14pt', '18pt', '36pt', '48pt']
    const lineHeights = [1.5, 2, 2.5, 3, 3.5]

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

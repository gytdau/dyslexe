import React from 'react'
import ReactDOM from 'react-dom'
import styles from '../../styles/app.module.scss'

const body = document.getElementsByTagName('body')[0]

export default class ColorTint extends React.Component {
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
  render() {
    if (!this.props.appState.colorTint) {
      return null
    }
    let color = this.props.appState.colorTintColor
    return ReactDOM.createPortal(
      <div
        className={styles['color-tint']}
        style={{ backgroundColor: color }}
      />,
      this.el
    )
  }
}

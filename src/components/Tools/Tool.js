import React from 'react'
import ReactDOM from 'react-dom'
import styles from '../../styles/app.module.scss'

const body = document.getElementsByTagName('body')[0]

export default class Tool extends React.Component {
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
}

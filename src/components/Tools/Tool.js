import React from 'react'
import ReactDOM from 'react-dom'
import cx from '../styles'

export default class Tool extends React.Component {
  constructor(props) {
    super(props)
    this.body = document.getElementsByTagName('body')[0]
    this.el = document.createElement('div')
    this.el.className += ' ' + cx('dyslexi-render')
  }

  componentDidMount() {
    this.body.appendChild(this.el)
  }

  componentWillUnmount() {
    this.body.removeChild(this.el)
  }
}

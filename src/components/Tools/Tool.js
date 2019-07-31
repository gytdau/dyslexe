import React from 'react'
import ReactDOM from 'react-dom'
import cx from '../styles'

const body = document.getElementsByTagName('body')[0]

export default class Tool extends React.Component {
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
    this.el.className += ' ' + cx('dyslexi-render')
  }

  componentDidMount() {
    body.appendChild(this.el)
  }

  componentWillUnmount() {
    body.removeChild(this.el)
  }
}

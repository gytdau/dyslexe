import React from 'react'
import ReactDOM from 'react-dom'
import '../../styles/readerview.scss'
import cx from '../styles'
import Tool from './Tool'
import axios from 'axios'

export default class OutroFormView extends Tool {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      checkbox: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.submit = this.submit.bind(this)
  }
  render() {
    let content = (
      <div>
        <h1>Have a minute?</h1>
        <p>
          We're glad to see you've been using Dyslex.ie for the past few days.
          If you have the time, answer these quick questions to help us make
          Dyslex.ie even better. This is the last time we'll ask for feedback.
        </p>
        <form>
          <div className={cx('form-group')}>
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className={cx('form-control')}
              name="email"
              placeholder="Enter email"
              value={this.props.email}
              onChange={this.handleInputChange}
            />
            <small id="emailHelp" className={cx('form-text', 'text-muted')}>
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className={cx('form-group')}>
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              className={cx('form-control')}
              name="password"
              placeholder="Password"
              value={this.props.password}
              onChange={this.handleInputChange}
            />
          </div>
          <div className={cx('form-check')}>
            <input
              type="checkbox"
              className={cx('form-check-input')}
              name="checkbox"
              value={this.props.checkbox}
              onChange={this.handleInputChange}
            />
            <label className={cx('form-check-label')} for="exampleCheck1">
              Check me out
            </label>
          </div>
          <div onClick={this.submit} className={cx('btn', 'btn-primary')}>
            Submit
          </div>
        </form>
      </div>
    )
    return ReactDOM.createPortal(
      <div className={cx('dyslexi-page')}>
        <div className={cx('dyslexi-page-inner', 'text-token')}>{content}</div>
      </div>,
      this.el
    )
  }
  handleInputChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }
  submit() {
    axios
      .post('https://dyslexie-7ab5a.firebaseio.com/responses.json', this.state)
      .then(() => {
        this.props.setAppState({ step: 'article' })
      })
  }
}

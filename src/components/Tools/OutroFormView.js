import React from 'react'
import ReactDOM from 'react-dom'
import '../../styles/readerview.scss'
import cx from '../styles'
import Tool from './Tool'
import axios from 'axios'

export default class OutroFormView extends Tool {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleInputChange = this.handleInputChange.bind(this)
    this.submit = this.submit.bind(this)
    this.dismiss = this.dismiss.bind(this)
  }
  render() {
    let content = (
      <div>
        <h1>
          Have a minute?{' '}
          <div
            className={cx('btn', 'btn-light', 'float-right')}
            onClick={this.dismiss}
          >
            <i className="mdi mdi-close" />
          </div>
        </h1>
        <p>
          We're glad to see you've been using Dyslex.ie for the past few days.
          If you have the time, answer these quick questions to help us make
          Dyslex.ie even better. This is the last time we'll ask for feedback.
        </p>
        <form>
          <div className={cx('form-group')}>
            <label>
              How has your experience of reading changed with Dyslex.ie?
            </label>
            <select
              className={cx('form-control')}
              id="change"
              rows="3"
              name="change"
              value={this.props.change}
              onChange={this.handleInputChange}
              required
            >
              <option>Select...</option>
              <option value="much-worse">Got much worse</option>
              <option value="a-little-worse">Got a little worse</option>
              <option value="stayed-the-same">Stayed the same</option>
              <option value="a-little-better">Got a little better</option>
              <option value="much-better">Got much better</option>
            </select>
          </div>
          <div className={cx('form-group')}>
            <label>
              Would you be willing to pay for Dyslex.ie? If so, how much?
            </label>
            <textarea
              className={cx('form-control')}
              id="payments"
              rows="3"
              name="payments"
              value={this.props.payments}
              onChange={this.handleInputChange}
            ></textarea>
          </div>
          <div className={cx('form-group')}>
            <label>Which part of Dyslex.ie did you not like the most?</label>
            <textarea
              className={cx('form-control')}
              id="feedback"
              rows="3"
              name="feedback"
              value={this.props.feedback}
              onChange={this.handleInputChange}
            ></textarea>
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
  dismiss() {
    this.props.setAppState({ step: 'article', outroFormSeen: true })
  }
  submit() {
    axios
      .post('https://dyslexie-7ab5a.firebaseio.com/outro.json', this.state)
      .then(() => {
        this.dismiss()
      })
  }
}

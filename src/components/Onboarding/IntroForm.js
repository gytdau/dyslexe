import axios from 'axios'
import React from 'react'
import '../../styles/readerview.scss'
import { Bottom, Container, Top } from '../DyslexiBalance'
import cx from '../styles'

export default class IntroForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleInputChange = this.handleInputChange.bind(this)
    this.submit = this.submit.bind(this)
  }
  render() {
    return (
      <Container>
        <Top>
          <h1>First, some questions</h1>
        </Top>
        <Bottom>
          <p>
            If you have the time, take a few minutes to answer these questions
            so that we can better improve Dyslex.ie for you.
          </p>
          <form>
            <div className={cx('form-group')}>
              <label>How challenging is your dyslexia?</label>
              <select
                className={cx('form-control')}
                id="challenging"
                name="challenging"
                value={this.props.challenging}
                onChange={this.handleInputChange}
                required
              >
                <option>Select...</option>
                <option value="not-at-all">Not at all</option>
                <option value="a-little-challenging">
                  A little challenging
                </option>
                <option value="somewhat-challenging">
                  Somewhat challenging
                </option>
                <option value="very-challenging">Very challenging</option>
                <option value="extremely-challenging">
                  Extremely challenging
                </option>
              </select>
            </div>
            <div className={cx('form-group')}>
              <label>How does dylsexia affect you?</label>
              <textarea
                className={cx('form-control')}
                id="effect"
                rows="3"
                name="effect"
                value={this.props.effect}
                onChange={this.handleInputChange}
              ></textarea>
            </div>
            <div className={cx('form-group')}>
              <label>How do you currently deal with dyslexia?</label>
              <textarea
                className={cx('form-control')}
                id="dealing"
                rows="3"
                name="dealing"
                value={this.props.dealing}
                onChange={this.handleInputChange}
              ></textarea>
            </div>
            <div className={cx('form-group')}>
              <label>
                Do you currently use any online tools to help? If so, which
                ones?
              </label>
              <textarea
                className={cx('form-control')}
                id="tools"
                rows="3"
                name="tools"
                value={this.props.tools}
                onChange={this.handleInputChange}
              ></textarea>
            </div>
            <div className={cx('form-group')}>
              <label>
                Do you have issues with reading your device's keboard?
              </label>
              <select
                className={cx('form-control')}
                id="readingIssues"
                rows="3"
                name="readingIssues"
                value={this.props.readingIssues}
                onChange={this.handleInputChange}
                required
              >
                <option>Select...</option>
                <option value="no">No, none</option>
                <option value="yes-phone">Yes, on my phone</option>
                <option value="yes-computer">Yes, on my computer</option>
                <option value="yes-phone-computer">
                  Yes, on both my phone and my computer
                </option>
              </select>
            </div>
          </form>
          <div
            className={`btn btn-primary ${cx('btn')} ${cx('btn-primary')}`}
            onClick={this.submit}
          >
            <i className="mdi mdi-check" /> Done
          </div>
        </Bottom>
      </Container>
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
      .post('https://dyslexie-7ab5a.firebaseio.com/intro.json', this.state)
      .then(() => {
        this.props.respond()
      })
  }
}

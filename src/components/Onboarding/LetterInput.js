import React from 'react'
import styles from '../../styles/app.module.scss'

export default class LetterInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      letters: ['']
    }
    this.add = this.add.bind(this)
    this.remove = this.remove.bind(this)
    this.change = this.change.bind(this)
  }
  remove(index) {
    let letters = this.state.letters
    delete letters[index]
    this.setState({ letters })
  }
  change(event, index) {
    let val = event.target.value
    if (!this.isLetter(val)) {
      val = ''
    }
    let letters = this.state.letters
    letters[index] = val
    this.setState({ letters })
  }
  add() {
    let letters = this.state.letters
    letters.push('')
    this.setState({ letters })
  }
  isLetter(c) {
    return c.toLowerCase() != c.toUpperCase()
  }
  render() {
    return (
      <div>
        <p>
          Type in the letter you can see upside down in the box below. To add
          another letter, click the button below.
        </p>
        {this.state.letters.map((letter, index) => (
          <div className={styles['letter-input']} key={index}>
            <input
              className={`form-control ${styles['form-control']}`}
              maxLength={1}
              onChange={e => this.change(e, index)}
              value={letter}
            />
            <div className="btn btn-link" onClick={() => this.remove(index)}>
              <i className="mdi mdi-close" /> Remove
            </div>
          </div>
        ))}
        <div className="btn btn-link size-normal" onClick={this.add}>
          <i className="mdi mdi-plus" /> Add another letter
        </div>
        <div
          className={`btn btn-primary ${styles['btn']} ${
            styles['btn-primary']
          }`}
          onClick={() => {
            this.props.respond(this.state.letters)
          }}
        >
          <i className="mdi mdi-check" /> Done
        </div>
      </div>
    )
  }
}

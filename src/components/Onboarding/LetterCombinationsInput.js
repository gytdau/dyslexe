import React from 'react'
import styles from '../../styles/app.module.scss'

export default class LetterCombinationsInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      letters: [['', '']]
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
  change(event, index, pos) {
    let val = event.target.value
    if (!this.isLetter(val)) {
      val = ''
    }
    let letters = this.state.letters
    letters[index][pos] = val
    this.setState({ letters })
  }
  add() {
    let letters = this.state.letters
    letters.push(['', ''])
    this.setState({ letters })
  }
  isLetter(c) {
    return c.toLowerCase() != c.toUpperCase()
  }
  render() {
    return (
      <div>
        <p>
          Type in the letters you mix up in the boxes below. To add another set
          of two letters you mix up, click the button below.
        </p>
        {this.state.letters.map((letters, index) => (
          <div className={styles['letter-input']} key={index}>
            <input
              className={`form-control ${styles['form-control']}`}
              maxLength={1}
              onChange={e => this.change(e, index, 0)}
              value={letters[0]}
            />
            <span>
              <i
                className={`mdi mdi-swap-horizontal ${
                  styles['letter-input-icon']
                }`}
              />
            </span>
            <input
              className={`form-control ${styles['form-control']}`}
              maxLength={1}
              onChange={e => this.change(e, index, 1)}
              value={letters[1]}
            />
            <div className="btn btn-link" onClick={() => this.remove(index)}>
              <i className="mdi mdi-close" /> Remove
            </div>
          </div>
        ))}
        <div className="btn btn-link size-normal" onClick={this.add}>
          <i className="mdi mdi-plus" /> Add another pair of letters
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

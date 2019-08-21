import React from 'react'
import cx from '../styles'

export default class FontTest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fonts: ['Open Dyslexic', 'Times New Roman'],
      choosing: ['Arial', 'Verdana'],
      chosenFont: ''
    }
    this.choose = this.choose.bind(this)
  }
  choose(chosenFont) {
    if (this.state.fonts.length == 0) {
      this.props.respond(chosenFont)
      return
    }
    let { choosing, fonts } = this.state
    choosing = [chosenFont, fonts.pop()]
    this.setState({
      chosenFont,
      fonts,
      choosing
    })
  }
  render() {
    let { choosing } = this.state
    let options = choosing.map(font => (
      <div className={cx('font-choose')}>
        <p style={{ fontFamily: `${font}, serif` }}>
          Penguins eat krill, fish, squid, and other small animals from the
          ocean, which they catch. They are at home in the ocean. They come up
          on the land or ice to lay their eggs and raise the chicks. They don't
          eat there because they live in places where the land has no food for
          them. In most species the birds all nest together in a huge group,
          called a rookery. They usually make nests on the ground with rocks or
          mud.
        </p>
        <div
          className={`${cx('btn', 'btn-primary', 'btn-primary-large')}`}
          onClick={() => {
            this.choose(font)
          }}
        >
          Choose this
        </div>
      </div>
    ))

    return (
      <div className={'fade-in'} key={this.state.fonts.length}>
        {options}
      </div>
    )
  }
}

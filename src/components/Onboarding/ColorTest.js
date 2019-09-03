import React from 'react'
import cx from '../styles'
import colorData from './colorData'

export default class ColorTest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      colors: [colorData[2], colorData[3], colorData[4], colorData[5]],
      choosing: [colorData[0], colorData[1]],
      chosenColor: {}
    }
    this.choose = this.choose.bind(this)
  }
  choose(chosenColor) {
    if (this.state.colors.length == 0) {
      this.props.respond(chosenColor)
      return
    }
    let { choosing, colors } = this.state
    choosing = [chosenColor, colors.pop()]
    this.setState({
      chosenColor,
      colors,
      choosing
    })
  }
  render() {
    let { choosing } = this.state
    let options = choosing.map(color => (
      <div className={cx('font-choose')}>
        <p
          style={{
            backgroundColor: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
          }}
        >
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
            this.choose(color)
          }}
        >
          Choose this
        </div>
      </div>
    ))

    return (
      <div className={'fade-in'} key={this.state.colors.length}>
        {options}
      </div>
    )
  }
}

import React from 'react'
import ReactDOM from 'react-dom'
import cx from '../styles'
import Tool from './Tool'

const body = document.getElementsByTagName('body')[0]

export default class LineFocus extends Tool {
  constructor(props) {
    super(props)
    this.state = {
      x: 0,
      y: 0
    }
  }
  getDimensions() {
    return {
      width: document.documentElement.clientWidth,
      height: 5000,
      gap: 30 * this.props.appState.lineFocusHeight
    }
  }
  move(x, y) {
    let { width, height, gap } = this.getDimensions()
    this.setState({ x: 0, y: y - height - gap / 2 })
  }
  render() {
    if (!this.props.appState.lineFocus) {
      return null
    }
    const { x, y } = this.state
    let { width, height, gap } = this.getDimensions()
    return ReactDOM.createPortal(
      <Draggable x={x} y={y} onMove={this.move.bind(this)}>
        <svg
          width={width}
          height={height + height + gap}
          viewBox={`0 0 ${width} ${height + height + gap}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width={width} height={height} fill="black" fill-opacity="0.6" />
          <rect
            y={height + gap}
            width={width}
            height={height}
            fill="black"
            fill-opacity="0.6"
          />
        </svg>
      </Draggable>,
      this.el
    )
  }
}

const throttle = f => {
  let token = null,
    lastArgs = null
  const invoke = () => {
    f(...lastArgs)
    token = null
  }
  const result = (...args) => {
    lastArgs = args
    if (!token) {
      token = requestAnimationFrame(invoke)
    }
  }
  result.cancel = () => token && cancelAnimationFrame(token)
  return result
}

class Draggable extends React.PureComponent {
  _relX = 0
  _relY = 0
  _ref = React.createRef()

  _onMouseMove = event => {
    this.props.onMove(event.pageX - this._relX, event.pageY - this._relY)
    event.preventDefault()
  }

  _update = throttle(() => {
    const { x, y } = this.props
    this._ref.current.style.top = `${y}px`
    this._ref.current.style.left = `${x}px`
    this._ref.current.style.position = 'absolute'
  })

  componentDidMount() {
    const { scrollLeft, scrollTop, clientLeft, clientTop } = document.body
    // Try to avoid calling `getBoundingClientRect` if you know the size
    // of the moving element from the beginning. It forces reflow and is
    // the laggiest part of the code right now. Luckily it's called only
    // once per click.
    document.addEventListener('mousemove', this._onMouseMove)
    this._update()
  }

  componentDidUpdate() {
    this._update()
  }

  componentWillUnmount() {
    this._update.cancel()
  }

  render() {
    return (
      <div className={cx('draggable')} ref={this._ref}>
        {this.props.children}
      </div>
    )
  }
}

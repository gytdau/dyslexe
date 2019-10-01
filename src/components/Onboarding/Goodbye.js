import React from 'react'
import ReaderView from '../Tools/ReaderView'
import { Bottom, Container, Top } from '../DyslexiBalance'
import cx from '../styles'

export default class Goodbye extends React.Component {
  render() {
    return (
      <Container>
        <Top>
          <h1>All done</h1>
        </Top>
        <Bottom>
          <p>To finish, press Done.</p>
          <p>
            We've made a reading view specifically for you. To try it out, try
            going to an article and pressing on the Dyslex.ie icon on your
            browser.
          </p>
          <p>
            You can click the <i className="mdi mdi-settings" /> Settings button
            to change your viewing options, and{' '}
            <i className="mdi mdi-fullscreen" /> Fullscreen to enable fullscreen
            mode.
          </p>
          <div
            className={`btn btn-primary ${cx('btn')} ${cx('btn-primary')}`}
            onClick={this.done.bind(this)}
          >
            <i className="mdi mdi-check" /> Done
          </div>
        </Bottom>
      </Container>
    )
  }
  done() {
    this.props.setAppState({
      step: 'article'
    })
  }
  processResults(responses) {
    return {
      fontChangeFont: responses.font_prefer,
      fontChange: true,
      lineHeight: responses.lines_skip ? 4 : 2,
      fontSize: responses.text_small ? 3 : 1,
      textEnhancements: true,
      colorTintBase: responses.color_prefer,
      backgroundTintBase: responses.color_prefer,
      backgroundTint: false,
      colorTint: true,
      lineFocus: false,
      lineFocusHeight: 1,
      changeLineLengthWidth: 1,
      changeLineLength: false,
      paragraphBorder: false
    }
  }
  componentDidMount() {
    let {
      upsidedown_letters_characters,
      mix_up_letters_combinations
    } = this.props.responses
    let letters = []
    if (upsidedown_letters_characters) {
      letters = letters.concat(upsidedown_letters_characters)
    }
    if (mix_up_letters_combinations) {
      mix_up_letters_combinations.map(a => {
        letters = letters.concat(a)
      })
    }
    letters = letters.filter(a => a.length == 1)
    let highlights = { letters, words: [] }
    let settings = this.processResults(this.props.responses)
    this.props.setAppState({
      responses: this.props.responses,
      highlights,
      ...settings
    })
  }
}

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
            going to an article and pressing on the Dyslex E icon on your
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
    let settings = {}
    settings.fontChangeFont = responses.font_prefer
    settings.fontChange = true

    settings.lineHeight = responses.lines_skip ? 4 : 2
    settings.fontSize = responses.text_small ? 3 : 1
    settings.textEnhancements = true
    return settings
  }
  componentDidMount() {
    let {
      upsidedown_letters_characters,
      mix_up_letters_combinations
    } = this.props.responses
    console.log(upsidedown_letters_characters, mix_up_letters_combinations)
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

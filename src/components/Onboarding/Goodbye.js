import React from 'react'
import ReaderView from '../ReaderView'
import { Bottom, Container, Top } from '../DyslexiBalance'

export default class Goodbye extends React.Component {
  render() {
    return (
      <Container>
        <Top>
          <h1>All done</h1>
        </Top>
        <Bottom>
          <p>You're done the testing process.</p>
          <p>
            We've made a reading view specifically for you. To try it out, try
            going to an article and pressing on the Dyslexi icon on your
            browser.
          </p>
        </Bottom>
      </Container>
    )
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

    this.props.setAppState({
      responses: this.props.responses,
      highlights,
      step: 'article'
    })
  }
}

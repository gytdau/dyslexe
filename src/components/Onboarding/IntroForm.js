import React from 'react'
import ReaderView from '../Tools/ReaderView'
import { Bottom, Container, Top } from '../DyslexiBalance'
import cx from '../styles'

export default class IntroForm extends React.Component {
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
          <p>BEEP BOOP FORM GOES HERE</p>
          <img src="https://media3.giphy.com/media/4NrIV7ECIl6IG0OukS/giphy.gif" />
          <div
            className={`btn btn-primary ${cx('btn')} ${cx('btn-primary')}`}
            onClick={this.props.respond}
          >
            <i className="mdi mdi-check" /> Done
          </div>
        </Bottom>
      </Container>
    )
  }
}

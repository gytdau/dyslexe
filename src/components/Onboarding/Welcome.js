import React from 'react'
import ReaderView from '../Tools/ReaderView'
import { Bottom, Container, Top } from '../DyslexiBalance'
import styles from '../../styles/app.module.scss'

export default class Welcome extends React.Component {
  render() {
    return (
      <Container>
        <Top>
          <h1>Welcome to Dyslex E</h1>
        </Top>
        <Bottom>
          <p>
            Dyslex E can help you read articles faster and more comfortably.
          </p>
          <p>
            To get started, let's go through a short questionnaire so that we
            can help you the best.
          </p>
          <div
            className={`btn btn-primary ${styles['btn']} ${
              styles['btn-primary']
            }`}
            onClick={this.props.respond}
          >
            Start
          </div>
        </Bottom>
      </Container>
    )
  }
}

import React from 'react';
import ReaderView from '../ReaderView';
import { Bottom, Container, Top } from '../DyslexiBalance'


export default class Welcome extends React.Component {
  render() {
    return (
      <Container>
        <Top>
          <h1>Welcome to Dyslexi</h1>
        </Top>
        <Bottom>
          <p>Dyslexi can help you read articles faster and more comfortably.</p>
          <p>To get started, let's go through a short questionnaire so that we can help you the best.</p>
          <div className="btn btn-primary" onClick={this.props.respond}>Start</div>
        </Bottom>
      </Container>
    )
  }
}

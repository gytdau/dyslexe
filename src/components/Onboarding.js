import React from 'react';
import ReaderView from './ReaderView';
import { Bottom, Container, Top } from './DyslexiBalance'

export default class Onboarding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responses: []
    }
  }
  render() {
    return (
      <Container>
        <Top>
          <h1>Welcome to Dyslexi</h1>
        </Top>
        <Bottom>
          <p>It's time for a daily checkup.</p>
          <p>Let's make sure it all goes well!</p>
        </Bottom>
      </Container>
    )
  }
}

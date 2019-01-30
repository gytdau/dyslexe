import React from 'react';
import ReaderView from '../ReaderView';
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
          <p>We've made a reading view specifically for you. To try it out, try going to an article and pressing on the Dyslexi icon on your browser.</p>
        </Bottom>
      </Container>
    )
  }
}

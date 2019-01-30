import React from 'react';
import ReaderView from '../ReaderView';
import { Bottom, Container, Top } from '../DyslexiBalance'
import LetterInput from './LetterInput';
import LetterCombinationsInput from './LetterCombinationsInput';


export default class Question extends React.Component {
  render() {
    let buttons = null
    switch (this.props.question.type) {
      case "YesNo":
        buttons = <div>
          <div className="btn btn-primary" onClick={() => { this.props.respond(true) }}>Yes <i className="mdi mdi-arrow-right" /></div>
          <div className="btn btn-primary" onClick={() => { this.props.respond(false) }}>No <i className="mdi mdi-arrow-right" /></div>
        </div>
        break;
      case "Letters":
        buttons = <LetterInput {...this.props} />
        break;
      case "LettersCombinations":
        buttons = <LetterCombinationsInput {...this.props} />
        break;
    }

    return (
      <Container>
        <Top>
          <h1>{this.props.question.text}</h1>
        </Top>
        <Bottom>
          {buttons}
        </Bottom>
      </Container>
    )
  }
}

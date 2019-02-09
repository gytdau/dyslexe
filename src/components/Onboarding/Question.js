import React from 'react';
import ReaderView from '../ReaderView';
import { Bottom, Container, Top } from '../DyslexiBalance'
import LetterInput from './LetterInput';
import LetterCombinationsInput from './LetterCombinationsInput';
import FontTest from './FontTest';

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
      case "FontTest":
        buttons = <FontTest {...this.props} />
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
          <p>Question {this.props.questionCount}.</p>
          <h1>{this.props.question.text}</h1>
        </Top>
        <Bottom className="fade-in">
          {buttons}
        </Bottom>
      </Container>
    )
  }
}

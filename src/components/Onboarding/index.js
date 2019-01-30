import React from 'react';
import ReaderView from '../ReaderView';
import { Bottom, Container, Top } from '../DyslexiBalance'
import questionData from './questionData'
import Welcome from './Welcome';
import Goodbye from './Goodbye';
import Question from './Question';

export default class Onboarding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responses: {},
      question: 0,
      page: 0, // 0 = Welcome, 1 = Questions, 2 = Goodbye
    }

    this.respond = this.respond.bind(this)
    this.next = this.next.bind(this)
  }
  respond(answer) {
    let { question, page, responses } = this.state
    responses[questionData[this.state.question].id] = answer
    question += 1
    if (question >= questionData.length) {
      page += 1
      this.setState({ question, page, responses })
      return
    }
    while (!(questionData[question].if == undefined || responses[questionData[question].if])) {
      question += 1
      if (question >= questionData.length) {
        page += 1
        break
      }
    }
    console.log({ question, page, responses })
    this.setState({ question, page, responses })
  }
  next() {
    if (this.state.page == 2) {
      alert("Goodbye.")
      return
    }
    this.setState({
      page: this.state.page + 1
    })
  }
  render() {
    if (this.state.page == 0) {
      return <Welcome respond={this.next} ready={true} />
    }
    if (this.state.page == 2) {
      return <Goodbye />
    }
    return <Question respond={this.respond} question={questionData[this.state.question]} />
  }
}

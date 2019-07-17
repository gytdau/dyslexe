import React from 'react'
import ReaderView from '../ReaderView'
import { Bottom, Container, Top } from '../DyslexiBalance'
import questionData from './questionData'
import Welcome from './Welcome'
import Goodbye from './Goodbye'
import Question from './Question'

export default class Onboarding extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      responses: {},
      question: 0,
      questionCount: 1,
      page: 0 // 0 = Welcome, 1 = Questions, 2 = Goodbye
    }

    this.respond = this.respond.bind(this)
    this.next = this.next.bind(this)
  }
  respond(answer) {
    let { question, page, responses, questionCount } = this.state
    questionCount += 1
    responses[questionData[this.state.question].id] = answer
    question += 1
    if (question >= questionData.length) {
      page += 1
      this.setState({ question, page, responses, questionCount })
      return
    }
    while (
      !(
        questionData[question].if == undefined ||
        responses[questionData[question].if]
      )
    ) {
      question += 1
      if (question >= questionData.length) {
        page += 1
        break
      }
    }
    console.log({ question, page, responses })
    this.setState({ question, page, responses, questionCount })
  }
  next() {
    if (this.state.page == 2) {
      alert('Goodbye.')
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
      return (
        <Goodbye
          setAppState={this.props.setAppState}
          responses={this.state.responses}
        />
      )
    }
    return (
      <Question
        key={this.state.questionCount}
        respond={this.respond}
        question={questionData[this.state.question]}
        questionCount={this.state.questionCount}
      />
    )
  }
}

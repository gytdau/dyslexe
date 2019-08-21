import { Bottom, Container, Top } from '../DyslexiBalance'
import React from 'react'
import ReactDOM from 'react-dom'
import Readability from '../../readability'
import { isProbablyReaderable } from '../../readable'
import htmlVoidElements from 'html-void-elements'
import '../../styles/readerview.scss'
import cx from '../styles'

export default class Article extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      available: true,
      content: '',
      title: '',
      highlights: {
        letters: [],
        words: []
      },
      responses: []
    }
    this.recursiveBuild = this.recursiveBuild.bind(this)
    this.tokenify = this.tokenify.bind(this)
    this.wordHighlighted = this.wordHighlighted.bind(this)
  }
  render() {
    let content = null
    if (this.state.loading) {
      content = <p>One second...</p>
      return (
        <div className={'dyslexi-page'}>
          <div className={'container'}>{content}</div>
        </div>
      )
    }
    if (!this.state.available) {
      return (
        <Container>
          <Top>
            <h1>This isn't an article.</h1>
          </Top>
          <Bottom>
            <p>
              Dyslexi can only help you read articles. We might have not
              detected the article correctly, or this page is not an article.
              Refresh this page to go back to normal.
            </p>
          </Bottom>
        </Container>
      )
    } else {
      return (
        <Container>
          <Top>
            <h1>{this.state.title}</h1>
          </Top>
          <Bottom className={this.getReaderClassNames()}>
            {this.recursiveBuild(this.state.content, 0, true)}
          </Bottom>
        </Container>
      )
    }
    return (
      <div className={'dyslexi-page'}>
        <div className={'container'}>{content}</div>
      </div>
    )
  }
  componentDidMount() {
    console.log('COMPONENT MOUNT')
    console.log(this.props.article_document)
    if (!isProbablyReaderable(this.props.article_document)) {
      this.setState({
        loading: false,
        available: false
      })
      return
    }
    console.log('COMPONENT PASS')
    let article = new Readability(this.props.article_document).parse()

    var wrapper = document.createElement('div')
    wrapper.innerHTML = article.content
    var div = wrapper.firstChild

    this.setState({
      loading: false,
      title: article.title,
      content: div
    })
    chrome.storage.sync.get(['highlights', 'responses'], result => {
      console.log(result)
      this.setState(result)
      console.log(this.state)
    })
  }
  getReaderClassNames() {
    let { responses } = this.state
    if (responses.length === 0) {
      return ''
    }
    console.log(responses)
    return [
      responses.text_bunched && 'text_bunched',
      responses.text_small && 'text_small',
      responses.lines_skip && 'lines_skip',
      responses.font_prefer
    ]
      .filter(Boolean)
      .join(' ')
  }
  recursiveBuild(element, key, shouldTokenify) {
    if (element.nodeType == 3) {
      if (shouldTokenify) {
        return this.tokenify(element.nodeValue)
      }
      return element.nodeValue + ' '
    }
    if (shouldTokenify) {
      shouldTokenify = !(element.tagName == 'A')
    }
    let children = Array.from(element.childNodes).map(el => {
      key += 1
      return this.recursiveBuild(el, key, shouldTokenify)
    })

    let convertedAttributes = {}
    let attributes = element.attributes
    for (var i = 0; i < attributes.length; i++) {
      convertedAttributes[attributes[i].nodeName] = attributes[i].nodeValue
    }

    if (htmlVoidElements.includes(element.tagName.toLowerCase())) {
      return null
    }

    return React.createElement(
      element.tagName.toLowerCase(),
      convertedAttributes,
      children
    )
  }
  wordHighlighted(word) {
    word = word.toLowerCase().replace(/[^a-z]/gi, '')
    chrome.storage.sync.get('highlights', result => {
      let updated = {}
      if (result.highlights == undefined) {
        updated = {
          highlights: {
            letters: [],
            words: []
          }
        }
      } else {
        updated = result
      }
      if (updated.highlights.words.includes(word)) {
        updated.highlights.words = updated.highlights.words.filter(
          item => item != word
        )
      } else {
        updated.highlights.words.push(word)
      }
      console.log(updated)
      chrome.storage.sync.set(updated)
      this.setState({
        ...updated
      })
    })
  }
  tokenify(text) {
    text = text.trim().split(/\s+/)
    return text.map(token => {
      return React.createElement(
        'span',
        {
          className:
            'word' + (this.isWordHighlighted(token) ? ' highlighted' : ''),
          onClick: () => {
            this.wordHighlighted(token)
          }
        },
        token + ' '
      )
    })
  }
  isWordHighlighted(word) {
    word = word.toLowerCase().replace(/[^a-z]/gi, '')
    let found = this.state.highlights.letters
      .map(letter => word.includes(letter))
      .some(Boolean)
    return this.state.highlights.words.includes(word) || found
  }
}

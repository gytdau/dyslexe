import React from 'react'
import ReactDOM from 'react-dom'
import Readability from '../../readability'
import '../../styles/readerview.scss'
import cx from '../styles'
import ReaderViewUnloadable from './ReaderViewUnloadable'
import recursivelyBuildArticleText from './Syllables'
import Tool from './Tool'

export default class ReaderView extends Tool {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      content: '',
      title: '',
      highlighted: null
    }
    this.highlightCallback = this.highlightCallback.bind(this)
  }
  highlightCallback(word) {
    let next = () => {
      let newContent = recursivelyBuildArticleText(
        this.state.content,
        0,
        true,
        this.highlightCallback,
        x => x == this.state.highlighted
      )
      this.setState({ newContent })
    }
    if (this.state.highlighted == word) {
      this.setState({ highlighted: null }, next)
    } else {
      this.setState({ highlighted: word }, next)
    }
  }
  render() {
    let content = null
    if (this.state.loading) {
      content = <p>One second...</p>
      return (
        <div className={cx('dyslexi-page')}>
          <div className={cx('dyslexi-page-inner')}>{content}</div>
        </div>
      )
    }
    if (this.state.content == '') {
      content = <ReaderViewUnloadable />
    } else {
      content = (
        <div>
          <h1>{this.state.title}</h1>
          {this.state.newContent}
        </div>
      )
    }
    return ReactDOM.createPortal(
      <div className={cx('dyslexi-page')}>
        <div className={cx('dyslexi-page-inner', 'text-token')}>{content}</div>
      </div>,
      this.el
    )
  }
  componentDidMount() {
    this.body.appendChild(this.el)
    if (!this.props.article_document) {
      alert("Uh oh! It looks like we can't see this article in fullscreen.")
      return
    }
    let article = new Readability(this.props.article_document).parse()

    var wrapper = document.createElement('div')
    wrapper.innerHTML = article.content
    var div = wrapper.firstChild

    let newContent = recursivelyBuildArticleText(
      div,
      0,
      true,
      this.highlightCallback,
      x => x == this.state.highlighted
    )
    this.setState({
      loading: false,
      title: article.title,
      content: div,
      newContent
    })
  }
}

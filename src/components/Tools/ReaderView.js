import React from 'react'
import ReactDOM from 'react-dom'
import Readability from '../../readability'
import cx from '../styles'
import '../../styles/readerview.scss'
import ReaderViewUnloadable from './ReaderViewUnloadable'
import Tool from './Tool'

const body = document.getElementsByTagName('body')[0]

export default class ReaderView extends Tool {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      content: '',
      title: ''
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
          <div dangerouslySetInnerHTML={{ __html: this.state.content }}></div>
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
    body.appendChild(this.el)
    console.log('Readability has received this:')
    console.log(this.props)
    if (!this.props.article_document) {
      alert("Uh oh! It looks like we can't see this article in fullscreen.")
      return
    }
    let article = new Readability(this.props.article_document).parse()

    this.setState({
      loading: false,
      title: article.title,
      content: article.content
    })
  }
}

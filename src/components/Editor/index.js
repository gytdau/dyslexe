import React from 'react'
import ReactDOM from 'react-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import * as ManipulationTools from '../../scripts/ManipulationTools'
import '../../styles/readerview.scss'
import cx from '../styles'
import Tool from '../Tools/Tool'
export default class Editor extends Tool {
  constructor(props) {
    super(props)
    this.state = {
      text: this.props.appState.editorContent
    }
    this.handleChange = this.handleChange.bind(this)
    this.exit = this.exit.bind(this)
  }
  render() {
    return ReactDOM.createPortal(
      <div className={cx('dyslexi-page')}>
        <div className={cx('dyslexi-page-inner', 'text-token')}>
          <div className={cx('container')}>
            <div className={cx('row')}>
              <div className={cx('col-md-8', 'offset-md-2')}>
                <div className={cx('text-center')}>
                  <div
                    className={cx('btn', 'btn-link', 'd-inline-block')}
                    onClick={this.exit}
                  >
                    <i className="mdi mdi-exit-to-app" /> Exit Dyslex.ie Writer
                  </div>
                </div>
                <ReactQuill
                  value={this.state.text || ''}
                  onChange={this.handleChange}
                  modules={{
                    toolbar: [
                      ['bold', 'italic', 'underline', 'strike'],
                      [{ list: 'ordered' }, { list: 'bullet' }],
                      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
                      [{ indent: '-1' }, { indent: '+1' }]
                    ]
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>,
      this.el
    )
  }
  handleChange(text) {
    this.setState({ text })
  }
  componentDidMount() {
    this.body.appendChild(this.el)
    ManipulationTools.updateReadingTheme(this.props.appState)
    this.timer = setInterval(() => {
      this.props.setAppState({ editorContent: this.state.text })
    }, 2000)
  }
  exit() {
    this.props.setAppState({ step: 'article', editorContent: this.state.text })
  }
}

import React from 'react';
import ReactDOM from 'react-dom';
import Readability from '../readability';
import "../styles/readerview.scss";
import ReaderViewUnloadable from './ReaderViewUnloadable';

export default class ReaderView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      content: "",
      title: ""
    }
  }
  render() {
    let content = null
    if (this.state.loading) {
      content = <p>One second...</p>
    }
    if (this.state.content == "") {
      content = <ReaderViewUnloadable />
    } else {
      content = <div>
        <h1>{this.state.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: this.state.content }}></div>
      </div>
    }
    return (
      <div className={'dyslexi-page'}>
        <div className={'container'}>
          {content}
        </div>
      </div >
    )
  }
}

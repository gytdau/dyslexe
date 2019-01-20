import React from 'react';
import ReaderView from './ReaderView';

export default class Onboarding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responses: []
    }
  }
  render() {
    return (
      <div className={'container'}>
        <h1>Let's get started.</h1>
        <p>To set up Dyslexi to best meet your needs, we'll go through a short testing process.</p>
        <div className="btn btn-primary">Start</div>
      </div >
    )
  }
}

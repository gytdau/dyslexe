import React from 'react';

export default class ReaderViewUnloadable extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={'dyslexi-page'}>
        <div className={'container'}>
          <h1>We can't show this page.</h1>
          <h2>Try another page or make sure this is the page you wanted to read.</h2>
          <h2>Reload this page to exit.</h2>
        </div>
      </div >
    )
  }
}
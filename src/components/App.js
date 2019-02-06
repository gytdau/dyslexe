import React from 'react';
import ReaderView from './ReaderView';
import Onboarding from './Onboarding';
import Readability from '../readability';
import Article from './Article';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/app.scss';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      app_state: null,
      article_data: {
        loading: true
      }
    }
  }
  render() {
    if (this.state.app_state == null) {
      return (
        <div>
          <i className="mdi mdi-loading" />
        </div>
      )
    }
    switch (this.state.app_state) {
      case null:
        return (
          <div>
            <i className="mdi mdi-loading" />
          </div>
        )
        break;
      case "onboarding":
        return (
          <Onboarding />
        )
        break;
      case "article":
        return (
          <Article article_document={this.state.article_document} />
        )
        break;
    }
    return (
      <div>
        <h1>Try refreshing Dyslexi.</h1>
      </div>
    )
  }

  componentDidMount() {
    this.setState({
      article_document: document.cloneNode(true)
    });

    var elements = document.querySelectorAll('link[rel=stylesheet]');
    for (var i = 0; i < elements.length; i++) {
      elements[i].parentNode.removeChild(elements[i]);
    }

    /* global chrome */
    watchUndesiredContent();
    pruneUndesiredContent();
    chrome.storage.sync.get('app_state', (result) => {
      if (result.app_state == undefined) {
        chrome.storage.sync.set({ 'app_state': 'onboarding' })
        result = {
          app_state: 'onboarding'
        }
      }
      this.setState({
        app_state: result.app_state
      })
    });
  }
}
function pruneUndesiredContent() {
  let body = document.getElementsByTagName('body')[0];
  body.className = "dyslexi-body-loaded"
  var elements = document.querySelectorAll('body > *:not(.dyslexi-viewer)');
  for (var i = 0; i < elements.length; i++) {
    elements[i].parentNode.removeChild(elements[i]);
  }
  var elements = document.querySelectorAll('link, style, script');
  for (var i = 0; i < elements.length; i++) {
    elements[i].parentNode.removeChild(elements[i]);
  }
}
function watchUndesiredContent() {
  /*var mut = new MutationObserver(function (mutations, mut) {
      let body = document.getElementsByTagName('body')[0];
      let body = document.getElementsByTagName('head')[0];
      console.log("MUTATE!")

      for (var mutation of mutations) {
          if (mutation.type == 'attributes' && mutation.attributeName == 'class' && body.className != "dyslexi-body-loaded") {
              console.log("Something changed the body's class, aggresively changing it back")
              pruneUndesiredContent();
          }
          if (mutation.type == 'childList' && body.childElementCount > 1) {
              console.log("Something added children, aggresively deleting it")
              pruneUndesiredContent();
          }
      }
  });
  mut.observe(document.getElementsByTagName('body')[0], {
      'attributes': true
  });
  mut.observe(document.getElementsByTagName('head')[0], {
      'attributes': true
  });*/
  let i = 0
  for (i = 0; i < 10; i++) {
    setTimeout(function () {
      pruneUndesiredContent();
    }, 200 * i);
  }
}
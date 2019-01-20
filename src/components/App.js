import React from 'react';
import ReaderView from './ReaderView';
import Onboarding from './Onboarding';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/app.scss';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Onboarding />
    )
  }

  componentDidMount() {
    var documentClone = document.cloneNode(true);
    /*let article = new Readability(documentClone).parse();
    this.setState({
      loading: false,
      title: article.title,
      content: article.content,
    });
    var elements = document.querySelectorAll('link[rel=stylesheet]');
    for (var i = 0; i < elements.length; i++) {
      elements[i].parentNode.removeChild(elements[i]);
    }*/

    watchUndesiredContent();
    pruneUndesiredContent();

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
/* src/content.js */
import React from 'react';
import ReactDOM from 'react-dom';
//import Readability from './readable.js';
import Readability from './readability';
import "./content.css";

class ContentReact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            content: ""
        }
    }
    render() {
        return (
            <div className={'dyslexi-page'}>
                <div className={'container'}>
                    {this.state.loading ? <p>Hello From React Extension!</p> : <div dangerouslySetInnerHTML={{ __html: this.state.content }}></div>}
                </div>
            </div >
        )
    }
    componentDidMount() {
        var documentClone = document.cloneNode(true);
        let article = new Readability(documentClone).parse();
        this.setState({
            loading: false,
            content: article.content,
        });
        var elements = document.querySelectorAll('link[rel=stylesheet]');
        for (var i = 0; i < elements.length; i++) {
            elements[i].parentNode.removeChild(elements[i]);
        }

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
console.log("Dyslexi rendered");
// Render the view
const app = document.createElement('div');
app.className = "dyslexi-viewer";
document.getElementsByTagName('body')[0].appendChild(app);
ReactDOM.render(<ContentReact />, app);
/* Hide all body elements
const rest = document.querySelectorAll("body > div:not(.dyslexi-viewer)");
let i = 0;
let l = rest.length;
for (i; i < l; i++) {
    rest[i].parentNode.removeChild(rest[i]);
}*/
var elements = document.querySelectorAll('link[rel=stylesheet]');
for (var i = 0; i < elements.length; i++) {
    elements[i].parentNode.removeChild(elements[i]);
}
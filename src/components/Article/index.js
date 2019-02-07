import { Bottom, Container, Top } from '../DyslexiBalance'
import React from 'react';
import ReactDOM from 'react-dom';
import Readability from '../../readability';
import "../../styles/readerview.scss";

export default class ReaderView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            content: "",
            title: ""
        }
        this.recursiveBuild = this.recursiveBuild.bind(this)
    }
    render() {
        let content = null
        if (this.state.loading) {
            content = <p>One second...</p>
            return (
                <div className={'dyslexi-page'}>
                    <div className={'container'}>
                        {content}
                    </div>
                </div >
            )
        }
        if (this.state.content == "") {
            return (
                <Container>
                    <Top>
                        <h1>This isn't an article</h1>
                    </Top>
                    <Bottom>
                        <p>
                            Dyslexi can only help you read articles. We might have not detected the article correctly, or this page is not an article. Refresh this page to go back to normal.
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
                    <Bottom>
                        {this.recursiveBuild(this.state.content)}
                    </Bottom>
                </Container>)
        }
        return (
            <div className={'dyslexi-page'}>
                <div className={'container'}>
                    {content}
                </div>
            </div >
        )
    }
    componentDidMount() {
        let article = new Readability(this.props.article_document).parse();

        var wrapper = document.createElement('div');
        wrapper.innerHTML = article.content;
        var div = wrapper.firstChild;

        console.log({
            loading: false,
            title: article.title,
            content: div,
        })
        this.setState({
            loading: false,
            title: article.title,
            content: div,
        });
    }
    recursiveBuild(element) {
        if (element.nodeType == 3) {
            return element.nodeValue
        }
        let children = Array.from(element.childNodes).map((el) => { return this.recursiveBuild(el) });

        let convertedAttributes = {}

        let attributes = element.attributes;
        for (var i = 0; i < attributes.length; i++) {
            convertedAttributes[attributes[i].nodeName] = attributes[i].nodeValue;
        }

        return React.createElement(element.tagName, convertedAttributes,
            children
        );
    }
}

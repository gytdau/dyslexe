/* src/content.js */
import React from 'react';
import ReactDOM from 'react-dom';
import "./content.css";

class ContentReact extends React.Component {
    render() {
        return (
            <div className={'react-extension'}>
                <p>Hello From React Extension!</p>
            </div>
        )
    }
}

console.log("Give me a sign, God!");
const app = document.createElement('div');
document.getElementsByTagName('body')[0].appendChild(app);
ReactDOM.render(<ContentReact />, app);
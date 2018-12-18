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

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<ContentReact />, app);
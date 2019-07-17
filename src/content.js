import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

class Content extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <App />
  }
}

// Render the app
const app = document.createElement('div')
app.className = 'dyslexi-inserted-content'
document.getElementsByTagName('body')[0].appendChild(app)
ReactDOM.render(<Content />, app)
var elements = document.querySelectorAll('link[rel=stylesheet]')
for (var i = 0; i < elements.length; i++) {
  //elements[i].parentNode.removeChild(elements[i])
}

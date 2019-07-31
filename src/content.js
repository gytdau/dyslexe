import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import cx from './components/styles'

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
app.className = cx('inserted-content', 'dyslexi-render')
document.getElementsByTagName('body')[0].appendChild(app)
ReactDOM.render(<Content />, app)

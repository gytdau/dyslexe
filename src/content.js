import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import styles from './styles/app.module.scss'

class Content extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <App />
  }
}

console.log(styles)

// Render the app
const app = document.createElement('div')
app.className = styles['inserted-content'] + ' ' + styles['dyslexi-render']
document.getElementsByTagName('body')[0].appendChild(app)
ReactDOM.render(<Content />, app)

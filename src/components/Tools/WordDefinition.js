import htmlVoidElements from 'html-void-elements'
import React from 'react'
import cx from '../styles'
import ReactTooltip from 'react-tooltip'
import Axios from 'axios'
export default class WordDefinition extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      definition: null
    }
  }
  render() {
    return (
      <>
        <ReactTooltip
          place="bottom"
          type="dark"
          effect="float"
          id="wordDefinition"
        />
        <span
          className={cx('highlighted')}
          {...this.props}
          data-tip="Material is..."
          data-for="wordDefinition"
        >
          {this.props.children}
        </span>
      </>
    )
  }
  componentDidMount() {
    let text = this.props.text.toLowerCase().replace(/[^a-z]/gi, '')
    Axios.get('https://simple.wikipedia.org/w/api.php', {
      params: {
        format: 'json',
        action: 'query',
        prop: 'extracts',
        exintro: 'true',
        explaintext: 'true',
        redirects: '1',
        titles: text
      }
    }).then(result => {
      console.log(result)
    })
  }
}

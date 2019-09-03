import htmlVoidElements from 'html-void-elements'
import React from 'react'
import cx from '../styles'
import Popover, { ArrowContainer } from 'react-tiny-popover'

import Axios from 'axios'
import BeatLoader from 'react-spinners/BeatLoader'

export default class WordDefinition extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      definition: null
    }
  }
  render() {
    let onMouseOut = this.props.onMouseOut
    return (
      <>
        <Popover
          isOpen={true}
          position={'bottom'}
          disableReposition={true}
          padding={0}
          {...this.props}
          content={({ position, targetRect, popoverRect }) => (
            <ArrowContainer
              position={position}
              targetRect={targetRect}
              popoverRect={popoverRect}
              arrowSize={10}
              arrowColor={'#e4e4e4'}
            >
              <div className={cx('definition-inner')}>
                {this.state.definition ? (
                  <div className={cx('definition-iframe-container')}>
                    <iframe
                      src={
                        'https://www.google.com/search?q=' +
                        this.props.text +
                        '&igu=1&prmd=inmv&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjn7L34tLLkAhVkSxUIHcxJAAAQ_AUoAXoECBAQAQ&biw=411&bih=731&dpr=2.63&tbs=isz%3Am%2Citp%3Aclipart'
                      }
                      className={cx('definition-iframe')}
                    ></iframe>
                  </div>
                ) : (
                  <BeatLoader />
                )}
              </div>
            </ArrowContainer>
          )}
        >
          <span className={cx('highlighted')}>{this.props.children}</span>
        </Popover>
      </>
    )
  }
  componentDidMount() {
    let text = this.props.text.toLowerCase().replace(/[^a-z]/gi, '')
    chrome.runtime.sendMessage({ text }, response => {
      this.setState({ definition: response })
    })
  }
}

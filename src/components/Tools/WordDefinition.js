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
          padding={0}
          {...this.props}
          content={({ position, targetRect, popoverRect }) => (
            <ArrowContainer
              position={position}
              targetRect={targetRect}
              popoverRect={popoverRect}
              arrowSize={10}
              arrowStyle={{ margin: '1em' }}
              arrowColor={'#e4e4e4'}
            >
              <div className={cx('definition-inner')}>
                {this.state.definition ? (
                  <div>
                    {this.state.definition.missing == '' ? (
                      <h3 className={cx('text-center')}>No definition found</h3>
                    ) : (
                      <p>{this.state.definition.extract}</p>
                    )}
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

import htmlVoidElements from 'html-void-elements'
import React from 'react'
import cx from '../styles'
import Popover, { ArrowContainer } from 'react-tiny-popover'
import BeatLoader from 'react-spinners/BeatLoader'

export default class WordDefinition extends React.Component {
  render() {
    return (
      <>
        <Popover
          isOpen={true}
          position={'bottom'}
          padding={0}
          containerStyle={{ overflow: 'visible' }}
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
              </div>
            </ArrowContainer>
          )}
        >
          <span className={cx('word')} onMouseOut={this.props.onClickOutside}>
            {this.props.children}
          </span>
        </Popover>
      </>
    )
  }
}

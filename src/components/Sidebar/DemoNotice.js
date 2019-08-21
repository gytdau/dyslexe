import React from 'react'
import cx from '../styles'

export default props => (
  <div className={cx('card', 'mt-4', 'mb-4', 'text-white', 'bg-dark')}>
    <div className={cx('card-body')}>
      <h5 className={cx('card-title')}>Ask the outro questions</h5>
      <p className={cx('card-text')}>Click to ask the outro questions.</p>
      <div
        className={cx('btn', 'btn-light')}
        onClick={() => {
          props.setAppState({ step: 'outroForm' })
        }}
      >
        Ask
      </div>
    </div>
  </div>
)

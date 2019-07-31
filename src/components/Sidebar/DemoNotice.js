import React from 'react'
import cx from '../styles'

export default () => (
  <div className={cx('card', 'mt-4', 'mb-4', 'text-white', 'bg-dark')}>
    <div className={cx('card-body')}>
      <h5 className={cx('card-title')}>Heuston, we have lift off</h5>
      <p className={cx('card-text')}>
        This is a prototype version (0.1) of Dyslexi and might set your computer
        on fire and kill your cat. You can never really tell for sure.
      </p>
    </div>
  </div>
)

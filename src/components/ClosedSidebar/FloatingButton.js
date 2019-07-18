import React from 'react'
import styles from '../../styles/app.module.scss'

export default props => (
  <div className={styles['btn-float']} onClick={props.onClick}>
    <i className={'mdi mdi-' + props.icon} />
  </div>
)

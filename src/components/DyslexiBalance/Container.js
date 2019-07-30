import React from 'react'
import styles from '../../styles/app.module.scss'

export default class Container extends React.Component {
  render() {
    return (
      <div className={styles['dyslexi-balance']}>{this.props.children}</div>
    )
  }
}

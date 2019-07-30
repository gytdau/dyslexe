import React from 'react'
import styles from '../../styles/app.module.scss'

export default class Bottom extends React.Component {
  render() {
    return (
      <div className={styles['balance-bottom'] + ' ' + this.props.className}>
        <div className="container">{this.props.children}</div>
      </div>
    )
  }
}

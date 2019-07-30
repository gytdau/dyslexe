import React from 'react'
import styles from '../../styles/app.module.scss'

export default class Top extends React.Component {
  render() {
    return (
      <div className={`${styles['balance-top']} ${styles['bg-teal-gradient']}`}>
        <div className="container">{this.props.children}</div>
      </div>
    )
  }
}

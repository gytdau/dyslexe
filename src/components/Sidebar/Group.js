import React from 'react'
import Slider, { Range } from 'rc-slider'
import 'rc-slider/assets/index.css'
import styles from '../../styles/app.module.scss'
import Switch from 'react-switch'
export default class Group extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="list-group-item">
        <div className={styles['input-component']}>
          <div className="d-flex justify-content-between">
            <h5>{this.props.label}</h5>
            <Switch
              checked={this.props.appState[this.props.switch]}
              onChange={() =>
                this.props.setAppState({
                  [this.props.switch]: !this.props.appState[this.props.switch]
                })
              }
              onColor="#86d3ff"
              onHandleColor="#2693e6"
              handleDiameter={30}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={48}
              className="react-switch"
              id="material-switch"
            />
          </div>
          {this.props.appState[this.props.switch] ? this.props.children : null}
        </div>
      </div>
    )
  }
}

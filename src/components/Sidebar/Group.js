import 'rc-slider/assets/index.css'
import React from 'react'
import Switch from 'react-switch'
import cx from '../styles'
export default class Group extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className={cx('list-group-item')}>
        <div className={cx('input-component')}>
          <div className={cx('d-flex', 'justify-content-between')}>
            <h5>
              {this.props.label}{' '}
              <i
                className={'mdi mdi-help-circle-outline ' + cx('help-icon')}
                data-tip={this.props.help}
              />
            </h5>
            <Switch
              checked={this.props.appState[this.props.switch]}
              onChange={() => {
                let extra = this.props.switchOff
                  ? {
                      [this.props.switchOff]: false
                    }
                  : {}
                this.props.setAppState({
                  ...extra,
                  [this.props.switch]: !this.props.appState[this.props.switch]
                })
              }}
              onColor="#86d3ff"
              onHandleColor="#2693e6"
              handleDiameter={30}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={48}
              className={cx('switch')}
            />
          </div>
          {this.props.appState[this.props.switch] ? this.props.children : null}
        </div>
      </div>
    )
  }
}

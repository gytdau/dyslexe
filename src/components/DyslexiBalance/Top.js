import React from 'react';

export default class Top extends React.Component {
    render() {
        return (
            <div className={'dyslexi-balance-top'}>
                {this.props.children}
            </div >
        )
    }
}

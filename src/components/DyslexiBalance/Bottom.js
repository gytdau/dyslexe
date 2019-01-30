import React from 'react';

export default class Bottom extends React.Component {
    render() {
        return (
            <div className={'dyslexi-balance-bottom'}>
                {this.props.children}
            </div >
        )
    }
}

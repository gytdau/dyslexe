import React from 'react';

export default class Container extends React.Component {
    render() {
        return (
            <div className={'dyslexi-balance'}>
                {this.props.children}
            </div >
        )
    }
}

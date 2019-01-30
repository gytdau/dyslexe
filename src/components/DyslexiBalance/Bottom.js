import React from 'react';

export default class Bottom extends React.Component {
    render() {
        return (
            <div className={'dyslexi-balance-bottom'}>
                <div className="container">
                    {this.props.children}
                </div>
            </div >
        )
    }
}

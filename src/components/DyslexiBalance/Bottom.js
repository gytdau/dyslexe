import React from 'react';

export default class Bottom extends React.Component {
    render() {
        return (
            <div className={'dyslexi-balance-bottom ' + this.props.className}>
                <div className="container">
                    {this.props.children}
                </div>
            </div >
        )
    }
}

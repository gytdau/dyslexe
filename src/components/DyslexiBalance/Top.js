import React from 'react';

export default class Top extends React.Component {
    render() {
        return (
            <div className={'dyslexi-balance-top bg-teal-gradient'}>
                <div className="container">
                    {this.props.children}
                </div>
            </div >
        )
    }
}

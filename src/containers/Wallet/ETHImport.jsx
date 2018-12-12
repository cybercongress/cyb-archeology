import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import * as actions from '../../redux/wallet';
import { AddAccount } from '../../components/Wallet/Wallet';

class ETHImport extends Component {
    importAccount = (privatekey) => {
        const { props } = this;

        props.importAccount(privatekey)
            .then(props.importCompleted);
    };


    render() {
        return (
            <div>
                <AddAccount
                  addMethodName='Import'
                  placeholder='private key'
                  addCallback={ this.importAccount }
                />
            </div>
        );
    }
}

export default connect(
    null,
    actions,
)(ETHImport);

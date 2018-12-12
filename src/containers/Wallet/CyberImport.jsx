import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import * as cyberActions from '../../redux/cyber';
import {
    AddAccount,
} from '../../components/Wallet/Wallet';

class CyberImport extends Component {
    restoreAccount = (seedPhrase) => {
        const { props } = this;

        props.restoreAccount(seedPhrase).then(props.importCompleted);
    };


    render() {
        return (
            <div>
                <AddAccount
                  addMethodName='Import'
                  placeholder='seed phrase or private key'
                  addCallback={ this.restoreAccount }
                />
            </div>
        );
    }
}

export default connect(
    ({ cyber }) => ({
        defaultAccount: cyber.defaultAccount,
    }),
    cyberActions,
)(CyberImport);

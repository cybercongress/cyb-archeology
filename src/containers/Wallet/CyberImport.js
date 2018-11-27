import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import * as cyberActions from '../../redux/cyber';
import {
    AddAccount, SendFunds, WalletAccountsList, WalletContainer,
} from '../../components/Wallet/Wallet';
import Container from '../../components/Container/Container';
import Block, { BlockRow } from '../../components/Settings/Block';
import Button from '../../components/Button/Button';

class CyberImport extends Component {
    restoreAccount = (seedPhrase) => {
        this.props.restoreAccount(seedPhrase).then(this.props.importCompleted);
    };


    render() {
        const defaultAccountAddress = this.props.defaultAccount;
        const accounts = this.props.accounts;

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
        accounts: cyber.accounts,
        defaultAccount: cyber.defaultAccount,
    }),
    cyberActions,
)(CyberImport);

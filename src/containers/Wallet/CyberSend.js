import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import * as cyberActions from '../../redux/cyber';
import {
    AddAccount, SendFunds, WalletAccountsList, WalletContainer,
} from '../../components/Wallet/Wallet';
import Container from '../../components/Container/Container';
import Block, { BlockRow } from '../../components/Settings/Block';
import Button from '../../components/Button/Button';

class CyberSend extends Component {
    sendFunds = (defaultAddress, recipientAddress, amount) => {
        this.props.sendFunds(defaultAddress, recipientAddress, amount);
    };

    render() {
        const defaultAccountAddress = this.props.defaultAccount;
        const accounts = this.props.accounts;

        return (
            <WalletContainer>
                {defaultAccountAddress}
                <SendFunds
                    defaultAddress={ defaultAccountAddress }
                    sendCallback={ this.sendFunds }
                />
            </WalletContainer>
        );
    }
}

export default connect(
    ({ cyber }) => ({
        accounts: cyber.accounts,
        defaultAccount: cyber.defaultAccount,
    }),
    cyberActions,
)(CyberSend);

import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import * as actions from '../../redux/wallet';
import Container from '../../components/Container/Container';
import { AddAccount, SendFunds, WalletAccountsList } from '../../components/Wallet/Wallet';

class EthSend extends Component {
    sendFunds = (defaultAddress, recipientAddress, amount) => {
        this.props.sendFunds(defaultAddress, recipientAddress, amount)
            .then(() => {
                this.props.loadAccounts();
            });
    };

    render() {
        const { accounts, defaultAccount } = this.props;

        return (
            <Container>

                <SendFunds
                    defaultAddress={ defaultAccount }
                    sendCallback={ this.sendFunds }
                />
            </Container>
        );
    }
}

export default connect(
    ({ wallet }) => ({
        accounts: wallet.accounts,
        defaultAccount: wallet.defaultAccount,
    }),
    actions,
)(EthSend);

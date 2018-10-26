import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import * as actions from "../../redux/wallet";
import Container from '../../components/Container/Container';
import {AddAccount, SendFunds, WalletAccountsList} from "../../components/Wallet/Wallet";

class EthWallet extends Component {

    loadAccounts = () => {
        this.props.loadAccounts()
    };

    componentWillMount() {
        this.loadAccounts();
    };

    forgetAccount = (address, e) => {
        e.stopPropagation();
        this.props.deleteAccount(address).then(this.loadAccounts);
    };

    create = () => {
        this.props.createAccount().then(this.loadAccounts);
    };

    importAccount = (privatekey) => {
        this.props.importAccount(privatekey).then(this.loadAccounts);
    };

    setDefaultAccount = (address) => {
        this.props.setDefaultAccount(address);
    };

    sendFunds = (defaultAddress, recipientAddress, amount) => {
        this.props.sendFunds(defaultAddress, recipientAddress, amount)
            .then(() => {
                this.props.loadAccounts();
            });
    };

    render() {
        const {accounts, defaultAccount} = this.props;

        return (
            <Container>
                <h3>Current account</h3>
                {defaultAccount}
                <SendFunds
                    defaultAddress={defaultAccount}
                    sendCallback={this.sendFunds}
                />
                <hr/>

                <h3>Accounts</h3>

                <WalletAccountsList
                    accounts={accounts}
                    defaultAccountAddress={defaultAccount}
                    setDefaultCallback={this.setDefaultAccount}
                    forgetCallback={this.forgetAccount}
                />
                <hr/>

                <h3>Management</h3>
                <div>
                    <button onClick={this.create}>Create new account</button>
                </div>
                <AddAccount
                    addMethodName='Import'
                    placeholder='private key'
                    addCallback={this.importAccount}
                />
            </Container>
        );
    }
}

export default connect(
    ({wallet}) => ({
        accounts: wallet.accounts,
        defaultAccount: wallet.defaultAccount
    }),
    actions
)(EthWallet);

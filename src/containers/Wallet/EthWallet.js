import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import * as actions from "../../redux/wallet";
import Container from '../../components/Container/Container';
import {AddAccount, WalletAccountsList} from "../../components/Wallet/Wallet";

class EthWallet extends Component {

    state = {
        showSendPanel: false
    };

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

    startSend = () => {
        this.setState({
            showSendPanel: true
        })
    };

    cancelSend = () => {
        this.setState({
            showSendPanel: false
        })
    };

    sendMoney = () => {
        const {defaultAccount} = this.props;
        const recipientAddress = this.refs.recipientAddress.value;
        const amount = this.refs.amount.value;
        this.props.sendMony(defaultAccount, recipientAddress, amount)
            .then(() => {
                this.props.loadAccounts();
            });
        this.setState({
            showSendPanel: false
        })
    };

    render() {
        const {accounts, defaultAccount} = this.props;
        const {showSendPanel} = this.state;

        return (
            <Container>
                <h3>Current account</h3>
                {defaultAccount}
                <div>
                    {!showSendPanel &&
                        <div>
                            <button onClick={this.startSend}>Send ETH</button>
                        </div>
                    }
                    {showSendPanel &&
                        <div>
                            <div>
                                <input ref='recipientAddress' placeholder='Recipient Address'/>
                            </div>
                            <div>
                                <input ref='amount' placeholder='Amount'/>
                            </div>
                            <button onClick={this.sendMoney}>send</button>
                            <button onClick={this.cancelSend}>cancel</button>
                        </div>
                    }
                </div>

                <h3>Accounts</h3>

                <WalletAccountsList
                    accounts={accounts}
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
    ({ wallet }) => ({
        accounts: wallet.accounts,
        defaultAccount: wallet.defaultAccount
    }),
    actions
)(EthWallet);

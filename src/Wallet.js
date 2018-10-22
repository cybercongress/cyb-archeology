import React, {Component} from 'react';

import connect from "react-redux/es/connect/connect";
import * as actions from "./redux/wallet";
import * as cyberActions from './redux/cyber'
import Container from './components/Container/Container';

class Wallet extends Component {
    state = {
        showSendPanel: false
    }
    loadAccounts = () => {
        this.props.loadAccounts()
    }

    componentWillMount() {
        this.loadAccounts();
    }

    deleteAccount = (e, address) => {
        e.stopPropagation();
        this.props.deleteAccount(address).then(this.loadAccounts);
    }

    create = () => {
        this.props.createAccount().then(this.loadAccounts);
    }

    importKey = () => {
        const privatekey = this.refs.importPrivateKey.value;
        this.props.importAccount(privatekey).then(this.loadAccounts);
    }

    selectAccount = (account) => {
        this.props.setDefaultAccount(account.address);
    }

    startSend = () => {
        this.setState({
            showSendPanel: true
        })
    }

    cancelSend = () => {
        this.setState({
            showSendPanel: false
        })
    }

    sendMony = () => {
        const {defaultAccount} = this.props;
        const recipientAddress = this.refs.recipientAddress.value;
        const amount = this.refs.amount.value;
        this.props.sendMony(defaultAccount, recipientAddress, amount)
            .then(() => {
                this.props.loadAccounts();
            })
        this.setState({
            showSendPanel: false
        })
    }

    render() {
        const {accounts, defaultAccount} = this.props;
        const {showSendPanel} = this.state;
        return (
            <Container>
                <div>current account</div>
                {defaultAccount}
                <div>
                    {!showSendPanel && <div>
                        <button onClick={this.startSend}>send</button>
                    </div>}
                    {showSendPanel && <div>
                        <div>
                            <input ref='recipientAddress' placeholder='Recipient Address'/>
                        </div>
                        <div>
                            <input ref='amount' placeholder='Amount'/>
                        </div>
                        <button onClick={this.sendMony}>next</button>
                        <button onClick={this.cancelSend}>cancel</button>
                    </div>}
                </div>
                <h2>accounts</h2>
                <div>
                    {accounts.map(account => {
                        const css = `account ${account.address === defaultAccount ? 'account---defaultAccount' : ''}`;
                        return (
                            <div onClick={() => this.selectAccount(account)} className={css} key={account.address}>
                                <div>{account.address}</div>
                                <div>{account.balance}</div>
                                <button onClick={(e) => this.deleteAccount(e, account.address)}>forget</button>
                            </div>
                        );
                    })}
                </div>
                <div>
                    <button onClick={this.create}>create</button>
                </div>
                <div>
                    <button onClick={this.importKey}>import</button>
                    <input ref='importPrivateKey' placeholder='privatekey'/>
                </div>
            </Container>
        );
    }
}

Wallet = connect(
    ({wallet}) => ({
        accounts: wallet.accounts,
        defaultAccount: wallet.defaultAccount
    }),
    actions
)(Wallet);

class CyberWallet extends Component {
    importAccount = () => {
        const privateKey = this.refs.privateKeyInput.value;
        this.props.importAccount(privateKey);
    }

    restoreAccount = () => {
        const seedPhrase = this.refs.recoverInput.value;
        this.props.restoreAccount(seedPhrase);
    }

    setDefaultAccount = (account) => {
        this.props.setDefaultCyberAccount(account.address);
    }

    render() {
        return (
            <div>
                <div>
                    {this.props.accounts.map(account =>
                        <div onClick={() => this.setDefaultAccount(account)} key={account.address}>
                            <div>
                                address: {account.address}
                            </div>
                            <div>
                                balance: {account.balance}
                            </div>
                        </div>)
                    }
                    <hr/>
                    <button onClick={this.createAccount}>Create new account</button>
                    <div>
                        <p>Recover</p>
                        <input ref='recoverInput' placeholder='seed for recover'/>
                        <button onClick={this.restoreAccount}>recover</button>
                    </div>
                    <div>
                        <p>Import</p>
                        <input ref='privateKeyInput' placeholder='private key for import'/>
                        <button onClick={this.importAccount}>import</button>
                    </div>
                </div>
            </div>
        );
    }
}

CyberWallet = connect(
    ({cyber}) => ({
        accounts: cyber.accounts
    }),
    cyberActions
)(CyberWallet);


class Page extends Component {
    state = {
        tab: 'cyb'
    }
    selec = (tab) => {
        this.setState({tab});
    }

    render() {
        const {tab} = this.state;
        return (
            <div>
                <Container>
                    <button onClick={() => this.selec('eth')}>eth</button>
                    <button onClick={() => this.selec('cyb')}>cyb</button>
                </Container>
                <Container>
                    {tab === 'eth' && <Wallet/>}
                    {tab === 'cyb' && <CyberWallet/>}
                </Container>
            </div>
        );
    }
}


export default Page;

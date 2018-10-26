import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import * as cyberActions from "../../redux/cyber";
import {AddAccount, SendFunds, WalletAccountsList, WalletContainer} from "../../components/Wallet/Wallet";
import Container from "../../components/Container/Container";
import Block, {BlockRow} from "../../components/Settings/Block";
import Button from "../../components/Button/Button";

class CyberWallet extends Component {

    importAccount = (privateKey) => {
        this.props.importAccount(privateKey);
    };

    restoreAccount = (seedPhrase) => {
        this.props.restoreAccount(seedPhrase);
    };

    setDefaultAccount = (address) => {
        this.props.setDefaultCyberAccount(address);
    };

    createCyberAccount = () => {
        this.props.createCyberAccount();
    };

    forgetAccount = (address) => {
        this.props.forgetCyberAccount(address)
    };

    claimFunds = (address, amount) => {
        this.props.claimFunds(address, amount)
    };

    sendFunds = (defaultAddress, recipientAddress, amount) => {
        this.props.sendFunds(defaultAddress, recipientAddress, amount)
    };

    render() {
        const defaultAccountAddress = this.props.defaultAccount;
        const accounts = this.props.accounts;

        return (
            <WalletContainer>
                <Block>
                    <BlockRow>
                    {defaultAccountAddress}
                    </BlockRow>
                    <BlockRow>
                        Balance:
                    </BlockRow>
                </Block>
                <hr/>

                <WalletAccountsList
                    accounts={accounts}
                    defaultAccountAddress={defaultAccountAddress}
                    setDefaultCallback={this.setDefaultAccount}
                    forgetCallback={this.forgetAccount}
                />

                <Button onClick={this.createCyberAccount}>Create new account</Button>

                <AddAccount
                    addMethodName='Recover'
                    placeholder='seed phrase'
                    addCallback={this.restoreAccount}
                />
                <AddAccount
                    addMethodName='Import'
                    placeholder='private key'
                    addCallback={this.importAccount}
                />
                <SendFunds
                    defaultAddress={defaultAccountAddress}
                    sendCallback={this.sendFunds}
                />
            </WalletContainer>
        );
    }
}

export default connect(
    ({cyber}) => ({
        accounts: cyber.accounts,
        defaultAccount: cyber.defaultAccount
    }),
    cyberActions
)(CyberWallet);


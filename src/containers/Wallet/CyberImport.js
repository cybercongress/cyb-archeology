import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import * as cyberActions from "../../redux/cyber";
import {AddAccount, SendFunds, WalletAccountsList, WalletContainer} from "../../components/Wallet/Wallet";
import Container from "../../components/Container/Container";
import Block, {BlockRow} from "../../components/Settings/Block";
import Button from "../../components/Button/Button";

class CyberImport extends Component {

    importAccount = (privateKey) => {
        this.props.importAccount(privateKey);
    };

    restoreAccount = (seedPhrase) => {
        this.props.restoreAccount(seedPhrase);
    };


    render() {
        const defaultAccountAddress = this.props.defaultAccount;
        const accounts = this.props.accounts;

        return (
            <WalletContainer>
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
)(CyberImport);


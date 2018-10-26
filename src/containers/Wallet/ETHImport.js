import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import * as actions from "../../redux/wallet";
import Container from '../../components/Container/Container';
import {AddAccount, SendFunds, WalletAccountsList} from "../../components/Wallet/Wallet";

class ETHImport extends Component {



    importAccount = (privatekey) => {
        this.props.importAccount(privatekey).then(this.loadAccounts);
    };



    render() {
        const {accounts, defaultAccount} = this.props;

        return (
            <Container>
               
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
    null,
    actions
)(ETHImport);

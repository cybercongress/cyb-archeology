import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import * as actions from '../../redux/wallet';
import Container from '../../components/Container/Container';
import { AddAccount } from '../../components/Wallet/Wallet';

class ETHImport extends Component {
    importAccount = (privatekey) => {
        this.props.importAccount(privatekey)
            .then(this.props.importCompleted);
    };


    render() {
        return (
            <Container>
                <AddAccount
                    addMethodName='Import'
                    placeholder='private key'
                    addCallback={ this.importAccount }
                />
            </Container>
        );
    }
}

export default connect(
    null,
    actions,
)(ETHImport);

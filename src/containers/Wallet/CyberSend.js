import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import * as cyberActions from '../../redux/cyber';
import {
    AddAccount, Avatar, SendFunds, WalletAccountsList, WalletContainer,
} from '../../components/Wallet/Wallet';
import Container from '../../components/Container/Container';
import Block, { BlockRow } from '../../components/Settings/Block';
import Button from '../../components/Button/Button';
import AccountCard, {
    AccountCardContent, AccountCardContentItem,
    AccountCardLeft, AccountCardRight,
    MainIndecator
} from '../../components/Wallet/AccountCard/AccountCard';

class CyberSend extends Component {
    sendFunds = (defaultAddress, recipientAddress, amount) => {
        this.props.sendFunds(defaultAddress, recipientAddress, amount);
    };

    render() {
        const { defaultAccountAddress, defaultAccountBalance, defaultAccountPublicKey } = this.props;

        const defaultAccountComponent = defaultAccountAddress && (
            <AccountCard>
                <AccountCardLeft>

                    <Avatar hash={defaultAccountAddress} />
                    <MainIndecator />
                </AccountCardLeft>
                <AccountCardRight>
                    <AccountCardContent>
                        <AccountCardContentItem>
                            address:
                            {' '}
                            {defaultAccountAddress}
                        </AccountCardContentItem>
                        <AccountCardContentItem>
                            public key:
                            {' '}
                            {defaultAccountPublicKey}
                        </AccountCardContentItem>
                        <AccountCardContentItem>
                            <div>
                                balance:
                                {defaultAccountBalance}
                                {' '}
                                CYB
                            </div>
                            <div>
                                <Button onClick={() => this.props.onCopyKey(defaultAccountAddress)}>COPY PRIVATE KEY</Button>
                            </div>
                        </AccountCardContentItem>
                    </AccountCardContent>
                </AccountCardRight>
            </AccountCard>
        );

        return (
            <div>
            {defaultAccountAddress ? <div>
                    {defaultAccountComponent}
                    <SendFunds
                        defaultAddress={ defaultAccountAddress }
                        sendCallback={ this.sendFunds }
                    />
                </div> : (
                    <div>
                        you have no accounts
                    </div>
                )}
            </div>
        );
    }
}

export default connect(
    ({ cyber }) => ({
        accounts: cyber.accounts,
        defaultAccountAddress: cyber.defaultAccount,
        defaultAccountPublicKey: cyberActions.getDefaultAccountPublicKey({ cyber }),
        defaultAccountBalance: cyberActions.getDefaultAccountBalance({ cyber })
    }),
    cyberActions,
)(CyberSend);

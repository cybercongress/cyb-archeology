import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import * as cyberActions from '../../redux/cyber';
import {
    AddAccount, SendFunds, WalletAccountsList, WalletContainer, Avatar,
} from '../../components/Wallet/Wallet';
import Container from '../../components/Container/Container';
import Block, { BlockRow } from '../../components/Settings/Block';
import Button from '../../components/Button/Button';

import AccountCard, {
    AccountCardLeft, AccountCardRight,
    AccountCardContent, AccountCardContentItem,
    MainIndecator, SelectButton, CreateButtonContainer,
} from '../../components/Wallet/AccountCard/AccountCard';


class CyberAccounts extends Component {
    setDefaultAccount = (account) => {
        this.props.setDefaultCyberAccount(account);
    };

    createCyberAccount = () => {
        this.props.createCyberAccount();
    };

    forgetAccount = (address) => {
        this.props.forgetCyberAccount(address);
    };

    claimFunds = (address, amount) => {
        this.props.claimFunds(address, amount);
    };


    render() {
        const { accounts, defaultAccount, defaultAccountPublicKey, defaultAccountBalance } = this.props;

        const defaultAccountComponent = defaultAccount && (
            <AccountCard>
                <AccountCardLeft>

                    <Avatar hash={defaultAccount} />
                    <MainIndecator />
                </AccountCardLeft>
                <AccountCardRight>
                    <AccountCardContent>
                        <AccountCardContentItem>
                        Address:
                            {' '}
                            {defaultAccount}
                        </AccountCardContentItem>
                        <AccountCardContentItem>
                            <div>
                                Balance:
                                {' '}
                                {defaultAccountBalance}
                                {' '}
                                CYB
                            </div>
                            <div>
                                <Button onClick={() => this.props.onCopyKey(defaultAccount)}>COPY PRIVATE KEY</Button>
                            </div>
                        </AccountCardContentItem>
                    </AccountCardContent>
                </AccountCardRight>
            </AccountCard>
        );

        const accountsItem = accounts.filter(a => a.address !== defaultAccount).map(account => (
            <AccountCard key={account.address}>
                <AccountCardLeft>
                    <Avatar hash={account.address} />
                    <SelectButton
                      onClick={ () => this.setDefaultAccount(account) }
                    >
                        MAKE MAIN
                    </SelectButton>
                </AccountCardLeft>
                <AccountCardRight>
                    <AccountCardContent>
                        <AccountCardContentItem>
                            Address:
                            {' '}
                            {account.address}
                        </AccountCardContentItem>
                        <AccountCardContentItem>
                            <div>
                                Balance:
                                {' '}
                                {account.balance}
                                {' '}
                                CYB
                            </div>
                            <div>
                                <Button
                                  onClick={ () => this.forgetAccount(account.address) }
                                  style={ { marginRight: 10 } }
                                  color='red'
                                >
                                    REMOVE
                                </Button>
                                <Button onClick={() => this.props.onCopyKey(account.address)}>COPY PRIVATE KEY</Button>
                            </div>
                        </AccountCardContentItem>
                    </AccountCardContent>
                </AccountCardRight>
            </AccountCard>
        ));

        return (
            <div>
                {defaultAccountComponent}

                {defaultAccount && <hr />}

                {accountsItem}

                <CreateButtonContainer>
                    <Button onClick={ this.createCyberAccount }>CREATE NEW</Button>
                </CreateButtonContainer>
            </div>
        );
    }
}

export default connect(
    ({ cyber }) => ({
        accounts: cyber.accounts,
        defaultAccount: cyber.defaultAccount,
        defaultAccountPublicKey: cyberActions.getDefaultAccountPublicKey({ cyber }),
        defaultAccountBalance: cyberActions.getDefaultAccountBalance({ cyber })
    }),
    cyberActions,
)(CyberAccounts);

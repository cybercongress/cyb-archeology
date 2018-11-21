import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import * as actions from '../../redux/wallet';
import { Avatar } from '../../components/Wallet/Wallet';
import Button from '../../components/Button/Button';

import AccountCard, {
    AccountCardLeft, AccountCardRight,
    AccountCardContent, AccountCardContentItem,
    MainIndecator, SelectButton, CreateButtonContainer,
} from '../../components/Wallet/AccountCard/AccountCard';


class EthAccounts extends Component {
    loadAccounts = () => {
        this.props.loadAccounts();
    };

    componentWillMount() {
        this.loadAccounts();
    }

    forgetAccount = (address, e) => {
        e.stopPropagation();
        this.props.deleteAccount(address).then(this.loadAccounts);
    };

    create = () => {
        this.props.createAccount();
    };


    setDefaultAccount = (address) => {
        this.props.setDefaultAccount(address);
    };


    render() {
        const { accounts, defaultAccount, defaultAccountBalance } = this.props;

        const defaultAccountComponent = defaultAccount && (
            <AccountCard>
                <AccountCardLeft>

                    <Avatar />
                    <MainIndecator />
                </AccountCardLeft>
                <AccountCardRight>
                    <AccountCardContent>
                        <AccountCardContentItem>
                        address:
                            {' '}
                            {defaultAccount}
                        </AccountCardContentItem>
                        <AccountCardContentItem>
                            <div>
balance:
                                {defaultAccountBalance}
                                {' '}
ETH
                            </div>
                        </AccountCardContentItem>
                    </AccountCardContent>
                </AccountCardRight>
            </AccountCard>
        );


        const accountsItem = accounts.map(account => (
            <AccountCard key={account.address}>
                <AccountCardLeft>
                    <Avatar />
                    <SelectButton
                      onClick={ () => this.setDefaultAccount(account) }
                    >
MAKE MAIN
                    </SelectButton>
                </AccountCardLeft>
                <AccountCardRight>
                    <AccountCardContent>
                        <AccountCardContentItem>
                        address:
                            {' '}
                            {account.address}
                        </AccountCardContentItem>
                        <AccountCardContentItem>
                            <div>
balance:
                                {account.balance}
                                {' '}
ETH
                            </div>
                            <div>
                                <Button
                                  color='red'
                                  onClick={ e => this.forgetAccount(account.address, e) }
                                  style={ { marginRight: 10 } }
                                >
REMOVE
                                </Button>
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
                    <Button onClick={ this.create }>CREATE NEW</Button>
                </CreateButtonContainer>
            </div>
        );
    }
}

export default connect(
    ({ wallet }) => ({
        accounts: wallet.accounts,
        defaultAccount: wallet.defaultAccount,
        defaultAccountBalance: wallet.defaultAccountBalance
    }),
    actions,
)(EthAccounts);

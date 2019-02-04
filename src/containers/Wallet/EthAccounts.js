import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import {
    Button,
    AccountCardLeft,
    AccountCardRight,
    AccountCardContent,
    AccountCardContentItem,
    MainIndecator,
    CreateButtonContainer,
    AccountCard,
    Avatar,
} from '@cybercongress/ui';
import {
    getDefaultAccountBalance,
    deleteAccount,
    loadAccounts,
    createAccount,
    onCopyKey,
    setDefaultAccount,
} from '../../redux/wallet';
// import { Avatar } from '../../components/Wallet/Wallet';
// import Button from '../../components/Button/Button';

// import AccountCard, {
//     AccountCardLeft, AccountCardRight,
//     AccountCardContent, AccountCardContentItem,
//     MainIndecator, SelectButton, CreateButtonContainer,
// } from '../../components/Wallet/AccountCard/AccountCard';


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
                    <Avatar hash={ defaultAccount } />
                    <MainIndecator />
                </AccountCardLeft>
                <AccountCardRight>
                    <AccountCardContent>
                        <AccountCardContentItem>
Address:
                            {defaultAccount}
                        </AccountCardContentItem>
                        <AccountCardContentItem>
                            <div>
Balance:
                                {' '}
                                {defaultAccountBalance}
                                {' '}
ETH
                            </div>
                            <div>
                                <Button
                                  color='blue'
                                  onClick={ () => this.props.onCopyKey(defaultAccount) }
                                >
                                    COPY PRIVATE KEY
                                </Button>
                            </div>
                        </AccountCardContentItem>
                    </AccountCardContent>
                </AccountCardRight>
            </AccountCard>
        );

        const accountsItem = accounts.filter(a => a.address !== defaultAccount).map(account => (
            <AccountCard key={ account.address }>
                <AccountCardLeft>
                    <Avatar hash={ account.address } />
                    <Button
                      color='ogange'
                      style={ { fontSize: 14 } }
                      onClick={ () => this.setDefaultAccount(account) }
                    >
                        MAKE MAIN
                    </Button>
                </AccountCardLeft>
                <AccountCardRight>
                    <AccountCardContent>
                        <AccountCardContentItem>
Address:
                            {account.address}
                        </AccountCardContentItem>
                        <AccountCardContentItem>
                            <div>
Balance:
                                {' '}
                                {account.balance}
                                {' '}
ETH
                            </div>
                            <div>
                                <div>
                                    <Button
                                      color='red'
                                      onClick={ e => this.forgetAccount(account.address, e) }
                                      style={ { marginRight: 10 } }
                                    >
                                        REMOVE
                                    </Button>
                                    <Button
                                      color='blue'
                                      onClick={ () => this.props.onCopyKey(account.address) }
                                    >
                                        COPY PRIVATE KEY
                                    </Button>
                                </div>
                            </div>
                        </AccountCardContentItem>
                    </AccountCardContent>
                </AccountCardRight>
            </AccountCard>
        ));

        return (
            <div>
                {defaultAccountComponent}

                {defaultAccount && <hr style={ { marginBottom: 10 } } />}

                {accountsItem}

                <CreateButtonContainer>
                    <Button color='blue' onClick={ this.create }>
                        CREATE NEW
                    </Button>
                </CreateButtonContainer>
            </div>
        );
    }
}

export default connect(
    ({ wallet }) => ({
        accounts: wallet.accounts,
        defaultAccount: wallet.defaultAccount,
        defaultAccountBalance: getDefaultAccountBalance({ wallet }),
    }),
    {
        deleteAccount,
        loadAccounts,
        createAccount,
        onCopyKey,
        setDefaultAccount,
    },
)(EthAccounts);

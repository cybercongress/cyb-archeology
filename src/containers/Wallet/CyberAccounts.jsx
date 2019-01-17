import React from 'react';
import connect from 'react-redux/es/connect/connect';
import * as cyberActions from '../../redux/cyber';
import {
    Avatar,
} from '../../components/Wallet/Wallet';
import Button from '../../components/Button/Button';

import AccountCard, {
    AccountCardLeft, AccountCardRight,
    AccountCardContent, AccountCardContentItem,
    MainIndecator, SelectButton, CreateButtonContainer,
} from '../../components/Wallet/AccountCard/AccountCard';


const CyberAccounts = (props) => {
    const {
        accounts, defaultAccount, defaultAccountBalance,
    } = props;

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
                            <Button onClick={ () => props.onCopyKey(defaultAccount) }>
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
                <SelectButton
                  onClick={ () => props.setDefaultCyberAccount(account) }
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
                              onClick={ () => props.forgetCyberAccount(account.address) }
                              style={ { marginRight: 10 } }
                              color='red'
                            >
                                REMOVE
                            </Button>
                            <Button onClick={ () => props.onCopyKey(account.address) }>
                            COPY PRIVATE KEY
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
                <Button onClick={ () => props.createCyberAccount() }>CREATE NEW</Button>
            </CreateButtonContainer>
        </div>
    );
};

export default connect(
    ({ cyber }) => ({
        accounts: cyber.accounts,
        defaultAccount: cyber.defaultAccount,
        defaultAccountPublicKey: cyberActions.getDefaultAccountPublicKey({ cyber }),
        defaultAccountBalance: cyberActions.getDefaultAccountBalance({ cyber }),
    }),
    cyberActions,
)(CyberAccounts);

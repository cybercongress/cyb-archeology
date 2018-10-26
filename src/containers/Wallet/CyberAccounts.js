import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import * as cyberActions from "../../redux/cyber";
import {AddAccount, SendFunds, WalletAccountsList, WalletContainer, Avatar} from "../../components/Wallet/Wallet";
import Container from "../../components/Container/Container";
import Block, {BlockRow} from "../../components/Settings/Block";
import Button from "../../components/Button/Button";

import AccountCard, { 
    AccountCardLeft, AccountCardRight, 
    AccountCardContent, AccountCardContentItem,
    MainIndecator, SelectButton, CreateButtonContainer
} from "../../components/Wallet/AccountCard/AccountCard";


class CyberAccounts extends Component {


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


    render() {
        const { accounts, defaultAccount } = this.props;

        const key = 'TODO';
        const balabnce = 'TODO';


        const defaultAccountComponent = (
            <AccountCard>
                <AccountCardLeft>
                    
                    <Avatar />
                    <MainIndecator />
                </AccountCardLeft>
                <AccountCardRight>
                    <AccountCardContent>
                    <AccountCardContentItem>
                        address: {defaultAccount}
                    </AccountCardContentItem>
                    <AccountCardContentItem>
                        public key: {key}
                    </AccountCardContentItem>
                    <AccountCardContentItem>
                        <div>balance: {balabnce} CYBERD</div>
                        <div><Button>COPY PRIVATE KEY</Button>
                        </div>
                    </AccountCardContentItem>
                    </AccountCardContent>
                </AccountCardRight>
            </AccountCard>
        );


        const accountsItem = accounts.map(account => (
            <AccountCard>
                <AccountCardLeft>
                    <Avatar/>
                    <SelectButton
                      onClick={() => this.setDefaultAccount(account.address)}
                    >MAKE MAIN</SelectButton>
                </AccountCardLeft>
                <AccountCardRight>
                    <AccountCardContent>
                    <AccountCardContentItem>
                        address: {account.address}
                    </AccountCardContentItem>
                    <AccountCardContentItem>
                        public key: {account.publicKey}
                    </AccountCardContentItem>
                    <AccountCardContentItem>
                        <div>balance: {account.balance} CYBERD</div>
                        <div>
                            <Button 
                              onClick={() => this.forgetAccount(account.address)} 
                              style={{ marginRight: 10 }}
                              color='red'
                            >REMOVE</Button>
                            <Button>COPY PRIVATE KEY</Button>
                        </div>
                    </AccountCardContentItem>
                    </AccountCardContent>
                </AccountCardRight>
            </AccountCard>
        ))

        return (
            <div>
                {defaultAccountComponent}

                <hr/>

                {accountsItem}

                <CreateButtonContainer>
                    <Button onClick={this.createCyberAccount}>CREATE NEW</Button>
                </CreateButtonContainer>
            </div>
        );
    }
}

export default connect(
    ({cyber}) => ({
        accounts: cyber.accounts,
        defaultAccount: cyber.defaultAccount
    }),
    cyberActions
)(CyberAccounts);


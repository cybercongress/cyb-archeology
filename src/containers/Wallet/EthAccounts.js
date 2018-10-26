import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import * as actions from "../../redux/wallet";
import Container from '../../components/Container/Container';
import { Avatar } from "../../components/Wallet/Wallet";
import Button from "../../components/Button/Button";

import AccountCard, { 
    AccountCardLeft, AccountCardRight, 
    AccountCardContent, AccountCardContentItem,
    MainIndecator, SelectButton, CreateButtonContainer
} from "../../components/Wallet/AccountCard/AccountCard";



class EthAccounts extends Component {

    loadAccounts = () => {
        this.props.loadAccounts()
    };

    componentWillMount() {
        this.loadAccounts();
    };

    forgetAccount = (address, e) => {
        e.stopPropagation();
        this.props.deleteAccount(address).then(this.loadAccounts);
    };

    create = () => {
        this.props.createAccount().then(this.loadAccounts);
    };


    setDefaultAccount = (address) => {
        this.props.setDefaultAccount(address);
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
                        <div>balance: {account.balance} CYBERD</div>
                        <div>
                            <Button 
                              color='red'
                              onClick={(e) => this.forgetAccount(account.address, e)} 
                              style={{ marginRight: 10 }}
                            >REMOVE</Button>
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
                    <Button onClick={this.create}>CREATE NEW</Button>
                </CreateButtonContainer>
            </div>
        );
    }
}

export default connect(
    ({wallet}) => ({
        accounts: wallet.accounts,
        defaultAccount: wallet.defaultAccount
    }),
    actions
)(EthAccounts);

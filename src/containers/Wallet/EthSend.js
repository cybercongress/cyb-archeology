import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import * as actions from '../../redux/wallet';
import Container from '../../components/Container/Container';
import { Avatar, SendFunds } from '../../components/Wallet/Wallet';
import AccountCard, {
    AccountCardContent, AccountCardContentItem,
    AccountCardLeft, AccountCardRight,
    MainIndecator
} from '../../components/Wallet/AccountCard/AccountCard';
import Button from '../../components/Button/Button';

class EthSend extends Component {
    sendFunds = (defaultAddress, recipientAddress, amount) => {
        this.props.sendFunds(defaultAddress, recipientAddress, amount)
            .then(() => {
                this.props.loadAccounts();
            });
    };

    render() {
        const { defaultAccount, defaultAccountBalance } = this.props;

        const defaultAccountComponent = defaultAccount && (
            <AccountCard>
                <AccountCardLeft>
                    <Avatar hash={defaultAccount} />
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

        return (
            <div>
                {defaultAccount ? <div>
                    {defaultAccountComponent}
                    <SendFunds
                        defaultAddress={ defaultAccount }
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
    ({ wallet }) => ({
        defaultAccount: wallet.defaultAccount,
        defaultAccountBalance: actions.getDefaultAccountBalance({ wallet }),
    }),
    actions,
)(EthSend);

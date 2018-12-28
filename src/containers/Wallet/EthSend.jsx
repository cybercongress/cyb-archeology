import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import web3 from 'web3';
import * as actions from '../../redux/wallet';
import { Avatar, SendFunds } from '../../components/Wallet/Wallet';
import AccountCard, {
    AccountCardContent, AccountCardContentItem,
    AccountCardLeft, AccountCardRight,
    MainIndecator,
} from '../../components/Wallet/AccountCard/AccountCard';

class EthSend extends Component {
    sendFunds = (defaultAddress, recipientAddress, amount) => {
        const { props } = this;

        props.sendFunds(defaultAddress, recipientAddress, amount)
            .then(() => {
                props.loadAccounts();
            });
    };

    validateAddress = (address) => {
        return address.indexOf('0x') === 0 && web3.utils.isAddress(address);
    }

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
                {defaultAccount ? (
                    <div>
                        {defaultAccountComponent}
                        <SendFunds
                          defaultAddress={ defaultAccount }
                          sendCallback={ this.sendFunds }
                          validateAddress={this.validateAddress}
                        />
                    </div>
                ) : (
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

import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import {
    Avatar,
    Button,
    AccountCard,
    AccountCardContent, AccountCardContentItem,
    AccountCardLeft, AccountCardRight,
    MainIndecator,
} from '@cybercongress/ui';
import * as cyberActions from '../../redux/cyber';
import { isValidAddress } from '../../cyber/crypto';
import { SendFunds } from '../../components/Wallet/Wallet';

class CyberSend extends Component {
    sendFunds = (defaultAddress, recipientAddress, amount) => {
        const { props } = this;

        props.sendFunds(defaultAddress, recipientAddress, amount);
    };

    validateAddress = address => address.indexOf('cyber') === 0
        && isValidAddress(address);

    render() {
        const { props } = this;
        const { defaultAccountAddress, defaultAccountBalance } = props;

        const defaultAccountComponent = defaultAccountAddress && (
            <AccountCard>
                <AccountCardLeft>

                    <Avatar hash={ defaultAccountAddress } />
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
                            <div>
                                balance:
                                {defaultAccountBalance}
                                {' '}
                                CYB
                            </div>
                            <div>
                                <Button color='blue' onClick={ () => props.onCopyKey(defaultAccountAddress) }>
                                COPY PRIVATE KEY
                                </Button>
                            </div>
                        </AccountCardContentItem>
                    </AccountCardContent>
                </AccountCardRight>
            </AccountCard>
        );

        return (
            <div>
                {defaultAccountAddress ? (
                    <div>
                        {defaultAccountComponent}
                        <SendFunds
                          defaultAddress={ defaultAccountAddress }
                          sendCallback={ this.sendFunds }
                          validateAddress={ this.validateAddress }
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
    ({ cyber }) => ({
        accounts: cyber.accounts,
        defaultAccountAddress: cyber.defaultAccount,
        defaultAccountPublicKey: cyberActions.getDefaultAccountPublicKey({ cyber }),
        defaultAccountBalance: cyberActions.getDefaultAccountBalance({ cyber }),
    }),
    cyberActions,
)(CyberSend);

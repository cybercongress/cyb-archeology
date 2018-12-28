import * as React from 'react';
import PropTypes from 'prop-types';
import { WideInput } from '@cybercongress/ui';
import './wallet.css';
import Block, { BlockRow } from '../Settings/Block';
import Button from '../Button/Button';
import Input from '../Input/Input';
import { SettingLabel } from "../Settings/Settings";

export const WalletContainer = props => (
    <div className='WalletContainer'>
        <div { ...props } className='WalletContainer__inner' />
    </div>
);

export const Avatar = ({ hash }) => {
    return (
        <img className='avatar' src={`https://robohash.org/${hash}`} />
    );
}

export const WalletAccountsList = ({
    accounts, defaultAccountAddress, setDefaultCallback, forgetCallback,
}) => accounts.map((account) => {
    const isDefaultAccount = account.address === defaultAccountAddress;

    return (
        <WalletAccount
            key={ account.address }
          address={ account.address }
            balance={ account.balance }
          clickCallback={ () => setDefaultCallback(account.address) }
            forgetCallback={ e => forgetCallback(account.address, e) }
            isDefaultAccount={ isDefaultAccount }
        />
    );
});

export const WalletAccount = ({
    address, balance, clickCallback, forgetCallback, isDefaultAccount,
}) => {
    const className = isDefaultAccount ? 'default-account' : '';

    return (
        <div className='user-card'>
            <div className='user-card__avatar'>
                <Avatar />
                <Button onClick={ clickCallback } color='yellow'>MAKE MAIN</Button>
            </div>
            <Block className={ className }>
                <BlockRow>
                Address:
                    {' '}
                    {address}
                </BlockRow>
                <BlockRow>
                Balance:
                    {' '}
                    {balance}
                </BlockRow>
                <BlockRow>
                    <Button onClick={ forgetCallback }>Remove</Button>
                </BlockRow>
            </Block>
        </div>
    );
};

export class AddAccount extends React.Component {
    _handleClick = () => {
        const inputValue = this.addAccountInput.value;

        this.props.addCallback(inputValue);
    };

    render() {
        return (
            <Block noMargin={true}>
                <BlockRow>
                    <Input inputRef={node => { this.addAccountInput = node; }} placeholder={ this.props.placeholder } />
                </BlockRow>
                <BlockRow>
                    <Button onClick={ this._handleClick }>{this.props.addMethodName}</Button>
                </BlockRow>
            </Block>
        );
    }
}

AddAccount.propTypes = {
    addCallback: PropTypes.func,
    addMethodName: PropTypes.string,
    placeholder: PropTypes.string,
};

export class SendFunds extends React.Component {
    state = {
        addressValid: true,
    }
    send = () => {
        const validateAddress = this.props.validateAddress || (() => true);
        const defaultAddress = this.props.defaultAddress;
        const recipientAddress = this.recipientAddress.value;
        const amount = this.amount.value;
        const addressValid = validateAddress(recipientAddress);
        this.setState({
            addressValid,
        })
        if (addressValid) {
            this.props.sendCallback(defaultAddress, recipientAddress, amount);
        }
    };

    render() {
        const { addressValid } = this.state;
        return (
            <Block noMargin={true}>
                <BlockRow>
                    <SettingLabel style={{ width: 160 }}>Recipient Address</SettingLabel>
                    <div style={{ width: 350, display: 'inline-block' }}>
                        <WideInput valid={addressValid} errorMessage='incorrect ETH address' inputRef={node => { this.recipientAddress = node; }} />
                    </div>
                </BlockRow>
                <BlockRow>
                    <SettingLabel style={{ width: 160 }}>Amount</SettingLabel>
                    <div style={{ width: 350, display: 'inline-block' }}>
                        <WideInput style={{ width: 350 }} inputRef={node => { this.amount = node; }} />
                    </div>
                </BlockRow>
                <BlockRow>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button onClick={ this.cancelSend }>cancel</Button>
                        <Button color='green' onClick={ this.send }>send</Button>
                    </div>
                </BlockRow>
            </Block>
        );
    }
}

SendFunds.propTypes = {
    defaultAddress: PropTypes.string,
    sendCallback: PropTypes.func,
};

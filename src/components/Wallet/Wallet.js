import * as React from 'react';
import PropTypes from 'prop-types';
import './wallet.css';
import Block, { BlockRow } from '../Settings/Block';
import Button from '../Button/Button';
import Input from '../Input/Input';

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
        showSendPanel: false,
    };

    startSend = () => {
        this.setState({
            showSendPanel: true,
        });
    };

    cancelSend = () => {
        this.setState({
            showSendPanel: false,
        });
    };

    send = () => {
        const defaultAddress = this.props.defaultAddress;
        const recipientAddress = this.recipientAddress.value;
        const amount = this.amount.value;

        this.props.sendCallback(defaultAddress, recipientAddress, amount);

        this.setState({
            showSendPanel: false,
        });
    };

    render() {
        const { showSendPanel } = this.state;

        return (
            <div>
                {!showSendPanel
            && (
                <Block noMargin={true}>
                <BlockRow>
                    <Button onClick={ this.startSend }>Send</Button>
                </BlockRow>
                </Block>
            )
                }
                {showSendPanel
            && (
                <Block noMargin={true}>
                <BlockRow>
                        <Input inputRef={node => { this.recipientAddress = node; }} placeholder='Recipient Address' />
                </BlockRow>
                    <BlockRow>
                        <Input inputRef={node => { this.amount = node; }} placeholder='Amount' />
                </BlockRow>
                <BlockRow>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button onClick={ this.cancelSend }>cancel</Button>
                        <Button color='green' onClick={ this.send }>send</Button>
                    </div>
                </BlockRow>
                </Block>
            )
                }
            </div>
        );
    }
}

SendFunds.propTypes = {
    defaultAddress: PropTypes.string,
    sendCallback: PropTypes.func,
};

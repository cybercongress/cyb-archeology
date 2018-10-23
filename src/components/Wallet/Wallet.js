import * as React from 'react';
import PropTypes from 'prop-types';
const style = require('./wallet.css');

export const WalletAccountsList = ({accounts, defaultAccountAddress, setDefaultCallback, forgetCallback}) => {
    return accounts.map(account => {
        const isDefaultAccount = account.address === defaultAccountAddress;

        return <WalletAccount
            key={account.address}
            address={account.address}
            balance={account.balance}
            clickCallback={() => setDefaultCallback(account.address)}
            forgetCallback={(e) => forgetCallback(account.address, e)}
            isDefaultAccount={isDefaultAccount}
        />
    })
};

export const WalletAccount = ({address, balance, clickCallback, forgetCallback, isDefaultAccount}) => {
    const className = isDefaultAccount ? 'default-account' : '';

    return <div onClick={clickCallback} className={className}>
        <div>
            Address: {address}
        </div>
        <div>
            Balance: {balance}
        </div>
        <div>
            <button onClick={forgetCallback}>Forget</button>
        </div>
    </div>
};

export class AddAccount extends React.Component {

    _handleClick = () => {
        const inputValue = this.refs.addAccountInput.value;
        this.props.addCallback(inputValue);
    };

    render() {
        return <div>
            <p>{this.props.addMethodName}</p>
            <input ref='addAccountInput' placeholder={this.props.placeholder}/>
            <button onClick={this._handleClick}>{this.props.addMethodName}</button>
        </div>
    }
}

AddAccount.propTypes = {
    addCallback: PropTypes.func,
    addMethodName: PropTypes.string,
    placeholder: PropTypes.string
};

export class SendFunds extends React.Component {

    state = {
        showSendPanel: false
    };

    startSend = () => {
        this.setState({
            showSendPanel: true
        })
    };

    cancelSend = () => {
        this.setState({
            showSendPanel: false
        })
    };

    send = () => {
        const defaultAddress = this.props.defaultAddress;
        const recipientAddress = this.refs.recipientAddress.value;
        const amount = this.refs.amount.value;

        this.props.sendCallback(defaultAddress, recipientAddress, amount);

        this.setState({
            showSendPanel: false
        })
    };

    render() {
        const {showSendPanel} = this.state;

        return <div>
            {!showSendPanel &&
            <div>
                <button onClick={this.startSend}>Send</button>
            </div>
            }
            {showSendPanel &&
            <div>
                <div>
                    <input ref='recipientAddress' placeholder='Recipient Address'/>
                </div>
                <div>
                    <input ref='amount' placeholder='Amount'/>
                </div>
                <button onClick={this.send}>send</button>
                <button onClick={this.cancelSend}>cancel</button>
            </div>
            }
        </div>
    }
}

SendFunds.propTypes = {
    defaultAddress: PropTypes.string,
    sendCallback: PropTypes.func
};

import * as React from 'react';
import PropTypes from 'prop-types';
import Container from "../Container/Container";

export const WalletAccountsList = ({accounts, setDefaultCallback, forgetCallback}) => {
    return accounts.map(account =>
        <WalletAccount
            key={account.address}
            address={account.address}
            balance={account.balance}
            clickCallback={() => setDefaultCallback(account.address)}
            forgetCallback={(e) => forgetCallback(account.address, e)}
        />
    )
};

export const WalletAccount = ({address, balance, clickCallback, forgetCallback}) => {
    return <div onClick={clickCallback}>
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

    render() {
        const defaultAddress = this.props.defaultAddress;
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
                <button onClick={this.sendMoney}>send</button>
                <button onClick={this.cancelSend}>cancel</button>
            </div>
            }
        </div>
    }
}

SendFunds.propTypes = {
    defaultAddress: PropTypes.string
};

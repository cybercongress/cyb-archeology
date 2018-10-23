import * as React from 'react';

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

    render () {
        return <div>
            <p>{this.props.addMethodName}</p>
            <input ref='addAccountInput' placeholder={this.props.placeholder}/>
            <button onClick={this._handleClick}>{this.props.addMethodName}</button>
        </div>
    }
}

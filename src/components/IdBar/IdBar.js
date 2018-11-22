import React, { Component } from 'react';
import './IdBar.css';
import CybLink from '../CybLink';

const IdBar = ({ defaultEthAccount, defaultCyberAccount }) => (
    <div className='id-bar'>
        <SettingsLink />
        <WalletLink />
        <CurrentUser defaultEthAccount={ defaultEthAccount } defaultCyberAccount={ defaultCyberAccount } />
    </div>
);

export const SettingsLink = () => (
    <CybLink dura='settings.cyb' className='id-bar__settings'>Settings</CybLink>
);

export const WalletLink = () => (
    <CybLink dura='wallet.cyb' className='id-bar__wallet'>Wallet</CybLink>
);

class CurrentUser extends Component {
    state = {
        open: false,
    };

    toggle = () => {
        this.setState({
            open: !this.state.open,
        });
    };

    render() {
        const { open } = this.state;
        const { defaultEthAccount, defaultCyberAccount } = this.props;

        return (
            <div className='user-popup__container'>
                {/*<div className='id-bar__user' onClick={ this.toggle } />*/}
                <img className='id-bar__user' src={`https://robohash.org/${defaultEthAccount}`} />
                <div className={ `user-popup ${open ? 'user-popup--open' : ''}` }>
                    <div>
                        <span className='tokenName'>
                            ETH:
                        </span>
                        {defaultEthAccount}
                    </div>
                    <hr className='separator' />
                    <div>
                        <span className='tokenName'>
                            CYBER:
                        </span>
                        {defaultCyberAccount}
                    </div>
                </div>
            </div>
        );
    }
}

export { CurrentUser };

export default IdBar;

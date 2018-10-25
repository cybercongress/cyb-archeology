import React, {Component} from 'react';

import './IdBar.css';
import CybLink from '../CybLink';

const IdBar = ({children}) => (
    <div className='id-bar'>
        {children}
    </div>
);

export const SettingsLink = () => (
    <CybLink dura='settings.cyb' className='id-bar__settings'>settings</CybLink>
);

export const WalletLink = () => (
    <CybLink dura='wallet.cyb' className='id-bar__wallet'>Wallet</CybLink>
);

class CurrentUser extends Component {
    state = {open: false}
    toggle = () => {
        this.setState({
            open: !this.state.open
        })
    }

    render() {
        const {open} = this.state;

        const {defaultAccount, cyberDefaultAccount} = this.props;
        return (
            <div className='id-bar__user user-popup__container' onClick={this.toggle}>
                <div className={`user-popup ${open ? 'user-popup--open' : ''}`}>
                    <div>ETH: {defaultAccount}</div>
                    <hr/>
                    <div>CYBER: {cyberDefaultAccount} </div>
                </div>
            </div>
        );
    }
}

export {CurrentUser}

export default IdBar;

import React from 'react';

import './WalletTabs.css';

const WalletTabs = ({ vertical, ...props }) => (
    <div { ...props } className={ `wallet-tabs ${vertical ? 'wallet-tabs--vertical' : ''}` } />
);

export const WalletTab = ({ children, isActive, onClick }) => (
    <button
        onClick={ onClick }
        className={ `wallet-tabs__tab ${isActive ? 'wallet-tabs--active' : ''}` }
    >
        {children}
    </button>
);

export default WalletTabs;

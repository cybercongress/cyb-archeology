import React from 'react';

import './WalletLauout.css';

const WalletLauout = props => (
    <div { ...props } className='wallet-lauout' />
);


export const WalletSidebar = props => (
    <div { ...props } className='wallet-lauout__sidebar' />
);

export const WalletContent = props => (
    <div { ...props } className='wallet-lauout__content' />
);

export default WalletLauout;

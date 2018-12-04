import React from 'react';

import './ConfirmationPopup.css';

export const Address = ({ children }) => (
    <span className='address'>
        {children}
    </span>
);

export const PopupLabel = ({ children }) => (
    <div className='popup-label'>
        {children}
    </div>
);

export const ConfirmationPopupContent = ({ children }) => (
    <div className='confirmation-popup__popup'>
        {children}
    </div>
);

export const ConfirmationPopup = ({ children }) => (
    <div className='confirmation-popup'>
        <span>
        {children}
        </span>
    </div>
);


export const ConfirmationPopupButtons = ({
    children,
}) => (
    <div className='confirmation-popup__buttons'>
        {children}
    </div>
);

export const TxDetailsContainer = ({ children }) => (
    <div className='tx-details-container'>
        {children}
    </div>
);

export default ConfirmationPopup;

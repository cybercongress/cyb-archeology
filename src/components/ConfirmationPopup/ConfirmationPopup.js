import React from 'react';

import './ConfirmationPopup.css';
import Block, {BlockRow} from "../Settings/Block";
import Titile from "../Titile/Titile";
import Button from "../Button/Button";

const ConfirmationPopup = ({from, to, approveCallback, rejectCallback, children, content}) => (
    <div className='confirmation-popup'>
        <Titile inline={true}>Transaction confirmation</Titile>
        <Block>
            <BlockRow>
                <div className='confirmation-popup__popup'>
                    <BlockRow>
                        <div className='popup-label'>Sender address:</div>
                        {from}
                    </BlockRow>

                    <BlockRow>
                        <div className='popup-label'>Recipient address:</div>
                        {to}
                    </BlockRow>
                    {content}
                </div>
                <div className='confirmation-popup__buttons'>
                    <Button color='green' onClick={approveCallback}>Confirm</Button>
                    <Button color='red' onClick={rejectCallback}>Reject</Button>
                </div>
            </BlockRow>
        </Block>
    </div>
);

export const TxDetailsContainer = ({children}) => (
    <div className='tx-details-container'>
        {children}
    </div>
);

export default ConfirmationPopup;

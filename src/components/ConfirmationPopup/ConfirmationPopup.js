import React from 'react';

import { Title, Message } from '@cybercongress/ui';
import './ConfirmationPopup.css';
import Block, { BlockRow, Row } from '../Settings/Block';
import Button from '../Button/Button';

const ConfirmationPopup = ({
    from, to, approveCallback, rejectCallback, children,
    content, txHash, totalAmount, accountBalance, insufficientFunds,
    hidePending, txError,
}) => (
    <div className='confirmation-popup'>
        <span>
            <Block>
            <Title inline style={ { color: 'black' } }>Transaction confirmation</Title>
                <BlockRow>
                    <div className='confirmation-popup__popup'>
                        <Row>
                            <div className='popup-label'>Sender address:</div>
                            <span className='address'>{from}</span>
                        </Row>
                        <Row>
                            <div className='popup-label'>Recipient address:</div>
                            <span className='address'>{to}</span>
                        </Row>
                        <Row>
                            <div className='popup-label'>Account balance (ETH):</div>
                            <span className='address'>{accountBalance}</span>
                        </Row>
                        <Row>
                            <div className='popup-label'>Total amount (ETH):</div>
                            <span className='address'>{totalAmount}</span>
                        </Row>
                        {insufficientFunds &&
                            <Row>
                                <Message type='error'>You have insufficient funds</Message>
                            </Row>
                        }
                        { txError &&
                            <Row>
                                <Message type={txError.type}> { txError.message } </Message>
                            </Row>
                        }
                        {content}
                    </div>
                    {txHash ? (
                        <div>
                            <div>
                            </div>
                            <div>
                                <Message type='info'>
                                    <span>Tx hash:</span>
                                    {txHash}
                                </Message>
                            </div>
                            <div className='confirmation-popup__buttons'>
                                <Button style={ { width: 250 } } color='turquoise' onClick={ hidePending }>
                                    Close window
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className='confirmation-popup__buttons'>
                            <Button style={ { width: 150 } } color='red' onClick={ rejectCallback }>REJECT</Button>
                            <Button style={ { width: 150 } } color='green' onClick={ approveCallback } disabled={insufficientFunds}>CONFIRM</Button>
                        </div>
                    )}
                </BlockRow>
            </Block>
        </span>
    </div>
);

export const TxDetailsContainer = ({ children }) => (
    <div className='tx-details-container'>
        {children}
    </div>
);

export default ConfirmationPopup;

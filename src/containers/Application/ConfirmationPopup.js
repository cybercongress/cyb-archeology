import React, { Component } from 'react';
import { connect } from 'react-redux';
import web3 from 'web3';
import ConfirmationPopup, {
    Address,
    ConfirmationPopupContent,
    PopupLabel,
    TxDetailsContainer,
    ConfirmationPopupButtons,
} from '../../components/ConfirmationPopup/ConfirmationPopup';
import { approve, reject, getDefaultAccountBalance, hidePending } from '../../redux/wallet';
import Input from '../../components/Input/Input';
import RequirePassword from './Login';
import Block, { BlockRow, Row } from '../../components/Settings/Block';
import CybLink from '../../components/CybLink';
import Button from '../../components/Button/Button';
import { Title, Message } from '@cybercongress/ui';


class ConfirmationPopupContainer extends Component {

    constructor(props) {
        super(props);

        const request = props.request;
        const utils = web3.utils;

        const from = request.params[0].from;
        const to = request.params[0].to;

        let gasLimit;
        let gasPrice;

        if (request.params[0].gas) {
            gasLimit = utils.hexToNumber(request.params[0].gas);
        }
        if (request.params[0].gasPrice) {
            gasPrice = utils.hexToNumber(request.params[0].gasPrice);
            // if (gasPrice < 1000000000) {
            //     gasPrice = 1000000000;
            // }
            gasPrice = web3.utils.fromWei(`${gasPrice}`, 'Gwei');
        }

        const value = request.params[0].value || 0;
        const amount = value ? utils.fromWei(value, 'ether') : 0;

        this.state = {
            from,
            to,
            amount,
            gasPrice,
            gasLimit,
            transactionInProgress: false
        };
    }

    approve = () => {
        const {
            gasLimit,
            gasPrice,
        } = this.state;
        this.setState({transactionInProgress: true})
        this.props.approve(gasLimit, web3.utils.toWei(gasPrice, 'Gwei'));
    };

    reject = () => {
        this.props.reject();
    };

    getTotalAmount = () => {
        const { utils } = web3;

        const {
            gasPrice,
            gasLimit,
            amount,
        } = this.state;

        let totalAmount = '0';

        try {
            totalAmount = utils
                .toBN(gasPrice)
                .mul(utils.toBN(gasLimit))
                .add(utils.toBN(utils.toWei(`${amount}`, 'ether')));
            totalAmount = utils.fromWei(totalAmount, 'ether');
        } catch (e) {
            console.log('Something wrong on total amount calculating');
        }

        return totalAmount;
    };

    gasPriceChange = (e) => {
        const { value } = e.target;

        // if ((!Number.isNaN(value) && +value >= 1) || value === '') {
        //     this.setState({
        //         gasPrice: value,
        //     });
        // } else {
        //     this.setState({
        //         gasPrice: 1,
        //     });
        // }

        this.setState({
                gasPrice: value,
            });
    };

    gasLimitChange = (e) => {
        const { value } = e.target;

        if (!Number.isNaN(value) && +value >= 21000) {
            this.setState({
                gasLimit: e.target.value,
            });
        } else {
            this.setState({
                gasLimit: 21000,
            });
        }
    };


    viewHash = (txHash) => {
        this.props.hidePending();
    }

    render() {

        if (!this.props.password) {
            return (
                <RequirePassword />
            );
        }

        const {
            from,
            to,
            gasLimit,
            gasPrice,
            amount,
            transactionInProgress,
        } = this.state;

        const {
            defaultAccountBalance,
            lastTransactionId,
            txError,
        } = this.props;

        const totalAmountN = this.getTotalAmount();
        const totalAmount = Number.parseFloat(totalAmountN).toFixed(10);
        const insufficientFunds = Number(totalAmountN) > Number(defaultAccountBalance);

        let messageComponent;
        if (insufficientFunds) {
            messageComponent = (
                <Row>
                    <Message type='error'>You have insufficient funds</Message>
                </Row>
            );
        }
        if (txError) {
            messageComponent = (
                <Row>
                    <Message type={txError.type}> { txError.message } </Message>
                </Row>
            );
        }

        const buttonsComponent = lastTransactionId ? (
                <div>
                    <div>
                    </div>
                    <div>
                        <Message type='info'>
                            <span>Tx hash:</span>
                            <CybLink dura={`${lastTransactionId}.eth`} onClick={this.viewHash}>{lastTransactionId}</CybLink>
                        </Message>
                    </div>
                    <ConfirmationPopupButtons>
                        <Button style={ { width: 250 } } color='turquoise' onClick={ () => this.props.hidePending() }>
                            Close window
                        </Button>
                    </ConfirmationPopupButtons>
                </div>
            ) : (
                <ConfirmationPopupButtons>
                    <Button style={ { width: 150 } } color='red' onClick={ this.reject }>REJECT</Button>
                    <Button style={ { width: 150 } } color='green' onClick={ this.approve } disabled={transactionInProgress || insufficientFunds || gasPrice === ''}>CONFIRM</Button>
                </ConfirmationPopupButtons>
            );


        return (
            <div>
                <ConfirmationPopup>
                    <Block>
                        <Title inline style={ { color: 'black' } }>Transaction confirmation</Title>
                        <BlockRow>
                            <ConfirmationPopupContent>
                                <Row>
                                    <PopupLabel>Sender address:</PopupLabel>
                                    <Address>{from}</Address>
                                </Row>
                                <Row>
                                    <PopupLabel>Recipient address:</PopupLabel>
                                    <Address>{to}</Address>
                                </Row>
                                <Row>
                                    <PopupLabel>Account balance (ETH):</PopupLabel>
                                    <Address>{defaultAccountBalance}</Address>
                                </Row>
                                <Row>
                                    <PopupLabel>Total amount (ETH):</PopupLabel>
                                    <Address>{totalAmount}</Address>
                                </Row>
                                {messageComponent}
                                <TxDetailsContainer>
                                    <span>
                                        <div className='popup-label'>Amount (ETH):</div>
                                        <Input
                                            value={ amount }
                                            style={ { width: 100 } }
                                            disabled
                                        />
                                    </span>
                                            <span>
                                        <div className='popup-label'>Gas price (GWEI):</div>
                                        <Input
                                            value={ gasPrice }
                                            style={ { width: 100 } }
                                            onChange={this.gasPriceChange}
                                        />
                                    </span>
                                            <span>
                                        <div className='popup-label'>Gas limit:</div>
                                        <Input
                                            value={ gasLimit }
                                            style={ { width: 100 } }
                                            onChange={this.gasLimitChange}
                                        />
                                    </span>
                                </TxDetailsContainer>
                            </ConfirmationPopupContent>
                            {buttonsComponent}
                        </BlockRow>
                    </Block>
                </ConfirmationPopup>
            </div>
        );
    }
}

export default connect(
    state => ({
        request: state.wallet.request,
        lastTransactionId: state.wallet.lastTransactionId,
        defaultAccountBalance: getDefaultAccountBalance(state),
        password: state.wallet.password,
        txError: state.wallet.txError,
    }),
    {
        approve,
        reject,
        hidePending,
    },
)(ConfirmationPopupContainer);

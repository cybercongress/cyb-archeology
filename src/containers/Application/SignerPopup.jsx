import React from 'react';
import { connect } from 'react-redux';
import web3 from 'web3';
import { Title, Message } from '@cybercongress/ui';

import Block, { BlockRow, Row } from '../../components/Settings/Block';
import ConfirmationPopup, {
    Address,
    ConfirmationPopupContent,
    PopupLabel,
    TxDetailsContainer,
    ConfirmationPopupButtons,
} from '../../components/ConfirmationPopup/ConfirmationPopup';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

import { getDefaultAccountBalance } from '../../redux/wallet';
import { approve, reject } from '../../redux/signer';

class SignerPopup extends React.Component {
    state = {
        gasPrice: 1,
        gasLimit: 210000,
        value: 0,
        transactionInProgress: false,
        error: '',
    }

    componentWillReceiveProps(nextProps) {
        const {
            isSignerPopup, gasPrice, gasLimit, value,
        } = nextProps;
        const { props } = this;

        if (isSignerPopup === true && props.isSignerPopup === false) {
            this.setState({
                gasPrice, gasLimit, value,
            });
        }

        if (nextProps.signerError !== props.signerError) {
            this.setState({
                error: nextProps.signerError,
            });
        }
    }

    reject = () => {
        const { props } = this;

        props.reject();
    }

    approve = () => {
        const { props } = this;
        const {
            gasLimit,
            gasPrice,
        } = this.state;

        props.approve(+gasPrice, +gasLimit);
    }

    gasPriceChange = (e) => {
        const { value } = e.target;

        if ((!Number.isNaN(value) && +value >= 1) || value === '') {
            this.setState({
                gasPrice: value,
            });
        }
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

    getTotalAmount = () => {
        const { utils } = web3;

        const {
            gasPrice,
            gasLimit,
            value,
        } = this.state;

        let totalAmount = '0';

        try {
            totalAmount = utils
                .toBN(utils.toWei(gasPrice, 'Gwei'))
                .mul(utils.toBN(gasLimit))
                .add(utils.toBN(utils.toWei(`${value}`, 'ether')));
            totalAmount = utils.fromWei(totalAmount, 'ether');
        } catch (e) {
            console.log('Something wrong on total amount calculating');
        }

        return totalAmount;
    };

    render() {
        const {
            isSignerPopup,
            toAddress, fromAddress,
            defaultAccountBalance,
        } = this.props;

        const {
            value, gasPrice, gasLimit,
            transactionInProgress,
            error,
        } = this.state;

        if (!isSignerPopup) {
            return null;
        }

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

        if (error) {
            messageComponent = (
                <Row>
                    <Message type='error'>{error}</Message>
                </Row>
            );
        }

        const canConfirm = !transactionInProgress && !insufficientFunds && gasPrice !== '';

        return (
            <ConfirmationPopup>
                <Block style={ { width: 470 } }>
                    <Title inline style={ { color: 'black' } }>Transaction confirmation</Title>
                    <BlockRow>
                        <ConfirmationPopupContent>
                            <Row>
                                <PopupLabel>Sender address:</PopupLabel>
                                <Address>{fromAddress}</Address>
                            </Row>
                            <Row>
                                <PopupLabel>Recipient address:</PopupLabel>
                                <Address>{toAddress}</Address>
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
                                      value={ value }
                                      style={ { width: 100 } }
                                      disabled
                                    />
                                </span>
                                <span>
                                    <div className='popup-label'>Gas price (GWEI):</div>
                                    <Input
                                      value={ gasPrice }
                                      style={ { width: 100 } }
                                      onChange={ this.gasPriceChange }
                                    />
                                </span>
                                <span>
                                    <div className='popup-label'>Gas limit:</div>
                                    <Input
                                      value={ gasLimit }
                                      style={ { width: 100 } }
                                      onChange={ this.gasLimitChange }
                                    />
                                </span>
                            </TxDetailsContainer>
                        </ConfirmationPopupContent>
                        <ConfirmationPopupButtons>
                            <Button style={ { width: 150 } } color='red' onClick={ this.reject }>REJECT</Button>
                            <Button style={ { width: 150 } } color='green' onClick={ this.approve } disabled={ !canConfirm }>CONFIRM</Button>
                        </ConfirmationPopupButtons>
                    </BlockRow>
                </Block>
            </ConfirmationPopup>
        );
    }
}


export default connect(
    state => ({
        defaultAccountBalance: getDefaultAccountBalance(state),

        isSignerPopup: state.signer.isSignerPopup,
        fromAddress: state.signer.fromAddress,
        toAddress: state.signer.toAddress,
        value: state.signer.value,
        gasPrice: state.signer.gasPrice,
        gasLimit: state.signer.gasLimit,
        signerError: state.wallet.signerError,
    }),
    { approve, reject },
)(SignerPopup);

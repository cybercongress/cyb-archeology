import React, { Component } from 'react';
import { connect } from 'react-redux';
import web3 from 'web3';
import ConfirmationPopup, { TxDetailsContainer } from '../../components/ConfirmationPopup/ConfirmationPopup';
import { approve, reject, getDefaultAccountBalance, hidePending } from '../../redux/wallet';
import Input from '../../components/Input/Input';
import RequirePassword from './RequirePassword';

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
            if (gasPrice < 1000000000) {
                gasPrice = 1000000000;
            }
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
        };
    }

    approve = () => {
        const {
            gasLimit,
            gasPrice,
        } = this.state;

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

        if (!Number.isNaN(value) && +value >= 1) {
            this.setState({
                gasPrice: value,
            });
        } else {
            this.setState({
                gasPrice: 1,
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
        } = this.state;

        const {
            defaultAccountBalance,
            lastTransactionId,
            txError,
        } = this.props;

        const totalAmount = Number.parseFloat(this.getTotalAmount()).toFixed(10);
        const insufficientFunds = Number(totalAmount) > Number(defaultAccountBalance);

        return (
            <div>
                <ConfirmationPopup
                    from={ from }
                    to={ to }
                    totalAmount={ totalAmount }
                    accountBalance={ defaultAccountBalance }
                    insufficientFunds={ insufficientFunds }
                    approveCallback={ this.approve }
                    rejectCallback={ this.reject }
                    hidePending={() => this.props.hidePending()}
                    txHash={ lastTransactionId }
                    txError={ txError }
                    content={ (
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
                    ) }
                />
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

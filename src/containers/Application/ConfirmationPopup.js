import React, {Component} from 'react';
import {connect} from "react-redux";
import ConfirmationPopup, {ApproveButton} from './../../components/ConfirmationPopup/ConfirmationPopup';
import {approve, reject} from './../../redux/wallet';
import Input from "../../components/Input/Input";
import {TxDetailsContainer} from "../../components/ConfirmationPopup/ConfirmationPopup";
import web3utils from 'web3-utils';


class ConfirmationPopupContainer extends Component {
    approve = () => {
        const gasLimit = this.gasLimit.value;
        const gasPrice = this.gasPrice.value;
        this.props.approve(gasLimit, gasPrice);
    };

    reject = () => {
        this.props.reject();
    };

    render() {
        const {
            pendingRequest,
            request,
        } = this.props;

        let _from;
        let _to;
        let _gasLimit;
        let _gasPrice;
        let _amount;


        if (request) {
            const value = request.params[0].value;
            _from = request.params[0].from;
            _to = request.params[0].to;
            _gasLimit = web3utils.hexToNumber(request.params[0].gas);
            _gasPrice = web3utils.hexToNumber(request.params[0].gasPrice);
            _amount = value ? web3utils.hexToNumber(value) : 0;
        }

        return (
            <div>
                {pendingRequest &&
                <ConfirmationPopup
                    from={_from}
                    to={_to}
                    approveCallback={this.approve}
                    rejectCallback={this.reject}
                    content={
                        <TxDetailsContainer>
                            <span>
                                <div className='popup-label'>Amount (ETH):</div>
                                <Input
                                    defaultValue={_amount}
                                    inputRef={node => {this.ethAmount = node}}
                                    style={{width: 100}}
                                />
                            </span>
                            <span>
                                <div className='popup-label'>Gas price (GWEI):</div>
                                <Input
                                    defaultValue={_gasPrice}
                                    inputRef={node => {this.gasPrice = node}}
                                    style={{width: 100}}
                                />
                            </span>
                            <span>
                                <div className='popup-label'>Gas limit:</div>
                                <Input
                                    defaultValue={_gasLimit}
                                    inputRef={node => {this.gasLimit = node}}
                                    style={{width: 100}}/>
                            </span>
                        </TxDetailsContainer>
                    }
                />
                }
            </div>
        )
    }
}

export default connect(
    state => ({
        pendingRequest: state.wallet.pendingRequest,
        request: state.wallet.request,
    }),
    {
        approve,
        reject,
    }
)(ConfirmationPopupContainer);


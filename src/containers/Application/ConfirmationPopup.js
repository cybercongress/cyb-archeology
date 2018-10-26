import React, { Component } from 'react';
import {connect} from "react-redux";
import ConfirmationPopup, {ApproveButton} from './../../components/ConfirmationPopup/ConfirmationPopup';
import {approve, reject} from './../../redux/wallet';


class ConfirmationPopupContainer extends Component {
    approve = () => {
        const gas = this.refs.gas.value;
        const gasPrice = this.refs.gasPrice.value;
        this.props.approve(gas, gasPrice);
    }

    reject = () => {
        this.props.reject();
    }

	render() {
		const {
            pendingRequest,
            request,
		} = this.props;

        let _from;
        let _to;
        if (request) {
            _from = request.params[0].from
            _to = request.params[0].to;
        }

		return (
			<div>
				{pendingRequest && <ConfirmationPopup
		              content={<div>  
		                <div>
		                gas limit: <input ref='gas' placeholder='gas' defaultValue={7200000}/>
		                gas price: <input ref='gasPrice' placeholder='gas price' defaultValue={12}/>
		                </div>
		                <div>
		                from:{_from}
		                </div>
		                <div>
		                to:{_to}
		                </div>
		            </div>}
		            >
		                <ApproveButton onClick={this.approve}>approve</ApproveButton>
		                <ApproveButton onClick={this.reject}>reject</ApproveButton>
		            </ConfirmationPopup>
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


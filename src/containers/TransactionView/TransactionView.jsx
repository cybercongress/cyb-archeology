import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTransaction } from '../../redux/wallet';
import ScrollContainer from '../../components/ScrollContainer/ScrollContainer';
import JsonView from '../../components/JsonView/JsonView';

class TransactionView extends Component {
    componentDidMount() {
        const { props } = this;
        const { params: { txHash } } = props;

        props.getTransaction(txHash);
    }

    render() {
        const { transaction, receipt } = this.props;

        return (
            <ScrollContainer>
                <h2>transaction</h2>
                <JsonView data={ transaction } />
                <JsonView data={ receipt } />
            </ScrollContainer>
        );
    }
}

export default connect(
    state => ({
        transaction: state.wallet.transaction,
        receipt: state.wallet.receipt,
    }),
    {
        getTransaction,
    },
)(TransactionView);

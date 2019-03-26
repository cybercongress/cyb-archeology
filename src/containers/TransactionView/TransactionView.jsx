import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    MainContainer, PageTitle, JsonView, ScrollContainer,
} from '@cybercongress/ui';
import { getTransaction } from '../../redux/wallet';
// import ScrollContainer from '../../components/ScrollContainer/ScrollContainer';
// import JsonView from '../../components/JsonView/JsonView';

class TransactionView extends Component {
    componentDidMount() {
        const { props } = this;
        const {
            params: { txHash },
        } = props;

        props.getTransaction(txHash);
    }

    render() {
        const { transaction, receipt } = this.props;

        return (
            <ScrollContainer>
                <MainContainer>
                    <PageTitle>transaction</PageTitle>
                    <JsonView data={ transaction } />
                    <JsonView data={ receipt } />
                </MainContainer>
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

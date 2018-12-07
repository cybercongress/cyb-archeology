import React, { Component } from 'react';
import { Title } from '@cybercongress/ui';
import { connect } from 'react-redux';
import moment from 'moment';

import { getTransactions, resend } from '../../redux/wallet';
import CybLink from '../../components/CybLink';

import RootRegistry, { Table } from '../../components/RootRegistry/RootRegistry';
import { Hash } from '../../components/TxQueue/TxQueue';


class TxQueue extends Component {
    componentDidMount() {
        this.props.getTransactions(this.props.defaultAccount);
    }

    resend = (txHash) => {
        this.props.resend(txHash);
    }

    render() {
        const { transactions } = this.props;

        return (
            <RootRegistry>
                <Title>/transaction</Title>
                <Table>
                    <thead>
                        <tr>
                            <th>type</th>
                            <th>hash</th>
                            <th>date</th>
                            <th>status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {transactions.map(item => (
                        <tr key={item.txHash}>
                            <td>
                                {item.type}
                            </td>
                            <td>
                                {
                                    item.type === 'eth' ? (
                                        <CybLink dura={`${item.txHash}.eth`}>
                                            <Hash>{item.txHash}</Hash>
                                        </CybLink>
                                    ) : (
                                        <Hash>{item.txHash}</Hash>
                                    )
                                }                                
                            </td>
                            <td>
                                {moment(item.date).format('D/MM YYYY h:mm:ss')}
                            </td>
                            <td>
                                pending
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </RootRegistry>
        );
    }
}

export default connect(
    state => ({
        transactions: state.wallet.transactions,
        defaultAccount: state.wallet.defaultAccount,
    }),
    {
        getTransactions,
        resend,
    },
)(TxQueue);

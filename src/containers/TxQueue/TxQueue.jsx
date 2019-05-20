import React, { Component } from 'react';
import {
    //    Title,
    PageTitle,
    TableEv as Table,
    MainContainer,
    Hash,
    IconButton,
    Pane,
    ScrollContainer,
    Pill,
} from '@cybercongress/ui';
import { connect } from 'react-redux';
import moment from 'moment';

import Loader from 'react-loader-spinner';
import { getTransactions, resend } from '../../redux/wallet';
import CybLink from '../../components/CybLink';

class TxQueue extends Component {
    componentDidMount() {
        this.props.getTransactions(this.props.defaultAccount);
    }

    resend = (txHash) => {
        this.props.resend(txHash);
    };

    render() {
        const { transactions } = this.props;

        const rows = transactions.map((item, index) => (
            <Table.Row borderBottom='none' isSelectable key={ index }>
                <Table.TextCell width={ 32 } flex='none'>
                    {item.type === 'eth' && (
                        <Pill
                            height={ 7 }
                            width={ 7 }
                            borderRadius='50%'
                            paddingX={ 0 }
                            isSolid
                            color={
                                item.status === 'success'
                                    ? 'green'
                                    : (item.status === 'error' || item.status === 'cancelled')
                                    ? 'red'
                                    : 'yellow'
                            }
                        />
                    )}
                </Table.TextCell>
                <Table.TextCell textTransform='uppercase'>
                    <span style={ { color: '#fff', fontSize: 16 } }>{item.type}</span>
                </Table.TextCell>
                <Table.TextCell flexGrow={ 3 }>
                    {item.type === 'eth' ? (
                        <CybLink style={ { color: '#4a90e2' } } dura={ `${item.txHash}.eth` }>
                            <Hash style={ { width: '100%' } }>{item.txHash}</Hash>
                        </CybLink>
                    ) : (
                        <Hash style={ { width: '100%', color: '#fff' } }>{item.txHash}</Hash>
                    )}
                </Table.TextCell>
                <Table.TextCell textAlign='end'>
                    <span style={ { color: '#fff', fontSize: 16 } }>
                        {moment(item.date).format('D/MM YYYY h:mm:ss')}
                    </span>
                </Table.TextCell>
                <Table.TextCell width={ 66 } flex='none'>
                    {item.canResend && (
                        <Pane paddingY={ 5 } paddingX={ 5 } width='100%'>
                            <IconButton
                                appearance='minimal'
                                className='icon-btn color-white-svg'
                                icon='refresh'
                                onClick={ () =>this.resend(item.txHash) }
                            />
                        </Pane>
                    )}
                </Table.TextCell>
            </Table.Row>
        ));

        return (
            <ScrollContainer>
                <MainContainer>
                    <Table>
                        <Table.Head
                            style={ { backgroundColor: '#000', borderBottom: '1px solid #ffffff80' } }>
                            <Table.TextCell width={ 32 } flex='none' />
                            <Table.TextHeaderCell>
                                <span style={ { color: '#fff', fontSize: 16 } }>Type</span>
                            </Table.TextHeaderCell>
                            <Table.TextHeaderCell flexGrow={ 3 }>
                                <span style={ { color: '#fff', fontSize: 17 } }>Hash</span>
                            </Table.TextHeaderCell>
                            <Table.TextHeaderCell textAlign='end'>
                                <span style={ { color: '#fff', fontSize: 17 } }>Date</span>
                            </Table.TextHeaderCell>
                            <Table.TextCell flex='none' width={ 66 } />
                        </Table.Head>
                        <Table.Body style={ { backgroundColor: '#000', overflowY: 'hidden' } }>
                            {rows}
                        </Table.Body>
                    </Table>
                </MainContainer>
            </ScrollContainer>
        );
    }
}

// class TxQueue extends Component {
//     componentDidMount() {
//         this.props.getTransactions(this.props.defaultAccount);
//     }
//
//     resend = (txHash) => {
//         this.props.resend(txHash);
//     };
//
//     render() {
//         const { transactions } = this.props;
//
//         return (
//             <ScrollContainer>
//                 <MainContainer>
//                 <PageTitle>/transaction</PageTitle>
//                 <Table>
//                     <thead>
//                         <tr>
//                             <th>type</th>
//                             <th>hash</th>
//                             <th>date</th>
//                             <th>status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                     {transactions.map(item => (
//                         <tr key={item.txHash}>
//                             <td>
//                                 {item.type}
//                             </td>
//                             <td>
//                                 {
//                                     item.type === 'eth' ? (
//                                         <CybLink dura={`${item.txHash}.eth`}>
//                                             <Hash>{item.txHash}</Hash>
//                                         </CybLink>
//                                     ) : (
//                                         <Hash>{item.txHash}</Hash>
//                                     )
//                                 }
//                             </td>
//                             <td>
//                                 {moment(item.date).format('D/MM YYYY h:mm:ss')}
//                             </td>
//                             <td>
//                                 {
//                                     item.type === 'eth' && item.status === 'pending' ? (
//                                         <div>
//                                             <Loader type='Watch' color='#438cef' height={ 27 } width={ 27 } style={ 'TxQueue_spinner' } />
//                                         { item.canResend ? (
//                                             <Button onClick={ () => this.resend(item.txHash) }>resend</Button>
//                                         ) : '' }
//                                         </div>
//                                     ) : (
//                                         item.status
//                                     )
//                                 }
//                             </td>
//                         </tr>
//                     ))}
//                     </tbody>
//                 </Table>
//                 </MainContainer>
//             </ScrollContainer>
//         );
//     }
// }

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

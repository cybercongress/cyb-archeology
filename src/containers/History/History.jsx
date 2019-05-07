import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    PageTitle, ScrollContainer, MainContainer, TableEv,
} from '@cybercongress/ui';
import moment from 'moment';

import CybLink from '../../components/CybLink';
// import ScrollContainer from '../../components/ScrollContainer/ScrollContainer';
// import TableEv from '../../components/TableEv/TableEv';

class History extends Component {
    renderItem = (item, index) => {
        const { dura, date } = item;
        let content = <CybLink style={{color: '#1976d2'}} dura={ dura }>{dura}</CybLink>;

        if (dura === 'history.cyb') {
            content = <span>{dura}</span>;
        }

        return (
            <TableEv.Row paddingLeft={ 20 } isSelecTableEv key={ index }>
                <TableEv.TextCell>{content}</TableEv.TextCell>
                <TableEv.TextCell width={160} flex='none' alginItems='center' isNumber>{moment(date).format('D/MM YYYY h:mm:ss')}</TableEv.TextCell>
            </TableEv.Row>
        );
    };

    render() {
        const { history } = this.props;

        const historyWithoutLast = history.slice(0, history.length - 1);

        historyWithoutLast.reverse();

        return (
            <ScrollContainer>
            <MainContainer>
                    <TableEv>
                        <TableEv.Head paddingLeft={ 20 }>
                                <TableEv.TextHeaderCell>Dura</TableEv.TextHeaderCell>
                                <TableEv.TextHeaderCell textAlign='center' width={160} flex='none'>Date</TableEv.TextHeaderCell>
                        </TableEv.Head>
                        <TableEv.Body style={ { backgroundColor: '#fff', overflowY: 'hidden' } }>{historyWithoutLast.map(this.renderItem)}</TableEv.Body>
                    </TableEv>
            </MainContainer>
            </ScrollContainer>
        );
    }
}

export default connect(state => ({
    history: state.browser.history,
}))(History);

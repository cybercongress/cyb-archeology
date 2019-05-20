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
        let content = (
            <CybLink style={ { color: '#1e86ff' } } dura={ dura }>
                {dura}
            </CybLink>
        );

        if (dura === 'history.cyb') {
            content = <span>{dura}</span>;
        }

        return (
            <TableEv.Row borderBottom='none' paddingLeft={ 20 } isSelectable key={ index }>
                <TableEv.TextCell>
                    <span style={ { color: '#fff', fontSize: '16px' } }>{content}</span>
                </TableEv.TextCell>
                <TableEv.TextCell width={ 200 } flex='none' textAlign='end' isNumber>
                    <span style={ { color: '#fff', fontSize: '16px' } }>
                        {moment(date).format('D/MM YYYY h:mm:ss')}
                    </span>
                </TableEv.TextCell>
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
                        <TableEv.Head
                          style={ { backgroundColor: '#000', borderBottom: '1px solid #ffffff80' } }
                          paddingLeft={ 20 }
                        >
                            <TableEv.TextHeaderCell>
                                <span style={ { color: '#fff', fontSize: '17px' } }>Dura</span>
                            </TableEv.TextHeaderCell>
                            <TableEv.TextHeaderCell textAlign='end' width={ 200 } flex='none'>
                                <span style={ { color: '#fff', fontSize: '17px' } }>Date</span>
                            </TableEv.TextHeaderCell>
                        </TableEv.Head>
                        <TableEv.Body style={ { backgroundColor: '#000', overflowY: 'hidden' } }>
                            {historyWithoutLast.map(this.renderItem)}
                        </TableEv.Body>
                    </TableEv>
                </MainContainer>
            </ScrollContainer>
        );
    }
}

export default connect(state => ({
    history: state.browser.history,
}))(History);

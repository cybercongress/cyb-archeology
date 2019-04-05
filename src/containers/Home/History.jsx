import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Title } from '@cybercongress/ui';
import moment from 'moment';

import CybLink from '../../components/CybLink';
import ScrollContainer from '../../components/ScrollContainer/ScrollContainer';
import Table from '../../components/Table/Table';

class History extends Component {
    renderItem = (item, index) => {
        const { dura, date } = item;
        let content = (
            <CybLink dura={ dura }>{dura}</CybLink>
        );

        if (dura === 'history.cyb') {
            content = (
                <span>
                    {dura}
                </span>
            );
        }

        return (
            <tr key={ index }>
                <td>{content}</td>
                <td>{moment(date).format('D/MM YYYY h:mm:ss')}</td>
            </tr>
        );
    }

    render() {
        const { history } = this.props;

        const historyWithoutLast = history.slice(0, history.length - 1);

        historyWithoutLast.reverse();

        return (
            <ScrollContainer>
                <Title>/History</Title>
                <table>
                    <thead>
                        <tr>
                            <th>Address</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historyWithoutLast.map(this.renderItem)}
                    </tbody>
                </table>
            </ScrollContainer>
        );
    }
}

export default connect(
    state => ({
        history: state.browser.history,
    }),
)(History);

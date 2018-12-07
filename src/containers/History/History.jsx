import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Title } from '@cybercongress/ui';
import moment from 'moment';

import CybLink from '../../components/CybLink';
import RootRegistry, { Table } from '../../components/RootRegistry/RootRegistry';

class History extends Component {
    renderItem = (item, index) => {
        const { dura, date } = item;
        let content = (
            <CybLink dura={dura}>{dura}</CybLink>
        );

        if (dura === 'history.cyb') {
            content = (
                <span>
                    {dura}
                </span>
            );
        }

        return (
            <tr key={index}>
                <td>{content}</td>
                <td>{moment(date).format('D/MM YYYY h:mm:ss')}</td>
            </tr>
        );
    }

    render() {
        const { history } = this.props;
        console.log(history);

        const _history = history.slice(0, history.length - 1);

        _history.reverse();

        return (
            <RootRegistry>
                <Title>/History</Title>
                <Table>
                    <thead>
                        <tr>
                            <th>Address</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {_history.map(this.renderItem)}
                    </tbody>
                </Table>
            </RootRegistry>
        );
    }
}

export default connect(
    state => ({
        history: state.browser.history,
    }),
)(History);

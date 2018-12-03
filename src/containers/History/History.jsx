import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Title } from '@cybercongress/ui';

import CybLink from '../../components/CybLink';
import RootRegistry, { Table } from '../../components/RootRegistry/RootRegistry';


class History extends Component {
    renderItem = (dura, index) => {
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
                <td>7/2/2018 17:33:12</td>
            </tr>
        );
    }

    render() {
        const { history } = this.props;
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

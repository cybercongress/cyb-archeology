import React from 'react';
import { connect } from 'react-redux';

import Indecator, { StatusContainer } from './../../components/Indecator/Indecator';

const Status = ({ pending, ipfsStatus, ethNodeStatus, cyberNodeStatus }) => (
	<StatusContainer>
        <Indecator status={pending ? null : ipfsStatus}>ipfs</Indecator>
        <Indecator status={pending ? null : ethNodeStatus}>eth</Indecator>
        <Indecator status={pending ? null : cyberNodeStatus}>cyber</Indecator>
    </StatusContainer>
);

export default connect(
	state => ({
		ipfsStatus: state.settings.ipfsStatus,
		ethNodeStatus: state.settings.ethNodeStatus,
		cyberNodeStatus: state.settings.cyberNodeStatus,
		pending: state.settings.pending,
	})
)(Status);
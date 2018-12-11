import React from 'react';
import { connect } from 'react-redux';

import Indicator, { StatusContainer } from '../../components/Indicator/Indicator';

const Status = ({
    pending, ipfsStatus,
    ethNodeStatus, cyberNodeStatus, ethNetworkName,
    IPFS_END_POINT,
    PARITTY_END_POINT,
    SEARCH_END_POINT,
}) => {
    const ipfsContent = ipfsStatus !== 'fail' ? (
        <div>
            <div>{IPFS_END_POINT}</div>
        </div>
    ) : (
        <div>
            No connection
        </div>
    );

    const ethContent = ethNodeStatus !== 'fail' ? (
        <div>
            <div>{ethNetworkName}</div>
            <hr />
            <div>{PARITTY_END_POINT}</div>
        </div>
    ) : (
        <div>
            No connection
        </div>
    );


    const cyberContent = cyberNodeStatus !== 'fail' ? (
        <div>
            <div>{SEARCH_END_POINT}</div>
        </div>
    ) : (
        <div>
            No connection
        </div>
    );


    return (
        <StatusContainer>
            <Indicator
              tooltipContent={ ipfsContent }
              status={ pending ? null : ipfsStatus }
            >
                ipfs
            </Indicator>
            <Indicator
              tooltipContent={ ethContent }
              status={ pending ? null : ethNodeStatus }
            >
                eth
            </Indicator>
            <Indicator
              tooltipContent={ cyberContent }
              status={ pending ? null : cyberNodeStatus }
            >
                cyber
            </Indicator>
        </StatusContainer>
    );
};

export default connect(
    state => ({
        ipfsStatus: state.settings.ipfsStatus,
        ethNodeStatus: state.settings.ethNodeStatus,
        cyberNodeStatus: state.settings.cyberNodeStatus,
        pending: state.settings.pending,
        ethNetworkName: state.settings.ethNetworkName,


        IPFS_END_POINT: state.settings.IPFS_END_POINT,
        PARITTY_END_POINT: state.settings.PARITTY_END_POINT,
        SEARCH_END_POINT: state.settings.SEARCH_END_POINT,
    }),
)(Status);

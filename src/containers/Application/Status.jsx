import React from 'react';
import { connect } from 'react-redux';

/*import {
    StatusContainer,
    Indicator,
} from '@cybercongress/ui';*/

import Indicator, { StatusContainer } from '../../components/Indicator/Indicator';

const NoConnection = ({ status, children }) => {
    if (status === 'fail') {
        return (
            <div>
                No connection
            </div>
        );
    }

    return (
        <div>
            {children}
        </div>
    );
};

const Status = ({
    pending, ipfsStatus,
    ethNodeStatus, cyberNodeStatus, ethNetworkName,
    IPFS_END_POINT,
    PARITTY_END_POINT,
    SEARCH_END_POINT,
    cyberNetwork,
    homePage,
}) => {
    if (homePage) {
        return null;
    }

    const ipfsContent = (
        <NoConnection status={ ipfsStatus }>
            <div>{IPFS_END_POINT}</div>
        </NoConnection>
    );

    const ethContent = (
        <NoConnection status={ ethNodeStatus }>
            <div>{ethNetworkName}</div>
            <hr />
            <div>{PARITTY_END_POINT}</div>
        </NoConnection>
    );


    const cyberContent = (
        <NoConnection status={ cyberNodeStatus }>
            <div>{cyberNetwork}</div>
            <hr />
            <div>{SEARCH_END_POINT}</div>
        </NoConnection>
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
        homePage: state.browser.dura === '',
        ipfsStatus: state.settings.ipfsStatus,
        ethNodeStatus: state.settings.ethNodeStatus,
        cyberNodeStatus: state.settings.cyberNodeStatus,
        pending: state.settings.pending,
        ethNetworkName: state.settings.ethNetworkName,


        IPFS_END_POINT: state.settings.IPFS_END_POINT,
        PARITTY_END_POINT: state.settings.PARITTY_END_POINT,
        SEARCH_END_POINT: state.settings.SEARCH_END_POINT,

        cyberNetwork: state.settings.cyberNetwork,
    }),
)(Status);

import React from 'react';
import {
    HelloContainerLeftCol,
    HelloContainerRightCol,
    HelloContainerRightColContent,
    Pane,
    BigImg,
    TextEv as Text,
    Eth,
    GCyb,
} from '@cybercongress/ui';
import { connect } from 'react-redux';
import { getDefaultAccountBalance as getEthBalance } from '../../redux/wallet';
import { getDefaultAccountBalance as getCyberdBalance } from '../../redux/cyber';

const idRobot = require('../Hello/img/idrobot.png');

class Wallet extends React.Component {
    render() {
        const { ethAddress, ethBalance, cyberdAddress, cyberdBalance } = this.props;

        return (
            <Pane
    height='100%'
    maxWidth={1200}
    marginX='auto'
>


            <Pane
                height='100%'
                display='grid'
                gridTemplateColumns='1fr 1fr'
                gridGap='1em'
                paddingX='1em'
            >
                <HelloContainerLeftCol>
                    <BigImg srcBigImg={ idRobot } />
                </HelloContainerLeftCol>
                <HelloContainerRightCol>
                    <HelloContainerRightColContent>
                        <Pane display='flex' flexDirection='column' alignItems='flex-start'>
                            <Pane
                                marginBottom={ 40 }
                                display='flex'
                                flexDirection='column'
                                alignItems='flex-start'
                            >
                                <Pane
                                    alignItems='center'
                                    display='flex'
                                    flexDirection='row'
                                    marginBottom={ 10 }
                                >
                                    <Text
                                        display='inline-block'
                                        marginRight={ 13 }
                                        color='#fff'
                                        fontSize='24px'
                                    >
                                        {ethBalance}
                                    </Text>
                                    <Pane display='flex' alignItems='center'>
                                        <Eth />
                                        <Eth />
                                    </Pane>
                                </Pane>
                                <Text fontSize='14px' color='#d1d1d1'>
                                    {ethAddress}
                                </Text>
                            </Pane>
                            <Pane display='flex' flexDirection='column' alignItems='flex-start'>
                                <Pane
                                    display='flex'
                                    alignItems='center'
                                    flexDirection='row'
                                    marginBottom={ 10 }
                                >
                                    <Text
                                        display='inline-block'
                                        marginRight={ 13 }
                                        color='#fff'
                                        fontSize='24px'
                                    >
                                        {cyberdBalance}
                                    </Text>
                                    <Pane display='flex' alignItems='center'>
                                        <GCyb />
                                        <GCyb />
                                        <GCyb />
                                        <GCyb />
                                    </Pane>
                                </Pane>
                                <Text fontSize='14px' color='#d1d1d1'>
                                    {cyberdAddress}
                                </Text>
                            </Pane>
                        </Pane>
                    </HelloContainerRightColContent>
                </HelloContainerRightCol>
            </Pane>
            </Pane>
        );
    }
}

export default connect(state => ({
    ethAddress: state.wallet.defaultAccount,
    ethBalance: getEthBalance(state),

    cyberdAddress: state.cyber.defaultAccount,
    cyberdBalance: getCyberdBalance(state),
}))(Wallet);

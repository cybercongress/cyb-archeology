import React from 'react';
import {
    HelloContainerLeftCol, HelloContainer, HelloContainerRightCol,
    HelloContainerRightColContent, TextIlineBlock, HelloContainerRightColBtn,
    ButtonEverGreen, SlallImgText, BntGroup,
} from '@cybercongress/ui';
import connect from 'react-redux/es/connect/connect';
import ConnectionsContainer from '../Settings/ConnectionsContainer';

const cybEye = require('./img/eye.jpg');

class Connections extends React.Component {
    render() {
        const {
            ipfsStatus,
            ipfsWriteStatus,

            cyberdStatus,
            cyberdWsStatus,

            ethStatus,
        } = this.props;

        const disableSaveButton = ipfsStatus === 'fail' || ipfsWriteStatus === 'fail'
            || ethStatus === 'fail' || cyberdStatus === 'fail' || cyberdWsStatus === 'fail';

        return (
            <HelloContainer>
                <HelloContainerLeftCol>
                    <SlallImgText imgCyb={ cybEye }>
                        <TextIlineBlock>
                            This is your connection state. You can change it, if you want.
                        </TextIlineBlock>
                    </SlallImgText>
                </HelloContainerLeftCol>
                <HelloContainerRightCol bntGroup={ <BntGroup /> }>
                    <HelloContainerRightColContent>
                        <ConnectionsContainer />
                    </HelloContainerRightColContent>
                    <HelloContainerRightColBtn center>
                        <ButtonEverGreen
                            disabled={ disableSaveButton }
                            onClick={ this.props.onNext }
                        >
                            Save settings
                        </ButtonEverGreen>
                    </HelloContainerRightColBtn>
                </HelloContainerRightCol>
            </HelloContainer>
        );
    }
}

export default connect(({ settings }) => ({
    ipfsStatus: settings.ipfsStatus,
    ipfsWriteStatus: settings.ipfsWriteStatus,

    cyberdStatus: settings.cyberdStatus,
    cyberdWsStatus: settings.cyberdWsStatus,

    ethStatus: settings.ethStatus,
}), null)(Connections);

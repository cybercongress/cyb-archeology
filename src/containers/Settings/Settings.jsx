import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Pane,
    HelloContainerLeftCol,
    BigImg,
    HelloContainerRightCol,
    HelloContainerRightColContent,
    HelloContainer,
} from '@cybercongress/ui';
import { exportSettings, resetAllSettings } from '../../redux/settings';
import ConnectionsContainer from './ConnectionsContainer';
import { downloadObjectAsJson } from '../../utils';

const idRobot = require('../Hello/img/idrobot.png');

class Settings extends Component {
    onExportSettings = () => {
        const settings = this.props.exportSettings();

        downloadObjectAsJson(settings, 'cyb_settings');
    };

    render() {
        return (
            <HelloContainer height='calc(100% - 60px)' marginTop={ 60 }>
                <HelloContainerLeftCol>
                    <BigImg srcBigImg={ idRobot } />
                </HelloContainerLeftCol>

                <HelloContainerRightCol>
                    <HelloContainerRightColContent>
                        <ConnectionsContainer />
                        <Pane
                          width='100%'
                          display='flex'
                          justifyContent='space-between'
                          marginTop='2em'
                        >
                            <Button className='btn' onClick={ this.onExportSettings }>
                                EXPORT SETTINGS
                            </Button>
                            <Button className='btn' onClick={ this.props.resetAllSettings }>
                                RESET SETTINGS
                            </Button>
                        </Pane>
                    </HelloContainerRightColContent>
                </HelloContainerRightCol>
            </HelloContainer>
        );
    }
}

export default connect(
    ({ settings }) => ({}),
    {
        resetAllSettings,
        exportSettings,
    },
)(Settings);

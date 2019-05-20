import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Pane,
    HelloContainerLeftCol,
    BigImg,
    HelloContainerRightCol,
    HelloContainerRightColContent,
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
            <Pane
                height='100%'
                paddingX='10em'
                display='grid'
                gridTemplateColumns='1fr 1fr'
                gridGap='1em'
            >
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
                            marginTop={10}
                        >
                            <Button
                                className='btn'
                                onClick={ this.onExportSettings }
                            >
                                EXPORT SETTINGS
                            </Button>
                            <Button
                                className='btn'
                                onClick={ this.props.resetAllSettings }
                            >
                                RESET SETTINGS
                            </Button>
                        </Pane>
                    </HelloContainerRightColContent>
                </HelloContainerRightCol>
            </Pane>
        );
    }
}

export default connect(({ settings }) => ({}), {
    resetAllSettings,
    exportSettings,
})(Settings);

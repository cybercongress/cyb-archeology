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
            <div>
                <HelloContainer
                  customClassContainer='connectionContainer'
                  customClassGrig='connectionContainerGrid'
                >
                    <HelloContainerLeftCol customClass='connectionContainer-left-col'>
                        <BigImg srcBigImg={ idRobot } />
                    </HelloContainerLeftCol>

                    <HelloContainerRightCol>
                        <HelloContainerRightColContent customClass='connectionContainer-right-col-content'>
                            <ConnectionsContainer />
                            {/* <Pane
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
                            </Pane> */}
                        </HelloContainerRightColContent>
                    </HelloContainerRightCol>
                </HelloContainer>
                <Pane
                  className='connectionContainer-footer'
                  display='flex'
                  position='absolute'
                  bottom={ 0 }
                  paddingY={ 20 }
                  width='100%'
                  justifyContent='center'
                  alignItems='center'
                  zIndex={ 2 }
                  backgroundColor='#000'
                >
                    <Pane
                      maxWidth={ 1000 }
                      display='flex'
                      alignItems='center'
                      justifyContent='center'
                      flexDirection='row'
                      paddingX='3vw'
                      className='connectionContainer-footer-container'
                    />
                    <Button
                      paddingX={ 30 }
                      marginX={ 10 }
                      fontSize='14px'
                      className='btn'
                      onClick={ this.onExportSettings }
                    >
                        EXPORT SETTINGS
                    </Button>
                    <Button
                      paddingX={ 30 }
                      marginX={ 10 }
                      fontSize='14px'
                      className='btn'
                      onClick={ this.props.resetAllSettings }
                    >
                        RESET SETTINGS
                    </Button>
                </Pane>
            </div>
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

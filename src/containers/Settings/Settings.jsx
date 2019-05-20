import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ScrollContainer,
    FlexContainer,
    FlexContainerLeft,
    FlexContainerRight,
    MainContainer,
    Section,
    Button,
} from '@cybercongress/ui';
import { exportSettings, resetAllSettings } from '../../redux/settings';
import ConnectionsContainer from './ConnectionsContainer';
import { downloadObjectAsJson } from '../../utils';

class Settings extends Component {
    onExportSettings = () => {
        const settings = this.props.exportSettings();

        downloadObjectAsJson(settings, 'cyb_settings');
    };

    render() {
        return (
            <ScrollContainer>
                <MainContainer>
                    <Section>
                        <ConnectionsContainer />
                    </Section>

                    <FlexContainer>
                        <FlexContainerLeft>
                            <Button
                              className='btn'
                              onClick={ this.onExportSettings }
                            >
                                EXPORT SETTINGS
                            </Button>
                        </FlexContainerLeft>
                        <FlexContainerRight style={ { paddingRight: 20 } }>
                            <Button
                              className='btn'
                              onClick={ this.props.resetAllSettings }
                            >
                                RESET SETTINGS
                            </Button>
                        </FlexContainerRight>
                    </FlexContainer>
                </MainContainer>
            </ScrollContainer>
        );
    }
}

export default connect(({ settings }) => ({}), {
    resetAllSettings,
    exportSettings,
})(Settings);

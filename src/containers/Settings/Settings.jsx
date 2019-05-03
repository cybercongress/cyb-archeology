import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ScrollContainer,
    FlexContainer,
    FlexContainerLeft,
    FlexContainerRight,
    MainContainer,
    Section,
    PageTitle,
    Button,
} from '@cybercongress/ui';
import CybLink from '../../components/CybLink';
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
                    <PageTitle>Settings</PageTitle>
                    <Section>
                        <ConnectionsContainer />
                    </Section>

                    <FlexContainer>
                        <FlexContainerLeft>
                            <CybLink dura='rr.cyb'>
                                <Button color='greenyellow'>
                                    CYB ROOT REGISTRY
                                </Button>
                            </CybLink>
                        </FlexContainerLeft>
                        <FlexContainerRight style={ { paddingRight: 20 } }>
                            <Button color='blue' onClick={ this.onExportSettings }>
                                EXPORT SETTINGS
                            </Button>
                            <Button color='blue' onClick={ this.props.resetAllSettings }>
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

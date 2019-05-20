import React from 'react';
import { connect } from 'react-redux';
import {
    App,
    AppHeader,
    AppContent,
    AppSideBar,
    Navigation,
    NavigationLeft,
    NavigationRight,
    NavigationCenter,
    SkillBar,
    Pane,
    Text,
} from '@cybercongress/ui';
import { toggleMenu as toggleMenuAction } from '../../redux/appMenu';

// import App, {
//     AppHeader, AppContent, AppSideBar,
// } from '../../components/App/App';
// import Navigation, {
//     NavigationLeft, NavigationRight, NavigationCenter,
// } from '../../components/Navigation/Navigation';

import IdBar from './IdBar';
import AppMenu from './AppMenu';
// import Status from './Status';
import NavigationComponents from './Navigation';
import ToggleMenu from './ToggleMenu';
import SignerPopup from './SignerPopup';
import Intro from './Intro';

const Application = (props) => {
    const {
        homePage, openMenu, children, toggleMenu, defaultEthAccount, showIntro,
    } = props;

    if (showIntro) {
        return (
            <Intro />
        );
    }

    const ContenTooltip = ({ bwRemained, bwMaxValue, linkPrice }) => (
        <Pane minWidth={ 200 } paddingX={ 18 } paddingY={ 14 } borderRadius={ 4 } backgroundColor='#fff'>
            <Pane marginBottom={ 12 }>
                <Text size={ 300 }>
                    You have
                    {' '}
                    {bwRemained}
                    {' '}
BP out of
                    {' '}
                    {bwMaxValue}
                    {' '}
BP.
                </Text>
            </Pane>
            <Pane marginBottom={ 12 }>
                <Text size={ 300 }>
                    Full regeneration of bandwidth points or BP happens in 24 hours.
                </Text>
            </Pane>
            <Pane display='flex' marginBottom={ 12 }>
                <Text size={ 300 }>
Current rate for 1 cyberlink is
                    {linkPrice}
                    {' '}
BP.
                </Text>
            </Pane>
        </Pane>
    );

    return (
        <App openMenu={ openMenu }>
            <SignerPopup />
            {/* <Status /> */}
            <AppSideBar onCloseSidebar={ toggleMenu } openMenu={ openMenu }>
                <AppMenu />
            </AppSideBar>
            <AppHeader isHome={ homePage } isMenuOpen={ openMenu }>
                <Navigation isHome={ homePage }>
                    <NavigationLeft>
                        <ToggleMenu />
                    </NavigationLeft>
                    <NavigationCenter>
                        <NavigationComponents />
                    </NavigationCenter>
                    <NavigationRight>
                        <Pane display='flex' alignItems='center'>
                            {defaultEthAccount && (
                                <SkillBar maxHeight={ 16 } minWidth={ 100 } bwPercent={10} contentTooltip={ <ContenTooltip /> } />
                            )}
                            <IdBar />
                        </Pane>
                    </NavigationRight>
                </Navigation>
            </AppHeader>
            <AppContent>{children}</AppContent>
        </App>
    );
};

export default connect(
    state => ({
        homePage: state.browser.dura === '',
        openMenu: state.appMenu.openMenu,
        defaultEthAccount: state.wallet.defaultAccount,
        showIntro: state.intro.showIntro,
    }),
    { toggleMenu: toggleMenuAction },
)(Application);

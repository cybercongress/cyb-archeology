import React from 'react';
import { connect } from 'react-redux';
import {
    App,
    AppHeader, AppContent, AppSideBar,
    Navigation,
    NavigationLeft, NavigationRight, NavigationCenter,
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
import Status from './Status';
import NavigationComponents from './Navigation';
import ToggleMenu from './ToggleMenu';
import SignerPopup from './SignerPopup';

const Application = (props) => {
    const {
        homePage,
        openMenu,
        children,
        toggleMenu,
    } = props;

    return (
        <App openMenu={ openMenu }>
            <SignerPopup />
            <Status />
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
                        <IdBar />
                    </NavigationRight>
                </Navigation>
            </AppHeader>
            <AppContent>
                {children}
            </AppContent>
        </App>
    );
};

export default connect(
    state => ({
        homePage: state.browser.dura === '',
        openMenu: state.appMenu.openMenu,
    }),
    { toggleMenu: toggleMenuAction },
)(Application);

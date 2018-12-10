import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/appMenu';
import App, { AppHeader, AppContent } from '../../components/App/App';
import Navigation, {
    NavigationLeft, NavigationRight, NavigationCenter, MenuButton,
} from '../../components/Navigation/Navigation';
import IdBar from '../../components/IdBar/IdBar';
import ReportBugLink from '../../components/ReportBugLink/ReportBugLink';

import ConfirmationPopup from './ConfirmationPopup';
import AppMenu from './AppMenu';
import Status from './Status';
import NavigationComponents from './Navigation';


const Application = (props) => {
    const {
        dura, defaultEthAccount,
        openMenu, defaultCybertAccount, pendingRequest,
        children, toggleMenu,
    } = props;
    const homePage = dura === '';

    return (
        <App openMenu={ openMenu }>
            <AppMenu />
            {pendingRequest && <ConfirmationPopup />}
            {!homePage && <Status />}
            {!homePage && <ReportBugLink />}
            <AppHeader isHome={ homePage } isMenuOpen={openMenu}>
                <Navigation isHome={ homePage }>
                    <NavigationLeft>
                        <MenuButton
                          openMenu={openMenu}
                            onClick={ toggleMenu }
                        />
                    </NavigationLeft>
                    <NavigationCenter>
                        <NavigationComponents />
                    </NavigationCenter>
                    <NavigationRight>
                        <IdBar
                          defaultEthAccount={ defaultEthAccount }
                          defaultCyberAccount={ defaultCybertAccount }
                        />
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
        dura: state.browser.dura,
        defaultEthAccount: state.wallet.defaultAccount,
        openMenu: state.appMenu.openMenu,
        defaultCybertAccount: state.cyber.defaultAccount,
        pendingRequest: state.wallet.pendingRequest,
    }),
    actions,
)(Application);

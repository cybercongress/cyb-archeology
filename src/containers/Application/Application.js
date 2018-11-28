import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Message } from '@cybercongress/ui';
import { navigate, goBack } from '../../redux/browser';
import { toggleMenu } from '../../redux/appMenu';
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


class Application extends Component {
    render() {
        const {
            dura, defaultEthAccount,
            openMenu, defaultCybertAccount, pendingRequest,
        } = this.props;
        const homePage = dura === '';


        return (
            <App openMenu={ openMenu }>

                <AppMenu />
                {pendingRequest && <ConfirmationPopup />}
                {!homePage && <Status />}
                {!homePage && <ReportBugLink />}
                <AppHeader isHome={ homePage }>
                    <Navigation isHome={ homePage }>
                        <NavigationLeft>
                            <MenuButton openMenu={openMenu} onClick={ this.props.toggleMenu } />
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
                    {this.props.children}
                </AppContent>
            </App>
        );
    }
}

export default connect(
    state => ({
        dura: state.browser.dura,
        defaultEthAccount: state.wallet.defaultAccount,
        openMenu: state.appMenu.openMenu,
        defaultCybertAccount: state.cyber.defaultAccount,
        pendingRequest: state.wallet.pendingRequest,
    }),
    {
        navigate,
        toggleMenu,
    },
)(Application);

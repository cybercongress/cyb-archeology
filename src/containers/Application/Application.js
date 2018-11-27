import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Message } from '@cybercongress/ui';
import { navigate, goBack } from '../../redux/browser';
import { toggleMenu } from '../../redux/appMenu';
import AddToAppMenuButton, { Container } from '../../components/AddToAppMenuButton/AddToAppMenuButton';
import App, { AppHeader, AppContent } from '../../components/App/App';
import Navigation, {
    NavigationLeft, NavigationRight, NavigationCenter, MenuButton,
} from '../../components/Navigation/Navigation';
import SearchInput, { BackButton, ForwardButton, NavigationContainer } from '../../components/SearchInput/SearchInput';
import IdBar from '../../components/IdBar/IdBar';
import ReportBugLink from '../../components/ReportBugLink/ReportBugLink';

import ConfirmationPopup from './ConfirmationPopup';
import AppMenu from './AppMenu';
import Status from './Status';

class Application extends Component {
    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            const value = this.input.value;

            this.props.navigate(value);
        }
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.dura !== nextProps.dura) {
            this.input.value = nextProps.dura;
        }
    }

    render() {
        const {
            dura, defaultEthAccount, canBack, goBack,
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
                            <MenuButton onClick={ this.props.toggleMenu } />
                        </NavigationLeft>
                        <NavigationCenter>
                            <NavigationContainer>
                                {!homePage && <BackButton disabled={ !canBack } onClick={ goBack }>&#8592;</BackButton>}
                                <Container>
                                    <SearchInput
                                        inputRef={ (node) => {
                                            this.input = node;
                                        } }
                                        defaultValue={ dura }
                                        onKeyPress={ this._handleKeyPress }
                                    />
                                    <AddToAppMenuButton />
                                </Container>
                                {!homePage && <ForwardButton disabled>&#8594;</ForwardButton>}
                                {/* (!!dura && dura.indexOf('.dev') !== -1) && <div style={{display: 'inline-block'}}>
                                    <button>deploy</button>
                                    <CybLink dura='.help/#/deploy'>how to deploy app</CybLink>
                                </div> */}
                            </NavigationContainer>
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
        canBack: !!state.browser.backDura,
        defaultEthAccount: state.wallet.defaultAccount,
        openMenu: state.appMenu.openMenu,
        defaultCybertAccount: state.cyber.defaultAccount,
        pendingRequest: state.wallet.pendingRequest,
    }),
    {
        navigate,
        goBack,
        toggleMenu,
    },
)(Application);

import React, {Component} from 'react';
import {connect} from "react-redux";
import {navigate, goBack} from './redux/browser';
import {approve, reject} from './redux/wallet';
import {toggleMenu} from './redux/appMenu';

import AppMenu from './components/AppMenu/AppMenu';
import AddToAppMenuButton, {Container} from "./components/AddToAppMenuButton/AddToAppMenuButton";
import App, {AppHeader, AppContent} from './components/App/App';
import Navigation, {NavigationLeft, NavigationRight, NavigationCenter} from './components/Navigation/Navigation';
import SearchInput from './components/SearchInput/SearchInput';
import Logo from './components/Logo/Logo';
import IdBar, {SettingsLink, WalletLink, CurrentUser} from './components/IdBar/IdBar';
import ConfirmationPopup, {ApproveButton} from './components/ConfirmationPopup/ConfirmationPopup';

import CybLink from './components/CybLink';

class Application extends Component {

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            const value = this.input.value;
            this.props.navigate(value);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.dura !== nextProps.dura) {
            this.input.value = nextProps.dura;
        }
    }

    approve = () => {
        const gas = this.refs.gas.value;
        this.props.approve(gas);
    }

    reject = () => {
        this.props.reject();
    }


    render() {
        const {
            dura, defaultAccount, canBack, goBack,
            pendingRequest,
            request,
            openMenu, cyberDefaultAccount
        } = this.props;
        const homePage = dura === '';
        let _from;
        let _to;
        if (request) {
            _from = request.params[0].from
            _to = request.params[0].to;
        }
        // const pendingRequest = true;

        return (
            <App openMenu={openMenu}>
                <AppMenu openMenu={openMenu}/>
                {pendingRequest &&
                    <ConfirmationPopup
                        content={
                            <div>
                                <div>
                                    gas: <input ref='gas' placeholder='gas' defaultValue={72000}/>
                                </div>
                                <div>
                                    from:{_from}
                                </div>
                                <div>
                                    to:{_to}
                                </div>
                            </div>
                        }
                    >
                        <ApproveButton onClick={this.approve}>approve</ApproveButton>
                        <ApproveButton onClick={this.reject}>reject</ApproveButton>
                    </ConfirmationPopup>
                }
                <AppHeader isHome={homePage}>
                    <Navigation isHome={homePage}>
                        <NavigationLeft>
                            <Logo/>
                            <button onClick={this.props.toggleMenu}>menu</button>
                        </NavigationLeft>
                        <NavigationCenter>
                            <Container>
                                <SearchInput
                                    inputRef={node => {
                                        this.input = node;
                                    }}
                                    defaultValue={dura}
                                    onKeyPress={this._handleKeyPress}
                                />
                                <button disabled={!canBack} onClick={goBack}>back</button>
                                <button disabled>forward</button>
                                {(!!dura && dura.indexOf('.dev') !== -1) && <div style={{display: 'inline-block'}}>
                                    <button>deploy</button>
                                    <CybLink dura='.help/#/deploy'>how to deploy app</CybLink>
                                </div>}
                                <AddToAppMenuButton/>
                            </Container>
                        </NavigationCenter>
                        <NavigationRight>
                            <IdBar>
                                <SettingsLink/>
                                <WalletLink/>
                                <CurrentUser defaultAccount={defaultAccount} cyberDefaultAccount={cyberDefaultAccount}/>
                            </IdBar>
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
        pendingRequest: state.wallet.pendingRequest,
        defaultAccount: state.wallet.defaultAccount,
        request: state.wallet.request,
        openMenu: state.appMenu.openMenu,
        cyberDefaultAccount: state.cyber.defaultAccount,
    }),
    {
        navigate,
        approve,
        reject,
        goBack,
        toggleMenu
    }
)(Application);

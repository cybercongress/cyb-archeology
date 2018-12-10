import React, { Component } from 'react';

import { connect } from 'react-redux';
import { didNavigateInPage, willNavigate, newWindow } from '../../redux/browser';
import { receiveMessage } from '../../redux/wallet';
import { getPreloadPath, isDevMode } from '../../utils';
import BrowserWindow, { BrowserContainer, Loading } from '../../components/BrowserWindow/BrowserWindow';

class Browser extends Component {
    state = {
        loading: false,
    }

    handleWebview = (webview) => {
        if (!webview) {
            return;
        }

        const { props } = this;

        webview.addEventListener('did-navigate-in-page', (e) => {
            e.preventDefault();
            props.didNavigateInPage(e.url);
        });

        webview.addEventListener('will-navigate', (event) => {
            event.preventDefault();
            props.willNavigate(event.url);
        });

        webview.addEventListener('ipc-message', (e) => {
            props.receiveMessage(e);
        });

        webview.addEventListener('did-start-loading', (e) => {
            this.setState({ loading: true });
        });

        webview.addEventListener('did-stop-loading', (e) => {
            this.setState({ loading: false });
        });

        webview.addEventListener('new-window', (evt, url, frameName, disposition, options, additionalFeatures) => {
            evt.preventDefault();
            props.newWindow(evt);
        });

        if (isDevMode()) {
            webview.addEventListener('dom-ready', (e) => {
                webview.openDevTools();
            });
        }
    };

    render() {
        const { url } = this.props;
        const { loading } = this.state;

        return (
            <BrowserContainer>
                <BrowserWindow
                  preload={ `${getPreloadPath()}` }
                  src={ url }
                  refFn={ this.handleWebview }
                  loading={ loading }
                />
                <Loading loading={ loading } />
            </BrowserContainer>
        );
    }
}


export default connect(
    ({ browser }) => ({
        dura: browser.dura,
        url: browser.url,
        loading: browser.loading,
    }),
    {
        willNavigate,
        didNavigateInPage,
        receiveMessage,
        newWindow,
    },
)(Browser);

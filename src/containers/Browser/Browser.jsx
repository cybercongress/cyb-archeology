import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    BrowserWindow, BrowserContainer, Loading,
} from '@cybercongress/ui';
import {
    didNavigateInPage, willNavigate, newWindow, setWebView,
    receiveMessage as receiveBrowserMessage,
} from '../../redux/browser';
import { receiveMessage } from '../../redux/wallet';
import { getPreloadPath, isDevMode } from '../../utils';

/*
TODO: fix bug /#/ => /#/page => click /#/
*/

let _webview;

class Browser extends Component {

    state = {
        loading: false,
    };

    // todo: move this method to BrowserWindow component
    componentWillUnmount() {
        this.removeAllListeners();

        // todo: refactor unsubscribing
        window.cyber.unsubscribeNewBlock();

        this.props.setWebView(null);
    }

    removeAllListeners = () => {
        if (_webview) {
            console.log('[send remove all listeners to preload]');
            _webview.send('removeAllListeners');
        }
    };

    handleWebview = (webview) => {
        if (!webview) {
            return;
        }

        _webview = webview;
        const { props } = this;

        webview.addEventListener('did-navigate', (event) => {
            this.removeAllListeners();
            props.setWebView(event.target);
        });

        webview.addEventListener('did-navigate-in-page', (e) => {
            e.preventDefault();
            this.removeAllListeners();
            props.didNavigateInPage(e.url);
        });

        webview.addEventListener('will-navigate', (event) => {
            event.preventDefault();
            props.willNavigate(event.url);
        });

        webview.addEventListener('ipc-message', (e) => {
            props.receiveMessage(e);
            props.receiveBrowserMessage(e);
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
        receiveBrowserMessage,
        newWindow,
        setWebView,
    },
)(Browser);

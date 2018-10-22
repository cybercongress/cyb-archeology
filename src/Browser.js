import React, {Component} from 'react';

import {connect} from "react-redux";
import {didNavigateInPage, willNavigate} from "./redux/browser";
import {receiveMessage} from './redux/wallet';
import {getPreloadPath} from "./utils";
import BrowserWindow, { BrowserContainer, Loading } from './components/BrowserWindow/BrowserWindow';

class Browser extends Component {
    state = {
        loading: false
    }
    handleWebview = webview => {
        if (!webview) {
            return;
        }

        webview.addEventListener('did-navigate-in-page', (e) => {
            e.preventDefault();
            this.props.didNavigateInPage(e.url);
        });

        webview.addEventListener('will-navigate', event => {
            event.preventDefault();
            this.props.willNavigate(event.url);
        });

        webview.addEventListener('console-message', e => {
            console.log('[DAPP]', e.message);
        });

        webview.addEventListener('ipc-message', (e) => {
            this.props.receiveMessage(e);
        });

        webview.addEventListener('did-start-loading', (e) => {
            this.setState({ loading: true })
        });

        webview.addEventListener('did-stop-loading', (e) => {
            this.setState({ loading: false })
        });
    }


    render() {
        const { url} = this.props;
        const { loading } = this.state;
        return (
            <BrowserContainer>
                <BrowserWindow
                    preload={`${getPreloadPath()}`}
                    src={url}
                    refFn={this.handleWebview}
                    loading={loading}
                />
                <Loading loading={loading}/>
            </BrowserContainer>
        );
    }
}


export default connect(
    ({browser}) => ({
        dura: browser.dura,
        url: browser.url,
        loading: browser.loading
    }),
    {
        willNavigate,
        didNavigateInPage,
        receiveMessage
    }
)(Browser);

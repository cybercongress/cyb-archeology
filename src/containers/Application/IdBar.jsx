import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClickOutside from 'react-click-outside';
//import { CurrentUser } from '@cybercongress/ui';
import IdBarComponent, {
    NotificationLink,
    SettingsLink,
    CurrentUser,
} from '../../components/IdBar/IdBar';
import { toggleMenu } from '../../redux/appMenu';
import { getDefaultAccountBalance } from '../../redux/wallet';
import {
    CybLink,
} from '../../components/CybLink';
import { getDefaultAccountBalance as getDefaultAccountBalanceCyb } from '../../redux/cyber';

const menuItems = [
    {
        items: '1',
        rootDura: 'ds',
        name: 'Chaingear',
        pill: '7',
        status: 'remote',
    }
]
class IdBar extends Component {
    state = {
        open: false,
    };

    toggle = () => {
        const { open } = this.state;

        this.setState({
            open: !open,
        });
    };

    favoriteClick = (e) => {
        const { props } = this;

        e.preventDefault();
        props.toggleMenu();
    };

    close = () => {
        this.setState({ open: false });
    };

    render() {
        const { open } = this.state;
        const { history } = this.props;
        const {
            defaultEthAccount,
            defaultCyberAccount,
            defaultAccountBalance,
            defaultAccountBalanceCyb,
            notificationLinkCounter,
            username,
        } = this.props;

         const historyWithoutLast = history.slice(0, history.length);
         historyWithoutLast.reverse();

        return (
            <IdBarComponent>
                <ClickOutside onClickOutside={ this.close }>
                    <CurrentUser
                      defaultEthAccount={ defaultEthAccount }
                      defaultCyberAccount={ defaultCyberAccount }
                      toggle={ this.toggle }
                      open={ open }
                      favoriteClick={ this.favoriteClick }
                      ethBalance={ defaultAccountBalance }
                      cybBalance={ defaultAccountBalanceCyb }
                      menuItems={historyWithoutLast}
                      username={username}
                    />
                </ClickOutside>
                {/* <SettingsLink />
                {defaultEthAccount && (
                    <NotificationLink
                      notificationLinkCounter={ notificationLinkCounter }
                    />
                )} */}
            </IdBarComponent>
        );
    }
}


export default connect(
    state => ({
        defaultEthAccount: state.wallet.defaultAccount,
        defaultCyberAccount: state.cyber.defaultAccount,
        defaultAccountBalance: getDefaultAccountBalance(state),
        defaultAccountBalanceCyb: getDefaultAccountBalanceCyb(state),
        notificationLinkCounter: state.wallet.notificationLinkCounter,
        history: state.browser.history,
        username: state.settings.username,
    }),
    { toggleMenu },
)(IdBar);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClickOutside from 'react-click-outside';
import IdBarComponent, {
    NotificationLink,
    SettingsLink,
    CurrentUser,
} from '../../components/IdBar/IdBar';
import { toggleMenu } from '../../redux/appMenu';
import { getDefaultAccountBalance } from '../../redux/wallet';
import { getDefaultAccountBalance as getDefaultAccountBalanceCyb } from '../../redux/cyber';


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
        const {
            defaultEthAccount,
            defaultCyberAccount,
            defaultAccountBalance,
            defaultAccountBalanceCyb,
            notificationLinkCounter,
        } = this.props;

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
                    />
                </ClickOutside>
                <SettingsLink />
                {defaultEthAccount && (
                    <NotificationLink
                      notificationLinkCounter={ notificationLinkCounter }
                    />
                )}
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
    }),
    { toggleMenu },
)(IdBar);

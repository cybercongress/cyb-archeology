import React, { Component } from 'react';
import { connect } from 'react-redux';
import CybLink from '../../components/CybLink';
import IdBarComponent, {
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
    }

    render() {
        const { open } = this.state;
        const {
            defaultEthAccount,
            defaultCyberAccount,
            defaultAccountBalance,
            defaultAccountBalanceCyb,
        } = this.props;

        return (
            <IdBarComponent>
                <CybLink dura='txq.cyb' className='id-bar__txq'><span></span></CybLink>
                <SettingsLink />
                <CurrentUser
                  defaultEthAccount={ defaultEthAccount }
                  defaultCyberAccount={ defaultCyberAccount }
                  toggle={this.toggle}
                  open={open}
                  favoriteClick={this.favoriteClick}
                  ethBalance={defaultAccountBalance}
                  cybBalance={defaultAccountBalanceCyb}
                />
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
    }),
    { toggleMenu },
)(IdBar);

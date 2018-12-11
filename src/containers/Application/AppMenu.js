import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Message } from '@cybercongress/ui';
import * as actions from '../../redux/appMenu';

import MenuContainer, {
    Bookmarks,
    LogoLink,
    AddMenuItem,
    AddMenuItemApprove,
    AddMenuItemReject,
    ReportLinkContainer,
    AddMenuItemContainer,
} from '../../components/AppMenu/AppMenu';

class AppMenu extends Component {
    addToFavorites = () => {
        const dura = this.props.currentDura;
        const name = this.refs.input.value;

        this.props.addMenuItem(name, dura);
        this.hideInput();
    };

    hideInput = () => {
        this.props.hideInput();
    };

    rejectFavorite = () => {
        this.refs.input.value = 'New App';
        this.hideInput();
    };

    clickLogo = () => {
        // this.props.toggleMenu();
    };

    render() {
        const {
            openMenu, deleteMenuItem, menuItems,
            pendingAddToFavorites, dura,
        } = this.props;

        return (
            <MenuContainer openMenu={ openMenu }>
                <LogoLink onClick={ this.clickLogo } />

                <Message
                    style={{
                        margin: 15,
                    }}
                    type='error'
                >
                    Cyb in Ethereum Mainnet may not be secure yet. We recommend to operate accounts with small balance at your own risk.
                </Message>
                <Bookmarks
                  items={ menuItems }
                  deleteMenuItem={ deleteMenuItem }
                />
                {pendingAddToFavorites
                && (
                    <AddMenuItemContainer>
                    <AddMenuItem>
                        <input
                          ref='input'
                          defaultValue='New App'
                        />
                        <AddMenuItemApprove onClick={ this.rejectFavorite } />
                        <AddMenuItemReject onClick={ this.addToFavorites } />
                    </AddMenuItem>
                    </AddMenuItemContainer>
                )
                }
                <ReportLinkContainer>
                    <a target='__blank'  href='https://github.com/cybercongress/cyb'>Find a bug?</a>
                </ReportLinkContainer>
            </MenuContainer>
        );
    }
}


export default connect(
    state => ({
        dura: state.browser.dura,
        openMenu: state.appMenu.openMenu,
        menuItems: state.appMenu.items,
        currentDura: state.browser.dura,
        pendingAddToFavorites: state.appMenu.pendingAddToFavorites,
    }),
    actions,
)(AppMenu);

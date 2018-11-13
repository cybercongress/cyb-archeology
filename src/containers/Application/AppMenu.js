import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/appMenu';

import MenuContainer, {
    Bookmarks,
    AppStoreLink,
    LogoLink,
    AddMenuItem,
    AddMenuItemApprove,
    AddMenuItemReject,
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
    	this.props.toggleMenu();
    };

    render() {
        const {
        	openMenu, deleteMenuItem, menuItems,
        	pendingAddToFavorites,
        } = this.props;

        return (
            <MenuContainer openMenu={ openMenu }>
                <LogoLink onClick={ this.clickLogo } />
                <AppStoreLink />
                <Bookmarks
                  items={ menuItems }
                  deleteMenuItem={ deleteMenuItem }
                />
                {pendingAddToFavorites
                && (
                    <AddMenuItem>
                        <input
                          ref='input'
                          defaultValue='New App'
                        />
                        <AddMenuItemApprove onClick={ this.rejectFavorite } />
                        <AddMenuItemReject onClick={ this.addToFavorites } />
                    </AddMenuItem>
                )
                }
            </MenuContainer>
        );
    }
}


export default connect(
    state => ({
        openMenu: state.appMenu.openMenu,
        menuItems: state.appMenu.items,
        currentDura: state.browser.dura,
        pendingAddToFavorites: state.appMenu.pendingAddToFavorites,
    }),
    actions,
)(AppMenu);

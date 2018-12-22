import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Message } from '@cybercongress/ui';
import ClickOutside from 'react-click-outside';
import * as actions from '../../redux/appMenu';

import MenuContainer, {
    Bookmarks,
    LogoLink,
    AddMenuItem,
    AddMenuItemReject,
    ReportLinkContainer,
    AddMenuItemContainer,
} from '../../components/AppMenu/AppMenu';

class AppMenu extends Component {
    addToFavorites = () => {
        const { props } = this;
        const dura = props.currentDura;
        const name = this.input.value;

        props.addMenuItem(name, dura);
        this.hideInput();
    };

    hideInput = () => {
        const { props } = this;

        props.hideInput();
    };

    rejectFavorite = () => {
        this.input.value = 'New App';
        this.hideInput();
    };

    clickLogo = () => {
        // this.props.toggleMenu();
    };

    render() {
        const {
            deleteMenuItem, menuItems,
            pendingAddToFavorites,
        } = this.props;

        return (
            <MenuContainer>
                <LogoLink onClick={ this.clickLogo } />

                <Message
                  style={ {
                    margin: 15,
                  } }
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
                    <ClickOutside onClickOutside={ this.rejectFavorite }>
                        <AddMenuItemContainer>
                            <AddMenuItem>
                                <input
                                  ref={ (node) => { this.input = node; } }
                                  defaultValue='New App'
                                />
                                <AddMenuItemReject onClick={ this.addToFavorites } />
                            </AddMenuItem>
                        </AddMenuItemContainer>
                    </ClickOutside>
                )}
                <ReportLinkContainer>
                    <a
                      target='__blank'
                      href='https://github.com/cybercongress/cyb'
                    >
                    Find a bug?
                    </a>
                </ReportLinkContainer>
            </MenuContainer>
        );
    }
}


export default connect(
    state => ({
        dura: state.browser.dura,
        menuItems: state.appMenu.items,
        currentDura: state.browser.dura,
        pendingAddToFavorites: state.appMenu.pendingAddToFavorites,
    }),
    actions,
)(AppMenu);

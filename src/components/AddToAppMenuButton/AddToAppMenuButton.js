import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/appMenu';
import './AddToAppMenuButton.css';

export const Container = ({ children }) => (
    <div className='favoritesContainer'>
        {children}
    </div>
);

class AddToAppMenuButton extends Component {
    _onclick = () => {
        if (!this.isFavoritedPage()) {
            this.props.showInput();
        } else {
            this.props.deleteMenuItem(this.props.currentDura);
        }
    };

    isFavoritedPage = () => {
        const menuItems = this.props.menuItems;
        const currentDura = this.props.currentDura;

        return menuItems.find(item => item.rootDura === currentDura);
    };

    render() {
        const className = this.isFavoritedPage() ? 'favoritedPage' : 'addAppButton';

        return (
            <div onClick={ this._onclick } className={ className }>
                &#9734;
            </div>
        );
    }
}

export default connect(
    state => ({
        menuItems: state.appMenu.items,
        currentDura: state.browser.dura,
    }),
    actions,
)(AddToAppMenuButton);

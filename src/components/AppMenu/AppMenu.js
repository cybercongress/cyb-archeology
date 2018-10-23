import React, {Component} from 'react';
import {connect} from "react-redux";
import CybLink from "../CybLink";
import * as actions from "../../redux/appMenu"

const styles = require("./AppMenu.css");

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

    render() {
        const {openMenu} = this.props;

        const deleteAppFromMenu = (rootDura) => {
            this.props.deleteMenuItem(rootDura);
        };

        const appMenuItems = this.props.menuItems.map(item => {
            return <span className='AppMenuItem' key={item.rootDura}>
                <CybLink dura={item.rootDura}>
                    <AppMenuItem name={item.name}/>
                </CybLink>
                <div className='removeButton' onClick={() => deleteAppFromMenu(item.rootDura)}>&#128465;</div>
            </span>
        });

        const pendingAddToFavorites = this.props.pendingAddToFavorites;

        return (
            <div className={`menuContainer ${!openMenu ? 'menuContainer--hide' : ''}`}>
                <div className='appMenu'>
                    {appMenuItems}
                </div>
                {pendingAddToFavorites &&
                <span className='addMenuItem'>
                        <input
                            ref='input'
                            defaultValue='New App'
                        />
                        <div onClick={this.rejectFavorite} className='AppMenuItem'>
                            &#10006;
                        </div>
                        <div onClick={this.addToFavorites} className='AppMenuItem'>
                            &#10004;
                        </div>
                    </span>
                }
            </div>
        );
    }
}

class AppMenuItem extends Component {

    render() {
        return (
            <div className='AppMenuItem'>
                {this.props.name}
            </div>
        )
    }
}

export default connect(
    state => ({
        menuItems: state.appMenu.items,
        currentDura: state.browser.dura,
        pendingAddToFavorites: state.appMenu.pendingAddToFavorites
    }),
    actions
)(AppMenu);

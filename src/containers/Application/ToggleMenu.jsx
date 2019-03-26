import React from 'react';
import { connect } from 'react-redux';
import {
    MenuButton,
} from '@cybercongress/ui';
import { toggleMenu as toggleMenuAction } from '../../redux/appMenu';

// import {
//     MenuButton,
// } from '../../components/Navigation/Navigation';

const Menu = ({ openMenu, toggleMenu }) => (
    <MenuButton
      openMenu={ openMenu }
      onClick={ toggleMenu }
    />
);

export default connect(
    state => ({
        openMenu: state.appMenu.openMenu,
    }),
    { toggleMenu: toggleMenuAction },
)(Menu);

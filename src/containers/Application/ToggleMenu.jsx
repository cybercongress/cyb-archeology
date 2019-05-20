import React from 'react';
import { connect } from 'react-redux';
import { MenuButton } from '@cybercongress/ui';
import { toggleMenu as toggleMenuAction } from '../../redux/appMenu';

// import {
//     MenuButton,
// } from '../../components/Navigation/Navigation';

class Menu extends React.Component {
    render() {
        const { openMenu, toggleMenu, ipfsStatus, cyberNodeStatus, ethNodeStatus } = this.props;
        let status = '';
        if (ipfsStatus === 'fail' && ethNodeStatus === 'fail' && cyberNodeStatus === 'fail'){
          status='fail'
        }else if(ipfsStatus === 'local' && ethNodeStatus === 'local' && cyberNodeStatus === 'local'){
          status='local'
        }else {
          status='remote'
        }
        return (
            <MenuButton
              openMenu={ openMenu }
              onClick={ toggleMenu }
             status={ ipfsStatus } //  status indicator
            />
        );
    }
}
export default connect(
    state => ({
        ipfsStatus: state.settings.ipfsStatus,
        ethNodeStatus: state.settings.ethNodeStatus,
        cyberNodeStatus: state.settings.cyberNodeStatus,
        openMenu: state.appMenu.openMenu,
    }),
    { toggleMenu: toggleMenuAction },
)(Menu);

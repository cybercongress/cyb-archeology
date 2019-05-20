import React, { Component } from 'react';

import styles from './create.less';
import CybLink from '../../components/CybLink';
import {
    Pane,
} from '@cybercongress/ui'

class HelpHome extends Component {
    render() {
        return (
            <div className={ styles.container }>
            <Pane display='flex' flexDirection='column'>
                Links:
                <CybLink style={{color: '#009f6d', textDecoration: 'none', margin: '5px 0', paddingLeft: 20 }} dura='help.cyb/open'>How to open IPFS link </CybLink>
                <CybLink style={{color: '#009f6d', textDecoration: 'none', margin: '5px 0', paddingLeft: 20 }} dura='help.cyb/favourites'>How to add an app to favourites </CybLink>
                <CybLink style={{color: '#009f6d', textDecoration: 'none', margin: '5px 0', paddingLeft: 20 }} dura='help.cyb/switch'>How to switch between ethereum networks </CybLink>
                <CybLink style={{color: '#009f6d', textDecoration: 'none', margin: '5px 0', paddingLeft: 20 }} dura='help.cyb/ipfs'>How to add own IPFS node </CybLink>
                <CybLink style={{color: '#009f6d', textDecoration: 'none', margin: '5px 0', paddingLeft: 20 }} dura='help.cyb/eth'>How to add own ETH node </CybLink>
                <CybLink style={{color: '#009f6d', textDecoration: 'none', margin: '5px 0', paddingLeft: 20 }} dura='help.cyb/create'>How to create an app </CybLink>
                <CybLink style={{color: '#009f6d', textDecoration: 'none', margin: '5px 0', paddingLeft: 20 }} dura='help.cyb/link'>How to link content </CybLink>
            </Pane>
            </div>
        );
    }
}

export default HelpHome;

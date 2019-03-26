import React, { Component } from 'react';
import styles from './create.less';
import CybLink from '../../components/CybLink';

class Favourites extends Component {
    render() {
        return (
            <div className={styles.container}>
                <h1 className={styles.title}>/ How to switch between ethereum networks</h1>
                <ol>
                  <li>
                    <p>Go to setting. Write in address bar ".settings" or click on "gear" at top-right side</p>
                    <img className={ styles.img-50 } src={ require("./img/settings_switch.png") } />
                  </li>
                  <li>
                    <p>Chose necessary ETH network with buttons "Main", "Rikenby" and "Kovan"</p>
                  </li>
                  <li>
                    <p>You can also change network addresses for your custom by following <CybLink dura='help.cyb/eth'>guide</CybLink></p>
                  </li>
                </ol>
            </div>
        );
    }
}

export default Favourites;

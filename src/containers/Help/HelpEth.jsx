import React, { Component } from 'react';

import styles from './create.less';

class HelpEth extends Component {
    render() {
        return (
            <div className={styles.container}>
                <h2 className={styles.title}>/ How to add own ETH node</h2>
                <ol>
                  <li>
                    <h3>Install Parity-node</h3>
                    <p className={styles.text}>The easiest way to install the stable version of Parity is <a href="https://brew.sh/" target='_blank'>Homebrew</a>. Run this command in terminal:</p>
                    <pre>brew tap paritytech/paritytech</pre>
                    <pre>brew install parity</pre>
                  </li>
                  <li>
                    <h3>Syncing</h3>
                    <p className={styles.text}>After successfull installation run:</p>
                    <pre>parity --jsonrpc-cors="all" --jsonrpc-apis="all" --jsonrpc-interface=all</pre>
                    <p className={styles.text}>this command starts syncing of Parity. Actually, the node is available for use by address</p>
                    <pre>http://127.0.0.1:8545</pre>
                    <img className={styles.img} src={require("./img/par_sync.png")} />
                    <p className={styles.text}>it can sync for 48 hours and more, it depends on your hardware and internet connection.
                      The total size of the synced node at that moment is approximately 80 Gb. After syncing you should see something like this:
                    </p>
                    <img className={styles.img} src={require("./img/par_synced.png")} />
                    <p className={styles.text}>As you see `Syncing` is switched to `Imported`. It means that the node in a valid state.</p>
                  </li>
                  <li>
                    <h3>Adding port to Cyb</h3>
                    <p className={styles.text}>You need to insert this address `http://127.0.0.1:8545` opposite `ETH NODE` like this:</p>
                    <img className={styles.img} src={require("./img/par_add.png")} />
                    <p className={styles.text}>Don't forget about the `update` button!</p>
                  </li>
                </ol>
            </div>
        );
    }
}

export default HelpEth;

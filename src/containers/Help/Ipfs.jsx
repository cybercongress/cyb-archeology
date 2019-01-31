import React, { Component } from 'react';

import styles from './create.less';

class Ipfs extends Component {
    render() {
        return (
            <div className={styles.container}>
                <h1 className={styles.title}>/ How to add own ipfs node</h1>
                <ol>
                  <li>
                    <h3>Install IPFS</h3>
                    <p className={styles.text}>First of all we need to install and initiate IPFS node. If you've already did it, you can skip this section.
                        The easiest way to install IPFS is <a href="https://brew.sh/" target='_blank'>Homebrew</a>. All you need is just to run in your terminal:
                    </p>
                    <pre>brew install ipfs</pre>
                    <p className={styles.text}>then run</p>
                    <pre>ipfs init</pre>
                    <p className={styles.text}>and finally</p>
                    <pre>ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'</pre>
                    <pre>ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["GET", "POST"]'</pre>
                    <pre>ipfs config --json API.HTTPHeaders.Access-Control-Allow-Headers '["Authorization"]'</pre>
                    <pre>ipfs config --json API.HTTPHeaders.Access-Control-Expose-Headers '["Location"]'</pre>
                    <pre>ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials '["true"]'</pre>
                    <p className={styles.text}>Just for test you can write</p>
                    <pre>ipfs cat /ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG/readme</pre>
                    <p className={styles.text}>You shuld see this text:</p>
                    <img className={styles.img-50} src={require("./img/ipfs_welcome.png")} />
                  </li>
                  <li>
                    <h3>Start IPFS daemon</h3>
                    <p className={styles.text}>To go online write in your terminal:</p>
                    <pre>brew services start ipfs</pre>
                    <p className={styles.text}>wait a few seconds. Now run:</p>
                    <pre>brew services list</pre>
                    <p className={styles.text}>if you see</p>
                    <pre>ipfs started %username% /Users/%username%/Library/LaunchAgents/homebrew.mxcl.ipfs.plist</pre>
                    <p className={styles.text}>you have launched ipfs daemon successfully</p>
                  </li>
                  <li>
                    <h3>Adding local IPFS node to Cyb</h3>
                    <p className={styles.text}>Type in search field `settings.cyb` and press `Enter` or click on `gear` button on the right top side. You should see this:</p>
                    <img className={styles.img} src={require("./img/settings_ipfs.png")} />
                    <p className={styles.text}>Here you can see addresses of your connections. Default connection type is for our cybernodes.
                      Put this `http://127.0.0.1:8080` in IPFS connection filed and click on update button. If everything is correct you should see:
                    </p>
                    <img className={styles.img} src={require("./img/ipfs_connect.png")} />
                  </li>
                </ol>
            </div>
        );
    }
}

export default Ipfs;

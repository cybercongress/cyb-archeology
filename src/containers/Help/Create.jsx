import React, { Component } from 'react';
import styles from './create.less';
import CybLink from '../../components/CybLink';

class Create extends Component {
    render() {
        return (
            <div className={styles.container}>
                <h2 className={styles.title}>/ App development tool</h2>
                <ol>
                    <li>
                        <h3>Install the latest version of CYB package</h3>
                        <pre>npm install cyb -g </pre>
                    </li>

                    <li>
                        <h3>To create a repo with Cyb app run:</h3>
                        <pre>cyb init <strong>myApp</strong></pre>
                    </li>
                    <img className={styles.img-50} src={require("./img/cyb_init.png")} />

                    <li>
                        <h3>Go to the created repo</h3>
                        <pre>cd <strong>myApp</strong></pre>
                    </li>

                    <li>
                        <h3>At your app repo run:</h3>
                        <pre>npm strat</pre>
                        <h3>your app will be available at "5600.dev" address in Cyb</h3>
                        <h3>develop your app with ReactJS and use dveloper tools "View -> Toggle Developer Tools"</h3>
                    </li>

                    <img className={ styles.img } src={ require('./img/npm_start.png') } />

                    <li>
                        <h3>After you done run:</h3>
                        <pre>npm run bild</pre>
                        <h3>
                            in your project "myApp" folder would present "distribution" folder.
                            This is your builded app
                        </h3>
                    </li>

                    <li>
                        <h3>
                            If you want to put this app in the production and share
                            it with friends install
                            <CybLink dura='help.cyb/ipfs'>ipfs</CybLink>
                            and run:
                        </h3>
                        <pre>ipfs add -r <strong>distribution/</strong></pre>
                    </li>
                    <img className={ styles.img } src={require('./img/ipfs_add.png')} />

                    <li>
                        <h3>The lates hash is the hash of your app. You can try it in Cyb! Insert given ipfs hash in address bar with ".ipfs"</h3>
                        <pre><strong>YourHash</strong>.ipfs</pre>
                    </li>
                    <img className={ styles.img } src={ require('./img/hash.png') } />

                    <li>
                        <h3>To make it available for your friends run:</h3>
                        <pre>ipfs pin add <strong>YourHash</strong></pre>
                        <h3>You should see:</h3>
                        <pre>pinned <strong>YourHash</strong> recursively</pre>
                    </li>
                </ol>
            </div>
        );
    }
}

export default Create;

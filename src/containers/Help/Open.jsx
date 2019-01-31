import React, { Component } from 'react';

import styles from './create.less';

class Create extends Component {
    render() {
        return (
            <div className={ styles.container }>
                <h1 className={ styles.title }>/ How to open IPFS link</h1>
                <ol>
                    <li>
                        <p>Type or insert IPFS hash in the search field. It should start with `Qm` and have 46 characters and ends with `.ipfs`</p>
                        <img className={ styles.img } src={ require('./img/ipfs_link.png') } />
                    </li>
                    <li>
                        <p>Done!</p>
                        <img className={ styles.img } src={ require('./img/open_done.png') } />
                    </li>
                </ol>
            </div>
        );
    }
}

export default Create;

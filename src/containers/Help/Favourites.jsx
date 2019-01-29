import React, { Component } from 'react';

import styles from './create.less';

class Favourites extends Component {
    render() {
        return (
            <div className={styles.container}>
                <h1 className={styles.title}>/ How to add an app to favourites</h1>
                <ol>
                  <li>
                    <p>Type or insert IPFS hash in the search field. It should start with `Qm` and have 46 characters and ends with `.ipfs`</p>
                    <img className={styles.img} src={ require("./img/favourites_link.png") } />
                  </li>
                  <li>
                    <p>Click on "heart" at the right side of address bar</p>
                  </li>
                  <li>
                    <p>Click on "heart" at the right side of address bar and give name of your favourite app</p>
                    <img className={styles.img-50} src={ require("./img/favourites_name.png") } />
                  </li>
                  <li>
                    <p>App added to side menu</p>
                  </li>
                </ol>
            </div>
        );
    }
}

export default Favourites;

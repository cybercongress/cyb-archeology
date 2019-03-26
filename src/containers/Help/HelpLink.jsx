import React, { Component } from 'react';

import styles from './create.less';

class Create extends Component {
    render() {
        return (
            <div className={styles.container}>
                <h1 className={styles.title}>/ How to link content</h1>
                <ol>
                  <li>
                    <p>Make sure that you have non-zero balance at your cyb account</p>
                    <img className={styles.img} src={require("./img/non-zero-balance.png")} />
                  </li>
                  <li>
                    <p>Type '.cyberd' in search bar or click on 'Cyber Search' in a side bar. Here is search app.</p>
                    <img className={styles.img} src={require("./img/open-search.png")} />
                  </li>
                  <li>
                    <p>Try to search something. For example 'Berlin'</p>
                    <img className={styles.img} src={require("./img/search-Berlin.png")} />
                  </li>
                  <li>
                    <p>As you see there is no results for 'Berlin' phrase. It's good chance to link it! Let's link it with phrase 'the capital of Germany'</p>
                    <img className={styles.img} src={require("./img/search-link.png")} />
                  </li>
                  <li>
                    <p>Click on 'SEE RESULTS' and now you can see linked phrase at search results </p>
                    <img className={styles.img} src={require("./img/search-link-result.png")} />
                  </li>
                  <li>
                    <p>Also, you can link search phrase with dura://, ipfs and ipns hashes and so on. Note: if you want to link search phrase with ipfs hash add '.ipfs' to the end of hash to avoid incorrect displaying..</p>
                  </li>
                </ol>
            </div>
        );
    }
}

export default Create;

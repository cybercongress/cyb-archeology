import React, { Component } from 'react';
import Container from '../../components/Container/Container';

/*
import Web3 from 'web3';

const abi = require('./appStoreRegistryAbi');
const contractAddress = '';

const appStoreRegistryAddress = '0x9437480269e6d5f0eca18a861d89a1f798818f16';
const entryCoreAddress = '0x4e91c59388667e74ba6266da292ecbb4483fe279';
*/

class AppStore extends Component {
    /*
    loadApps = () => {
        const web3 = new Web3(window.web3.currentProvider);

        const contract  = new web3.eth.Contract(abi, contractAddress);
    };
    */

    render() {
        return (
            <Container>
                AppStore
            </Container>
        );
    }
}

export default AppStore;

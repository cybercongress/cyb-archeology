import * as axios from 'axios';
import {
    create as createCyberdAccount,
    importAccount as importCyberdAccount,
    recover as recoverCyberdAccount,
} from './crypto';

import builder from './builder';

const chainId = 'test-chain-gRXWCL';
const claimNodeUrl = 'http://earth.cybernode.ai:34666';
const defaultAmount = 10000;

let __accounts = {};

function Cyber(nodeUrl) {
    const self = this;

    let defaultAccount = null;

    self.search = function (cid) {
        return new Promise((resolve) => {
            axios({
                method: 'get',
                url: `${nodeUrl}/search?cid=${cid}`,
            })
                .then((data) => {
                    const cids = data.data.result.cids;
                    const links = cids.map(cid => ({ hash: cid.Cid }));

                    resolve(links);
                })
                .catch(error => resolve([]));
        });
    };


    self.link = function (from, to, address = '') {
        return axios({
            method: 'get',
            url: `${nodeUrl}/account?address=${address}`,
        }).then((response) => {
            if (!response.data.result) { return false; }

            return response.data.result.account;
        }).then((account) => {
            if (!account) { return; }

            const acc = {
                address: account.address,
                chain_id: chainId, // todo: get from node
                account_number: parseInt(account.account_number, 10),
                sequence: parseInt(account.sequence, 10),
            };
            const linkRequest = {
                acc,
                fromCid: from,
                toCid: to,
                type: 'link',
            };

            return axios({
                method: 'post',
                url: `${nodeUrl}/link`,
                data: builder.buildAndSignTxRequest(linkRequest, __accounts[address].privateKey, chainId),
            }).then(data => console.log('Link results: ', data)).catch(error => console.log('Cannot link', error));
        });
    };

    self.claimFunds = function (address, amount) {
        return axios({
            method: 'get',
            url: `${claimNodeUrl}/claim?address=${address}&amount=${amount}`,
        }).then((response) => {
            console.log(`Claimed ${amount} for address ${address}`, response);
        });
    };

    let __setDefaultAddress;

    self.getDefaultAddress = function () {
        return new Promise((resolve) => {
            __setDefaultAddress = resolve;
            resolve(defaultAccount);
        });
    };

    self.setDefaultAccount = function (_address) {
        defaultAccount = _address;
        if (__setDefaultAddress) { __setDefaultAddress(defaultAccount); }
    };

    self.getAccounts = function () {
        return new Promise((resolve) => {
            __accounts = JSON.parse(localStorage.getItem('cyberAccounts') || '{}');

            Promise.all(
                Object.keys(__accounts).map(address => axios({
                    method: 'get',
                    url: `${nodeUrl}/account?address=${address}`,
                }).then((data) => {
                    let balance = 0;
                    let publicKey = '';

                    if (data.data.result && data.data.result.account && data.data.result.account.account_number >= 0) {
                        balance = data.data.result.account.coins[0].amount;
                        // console.log(data.data.result.account.)
                        // publicKey = data.data.result.account.public_key.value;
                        publicKey = __accounts[address].publicKey; // save when create
                    }

                    return {
                        address,
                        publicKey,
                        balance,
                    };
                })),
            ).then((accounts) => {
                resolve(accounts);
            });
        });
    };

    self.restoreAccount = function (seedPhrase) {
        return new Promise((resolve) => {
            const account = recoverCyberdAccount(seedPhrase);

            __accounts[account.address] = account;

            localStorage.setItem('cyberAccounts', JSON.stringify(__accounts));

            resolve();
        });
    };

    self.importAccount = function (privateKey) {
        return new Promise((resolve) => {
            const account = importCyberdAccount(privateKey);

            __accounts[account.address] = account;

            localStorage.setItem('cyberAccounts', JSON.stringify(__accounts));

            resolve();
        });
    };

    self.createAccount = function () {
        return new Promise((resolve) => {
            const account = createCyberdAccount();

            __accounts[account.address] = account;

            localStorage.setItem('cyberAccounts', JSON.stringify(__accounts));

            this.claimFunds(account.address, defaultAmount);

            resolve();
        });
    };

    self.forgetAccount = function (address) {
        return new Promise((resolve) => {
            delete __accounts[address];

            localStorage.setItem('cyberAccounts', JSON.stringify(__accounts));

            resolve();
        });
    };

    self.getAccount = (address) => new Promise(resolve => {
        resolve(__accounts[address]);
    })

    self.sendFunds = function (defaultAddress, recipientAddress, amount) {
        return axios({
            method: 'get',
            url: `${nodeUrl}/account?address=${defaultAddress}`,
        }).then((response) => {
            if (!response.data.result) { return false; }

            return response.data.result.account;
        }).then((account) => {
            if (!account) { return; }

            const acc = {
                address: account.address,
                chain_id: chainId, // todo: get from node
                account_number: parseInt(account.account_number, 10),
                sequence: parseInt(account.sequence, 10),
            };
            const sendRequest = {
                acc,
                from: defaultAddress,
                to: recipientAddress,
                amount,
                type: 'send',
            };

            const tx = builder.buildAndSignTxRequest(sendRequest, __accounts[defaultAddress].privateKey, chainId);

            console.log(tx);
            return axios({
                method: 'post',
                url: `${nodeUrl}/send`,
                data: tx,
            }).then(data => console.log('Send results: ', data)).catch(error => console.log('Cannot send', error));
        });
    };
}

export default Cyber;

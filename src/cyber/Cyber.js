import * as axios from 'axios';
import {
    create as createCyberdAccount,
    importAccount as importCyberdAccount,
    recover as recoverCyberdAccount,
} from './crypto';

import builder from './builder';

let chainId = 'euler-dev0';
const claimNodeUrl = 'http://earth.cybernode.ai:34666'; //proxy TODO: remove when fix chain
const defaultAmount = 10000;

let __accounts = {};

const IPFS = require('ipfs-api');


const saveInIPFS = (ipfs, jsonStr) => new Promise((resolve, reject) => {
    const buffer = Buffer.from(jsonStr);

    ipfs.add(buffer, (err, ipfsHash) => {
        if (err) {
            reject(err);
        } else {
            const hash = ipfsHash[0].path;

            resolve(hash);
        }
    });
});

const getIPFS = (ipfs, ipfsHash) => new Promise((resolve) => {
    ipfs.get(ipfsHash, (err, files) => {
        const buf = files[0].content;
        resolve(buf.toString());
    });
});

function Cyber(nodeUrl, ipfs) {
    const self = this;

    let defaultAccount = null;


    self.setChainId = (newChainId) => {
        chainId = newChainId;
    };

    self.search = function (text) {
        return new Promise((resolve) => {
            saveInIPFS(ipfs, text)
                .then(cid => axios({
                    method: 'get',
                    url: `${nodeUrl}/search?cid=${cid}`,
                })).then((data) => {

                    const cids = data.data.result.cids;
                    const links = cids.map(cid => ({ ...cid, hash: cid.rank }));

                    const itemsPromises = links.map(item => {
                        return Promise.all([
                            getIPFS(ipfs, item.cid),
                            Promise.resolve(item)
                        ]).then(([content, _item]) => {
                            return {
                                ..._item,
                                content
                            }
                        });
                    });

                    Promise.all(itemsPromises).then(items => {
                        resolve(items)
                    });
                })
                .catch(error => resolve([]));
        });
    };


    function addTransactionLog(address, txHash, status) {
        const jsonStr = localStorage.getItem(`cyb_transactions${address}`) || '[]';
        const transactions = JSON.parse(jsonStr);

        const newItem = {
            txHash,
            date: new Date(),
            type: 'cyber',
            status: 'pending',
        };
        const newTransactions = transactions.concat([newItem]);

        localStorage.setItem(`cyb_transactions${address}`, JSON.stringify(newTransactions));
    }

    self.link = (from, to, address = '') => Promise.all([
        saveInIPFS(ipfs, from),
        saveInIPFS(ipfs, to),
    ]).then(([_from, _to]) => axios({
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
            fromCid: _from,
            toCid: _to,
            type: 'link',
        };

        return axios({
            method: 'post',
            url: `${nodeUrl}/link`,
            data: builder.buildAndSignTxRequest(linkRequest, __accounts[address].privateKey, chainId),
        }).then(data => {
            console.log('Link results: ', data);

            addTransactionLog(address, data.data.hash, 'pending');
        }).catch(error => {
            console.log('Cannot link', error);

            // addTransactionLog(address, data.data.hash, 'fail');
        });
    }));

    self.claimFunds = function (address, amount) {
        return axios({
            method: 'get',
            url: `${claimNodeUrl}/claim?address=${address}&amount=${amount}`,
        }).then((response) => {
            console.log(`Claimed ${amount} for address ${address}`, response);
        });
    };

    let __setDefaultAddress;

    self.getDefaultAddress = () => new Promise((resolve) => {
        __setDefaultAddress = resolve;

        axios({
            method: 'get',
            url: `${nodeUrl}/account?address=${defaultAccount}`,
        }).then(response => response.data.result).then((data) => {
            let balance = 0;

            if (data && data.account && data.account.account_number >= 0) {
                balance = data.account.coins[0].amount;
            }

            resolve({
                address: defaultAccount,
                balance: +balance,
            });
        });
    });

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
            const { privateKey } = __accounts[defaultAddress];
            const tx = builder.buildAndSignTxRequest(sendRequest, privateKey, chainId);

//            console.log(tx);
            return axios({
                method: 'post',
                url: `${nodeUrl}/send`,
                data: tx,
            }).then(data => console.log('Send results: ', data)).catch(error => console.log('Cannot send', error));
        });
    };
}

export default Cyber;

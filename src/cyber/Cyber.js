import * as axios from 'axios';
import {
    create as createCyberdAccount,
    importAccount as importCyberdAccount,
    recover as recoverCyberdAccount,
} from './crypto';

import builder from './builder';
import { getBalanceByAddress } from '../redux/wallet';

const Unixfs = require('ipfs-unixfs');
const { DAGNode, util: DAGUtil } = require('ipld-dag-pb');

const codec = require('./codec');

export const lotteryHash = 'QmWtLKDNaDsah2i8PBkJKFNx6xt1vALiE4qNoMXzxfW2xQ';

let chainId;

let __accounts = {};

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

const getIpfsHash = (ipfs, string) => new Promise((resolve, reject) =>  {
    const unixFsFile = new Unixfs('file', Buffer.from(string));
    const buffer = unixFsFile.marshal();

    DAGNode.create(buffer, (err, dagNode) => {
        if (err) {
            reject(new Error('Cannot create ipfs DAGNode'));
        }

        DAGUtil.cid(dagNode, (error, cid) => {
            resolve(cid.toBaseEncodedString());
        });
    });
});

function Cyber(nodeUrl, ipfs, wsUrl) {
    const self = this;

    let defaultAccount = null;

    self.setChainId = (newChainId) => {
        chainId = newChainId;
    };

    self.searchCids = text => new Promise((resolve) => {
        getIpfsHash(ipfs, text)
            .then(cid => axios({
                method: 'get',
                url: `${nodeUrl}/search?cid="${cid}"`,
            })).then((data) => {
                const { cids } = data.data.result;

                resolve(cids);
            })
            .catch(error => resolve([]));
    });

    function addTransactionLog(address, txHash, status) {
        const jsonStr = localStorage.getItem('cyb_transactions') || '{}';
        const transactions = JSON.parse(jsonStr);

        if (!transactions[address]) {
            transactions[address] = [];
        }

        const newItem = {
            txHash,
            date: new Date(),
            type: 'cyber',
            status: 'pending',
        };

        transactions[address] = transactions[address].concat([newItem]);

        localStorage.setItem('cyb_transactions', JSON.stringify(transactions));
    }

    self.link = (from, to, address = '') => Promise.all([
        saveInIPFS(ipfs, from),
        saveInIPFS(ipfs, to),
    ]).then(([_from, _to]) => axios({
        method: 'get',
        url: `${nodeUrl}/account?address="${address}"`,
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

        const txRequest = builder.buildAndSignTxRequest(linkRequest, __accounts[address].privateKey, chainId);
        const signedLinkHex = codec.hex.stringToHex(JSON.stringify(txRequest));

        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: `${nodeUrl}/submit_signed_link?data="${signedLinkHex}"`,
            }).then(data => {
                if (data.data.result.code != 0) {
                    reject();
                    return;
                }
                console.log('Link results: ', data);

                addTransactionLog(address, data.data.hash, 'pending');
                resolve(data);
            }).catch(error => {
                console.log('Cannot link', error);
                reject();
                // addTransactionLog(address, data.data.hash, 'fail');
            });
        });
    }));

    let __setDefaultAddress;

    self.getDefaultAddress = () => new Promise((resolve) => {
        __setDefaultAddress = resolve;

        axios({
            method: 'get',
            url: `${nodeUrl}/account?address="${defaultAccount}"`,
        }).then(response => response.data.result).then((data) => {
            let balance = 0;

            if (data && data.account && data.account.account_number >= 0) {
                balance = data.account.coins[0].amount;
            }

            axios({
                method: 'get',
                url: `${nodeUrl}/account_bandwidth?address="${defaultAccount}"`,
            }).then(res => {
                resolve({
                    remained: res.data.result.remained,
                    max_value: res.data.result.max_value,
                    address: defaultAccount,
                    balance: +balance,
                });
            });

        });
    });

    self.setDefaultAccount = function (_address) {
        defaultAccount = _address;
        if (__setDefaultAddress) { __setDefaultAddress(defaultAccount); }
    };

    self.getStatistics = () => new Promise((resolve) => {
        const indexStatsPromise = axios({
            method: 'get',
            url: `${nodeUrl}/index_stats`,
        }).then(response => response.data.result);

        const stakingPromise = axios({
            method: 'get',
            url: `${nodeUrl}/staking/pool`,
        }).then(response => response.data.result);

        const bandwidthPricePromise = axios({
            method: 'get',
            url: `${nodeUrl}/current_bandwidth_price`,
        }).then(response => response.data.result);

        const latestBlockPromise = axios({
            method: 'get',
            url: `${nodeUrl}/block`,
        }).then(response => response.data.result);

        Promise.all([indexStatsPromise, stakingPromise, bandwidthPricePromise, latestBlockPromise])
            .then(([indexStats, staking, bandwidthPrice, latestBlock]) => {
                const response = {
                    ...indexStats,
                    bondedTokens: staking.bonded_tokens,
                    notBondedTokens: staking.not_bonded_tokens,
                    bandwidthPrice: bandwidthPrice.price,
                    txCount: latestBlock.block_meta.header.total_txs,
                };

                resolve(response);
            });
    });

    let websocket;
    const listenNewBlock = (cb) => {
        websocket = new WebSocket(wsUrl);

        websocket.onopen = () => {
            websocket.send(JSON.stringify({
                "method": "subscribe",
                "params": ["tm.event='NewBlockHeader'"],
                "id": "1",
                "jsonrpc": "2.0",
            }));
        };

        websocket.onmessage = (event) => {
            cb(event);
        };
    };

    self.onNewBlock = (cb) => {
        if (websocket) {
            websocket.onclose = () => {
                listenNewBlock(cb);
            };

            websocket.close();
        } else {
            listenNewBlock(cb);
        }
    };

    self.unsubscribeNewBlock = () => {
        if (websocket) {
            websocket.close();
            websocket = null;
        }
    };

    self.getAccounts = function () {
        return new Promise((resolve) => {
            __accounts = JSON.parse(localStorage.getItem('cyberAccounts') || '{}');

            Promise.all(
                Object.keys(__accounts).map(address => axios({
                    method: 'get',
                    url: `${nodeUrl}/account?address="${address}"`,
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
    });

    self.sendFunds = function (defaultAddress, recipientAddress, amount) {
        return axios({
            method: 'get',
            url: `${nodeUrl}/account?address="${defaultAddress}"`,
        }).then((response) => {
            if (!response.data.result) { return false; }

            return response.data.result.account;
        }).then((account) => {
            if (!account) { return; }

            const acc = {
                address: account.address,
                chain_id: chainId,
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

            const txRequest = builder.buildAndSignTxRequest(sendRequest, __accounts[defaultAddress].privateKey, chainId);
            const signedSendHex = codec.hex.stringToHex(JSON.stringify(txRequest));

            return axios({
                method: 'get',
                url: `${nodeUrl}/submit_signed_send?data="${signedSendHex}"`,
            }).then(data => console.log('Send results: ', data)).catch(error => console.log('Cannot send', error));
        });
    };

    self.getValidators = () => new Promise(resolve => axios({
        method: 'get',
        url: `${nodeUrl}/staking/validators`,
    }).then((response) => {
        resolve(response.data.result);
    }).catch((e) => {}));

    self.checkLotteryTicket = ticketAddress => new Promise((resolve) => {
        ipfs.files.get(lotteryHash, (err, files) => {
            const lotteryJson = files[0].content.toString('utf8');
            const lottery = JSON.parse(lotteryJson);

            const result = lottery[ticketAddress];

            const lotteryResult = {
                addressEth: ticketAddress,
                balanceEth: 0,
                addressCyberd: result ? result.address : '',
                balanceCyberd: result ? result.balance : 0,
            };

            getBalanceByAddress(ticketAddress)
                .then((balanceEth) => {
                    lotteryResult.balanceEth = balanceEth;

                    resolve(lotteryResult);
                })
                .catch((error) => {
                    console.log(`Cant get eth balance for ${ticketAddress}. Error: ${error}`);

                    resolve(lotteryResult);
                });
        });
    });
}

export default Cyber;

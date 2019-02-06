import * as axios from 'axios';
import {
    create as createCyberdAccount,
    importAccount as importCyberdAccount,
    recover as recoverCyberdAccount,
} from './crypto';

import builder from './builder';

const nodeUrl2 = 'http://earth.cybernode.ai:34660'; // we need more endopints

let chainId = 'euler-dev0';
const defaultAmount = 10000;

let __accounts = {};

const IPFS = require('ipfs-api');
const codec = require('./codec');


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

function Cyber(nodeUrl, ipfs, wsUrl) {
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
                    url: `${nodeUrl}/search?cid="${cid}"`,
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
        axios({
            method: 'get',
            url: `${nodeUrl}/index_stats`,
        }).then(response => response.data.result).then(stats => {
            axios({
                method: 'get',
                url: `${nodeUrl}/status`,
            }).then(r => r.data.result).then((data) => {
                resolve({ ...stats, latest_block_time: data.sync_info.latest_block_time});
            });
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
    })

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

//            console.log(tx);
            return axios({
                method: 'get',
                url: `${nodeUrl}/submit_signed_send?data="${signedSendHex}"`,
            }).then(data => console.log('Send results: ', data)).catch(error => console.log('Cannot send', error));
        });
    };

    self.getValidators = () => new Promise((resolve) => {
        // debugger
        // return axios({
        //     method: 'get',
        //     url: `${nodeUrl2}/staking/validators`,
        // }).then((response) => {
        //     debugger
        // }).catch((e) => {
        //     debugger
        // })

        resolve([
{
operator_address: "cybervaloper1rqudjcrdwqedffxufmqgsleuguhm7pkayku5pz",
consensus_pubkey: "cybervalconspub1zcjduepqwnhueh2trsy0uymxhsna5d6kpnqfw98wlp27ywq36wx476ea04mskuc2th",
jailed: false,
status: 2,
tokens: "10000000",
delegator_shares: "10000000.000000000000000000",
description: {
moniker: "hlb",
identity: "",
website: "",
details: ""
},
bond_height: "0",
unbonding_height: "0",
unbonding_time: "1970-01-01T00:00:00Z",
commission: {
rate: "0.100000000000000000",
max_rate: "0.200000000000000000",
max_change_rate: "0.010000000000000000",
update_time: "0001-01-01T00:00:00Z"
}
},
{
operator_address: "cybervaloper1xj6sy8x3799s2pv0jtqjgkthdg72le6h20fpl2",
consensus_pubkey: "cybervalconspub1zcjduepqr2vh33upn9029gtcu4k55z7fzexzz3dz7km3td2c93fjkcl9hvnsk4svwv",
jailed: false,
status: 2,
tokens: "10000000",
delegator_shares: "10000000.000000000000000000",
description: {
moniker: "litvintech-support-node-2",
identity: "",
website: "",
details: ""
},
bond_height: "4039",
unbonding_height: "0",
unbonding_time: "1970-01-01T00:00:00Z",
commission: {
rate: "0.100000000000000000",
max_rate: "0.200000000000000000",
max_change_rate: "0.010000000000000000",
update_time: "2019-01-31T10:35:18.372516994Z"
}
},
{
operator_address: "cybervaloper18wn5kyxewwk6qh97493xtj9gufpmqserdykng9",
consensus_pubkey: "cybervalconspub1zcjduepqknkuf2sgwfawg4wmewcudxl0gp9kkg785q4y02m8g8tdrf4ayy4qk0p6u9",
jailed: false,
status: 2,
tokens: "10000000",
delegator_shares: "10000000.000000000000000000",
description: {
moniker: "giraffe",
identity: "",
website: "",
details: ""
},
bond_height: "240084",
unbonding_height: "0",
unbonding_time: "1970-01-01T00:00:00Z",
commission: {
rate: "0.100000000000000000",
max_rate: "0.200000000000000000",
max_change_rate: "0.010000000000000000",
update_time: "2019-02-05T21:28:00.119565501Z"
}
},
{
operator_address: "cybervaloper1gs92s58t6rkallnml8ufdzrz3038dcylreq5wt",
consensus_pubkey: "cybervalconspub1zcjduepqv63rrenec78qphtm0sgxflxqusla0pv9fnpxy2959f04qartfaaqas9z0e",
jailed: false,
status: 2,
tokens: "10000000",
delegator_shares: "10000000.000000000000000000",
description: {
moniker: "punisher",
identity: "",
website: "",
details: ""
},
bond_height: "15447",
unbonding_height: "0",
unbonding_time: "1970-01-01T00:00:00Z",
commission: {
rate: "0.100000000000000000",
max_rate: "0.200000000000000000",
max_change_rate: "0.010000000000000000",
update_time: "2019-01-31T16:49:33.073108564Z"
}
},
{
operator_address: "cybervaloper1jst67u54vquzvun3dawpmpwyx5ar8mayeyhlt9",
consensus_pubkey: "cybervalconspub1zcjduepq0ggwd5ukm6xn730wuq7lxkdesu4nwdwv2sryf955tmjhpfh27hpquww42w",
jailed: true,
status: 1,
tokens: "9950100",
delegator_shares: "10000000.000000000000000000",
description: {
moniker: "zlobabah",
identity: "",
website: "",
details: ""
},
bond_height: "217394",
unbonding_height: "245279",
unbonding_time: "2019-02-27T00:25:23.538631515Z",
commission: {
rate: "0.100000000000000000",
max_rate: "0.200000000000000000",
max_change_rate: "0.010000000000000000",
update_time: "2019-02-01T13:47:07.76959103Z"
}
},
{
operator_address: "cybervaloper14d92r4svhl4qa3g6q48tjekarw2kt67nvej7xc",
consensus_pubkey: "cybervalconspub1zcjduepqg293l6lfad3qtu845etwkyets06d3g5y0sncfa3yv4l60h89hmqs9v3mra",
jailed: false,
status: 2,
tokens: "10000000",
delegator_shares: "10000000.000000000000000000",
description: {
moniker: "asadovka-validator",
identity: "",
website: "",
details: ""
},
bond_height: "1759",
unbonding_height: "0",
unbonding_time: "1970-01-01T00:00:00Z",
commission: {
rate: "0.100000000000000000",
max_rate: "0.500000000000000000",
max_change_rate: "0.010000000000000000",
update_time: "2019-01-31T09:10:01.09118142Z"
}
},
{
operator_address: "cybervaloper1hmkqhy8ygl6tnl5g8tc503rwrmmrkjcq4xvhhf",
consensus_pubkey: "cybervalconspub1zcjduepqfp7l7m3m9am9ufjs0ctff3axzyutqrv5tqesejgkm73hw2m7cnxs4aezy5",
jailed: false,
status: 2,
tokens: "10000000",
delegator_shares: "10000000.000000000000000000",
description: {
moniker: "SaveTheAles",
identity: "",
website: "cybercongress.ai",
details: "trusted"
},
bond_height: "493",
unbonding_height: "0",
unbonding_time: "1970-01-01T00:00:00Z",
commission: {
rate: "0.100000000000000000",
max_rate: "0.200000000000000000",
max_change_rate: "0.010000000000000000",
update_time: "2019-01-31T08:38:57.457922449Z"
}
},
{
operator_address: "cybervaloper1hlu0kqwvxmhjjsezr00jdrvs2k537mqha2qdrw",
consensus_pubkey: "cybervalconspub1zcjduepqn3nkc2n2qgrcank04updfpgzjnu8nfm6pnpe436mg2vn8jc06r9s9skp9k",
jailed: false,
status: 2,
tokens: "9990000",
delegator_shares: "10000000.000000000000000000",
description: {
moniker: "cybernode",
identity: "",
website: "",
details: ""
},
bond_height: "63773",
unbonding_height: "45017",
unbonding_time: "2019-02-22T09:31:39.42390197Z",
commission: {
rate: "0.100000000000000000",
max_rate: "0.200000000000000000",
max_change_rate: "0.010000000000000000",
update_time: "2019-01-31T13:43:22.625437248Z"
}
},
{
operator_address: "cybervaloper16ge9uqpqf78jdt0uz58ycalhtg59w77qlu2453",
consensus_pubkey: "cybervalconspub1zcjduepqgqmcr469243jhwdd9sjahdm7vj9rx4p0lgs58m8dlq86yzcx663st59vu4",
jailed: false,
status: 2,
tokens: "10000000",
delegator_shares: "10000000.000000000000000000",
description: {
moniker: "litvintech-mars",
identity: "",
website: "",
details: ""
},
bond_height: "4356",
unbonding_height: "0",
unbonding_time: "1970-01-01T00:00:00Z",
commission: {
rate: "0.100000000000000000",
max_rate: "0.200000000000000000",
max_change_rate: "0.010000000000000000",
update_time: "2019-01-31T10:44:49.239837966Z"
}
},
{
operator_address: "cybervaloper1arugkmyw3ar0dtdsqfpy9t3ngvnuapgqfae5hu",
consensus_pubkey: "cybervalconspub1zcjduepqcqefxc4helue4hwljp87hjlh4g88jlzv2jc2tt42vzu99dc33mesp9sqr9",
jailed: false,
status: 2,
tokens: "9990000",
delegator_shares: "10000000.000000000000000000",
description: {
moniker: "litvintech-moon",
identity: "",
website: "",
details: ""
},
bond_height: "164936",
unbonding_height: "16051",
unbonding_time: "2019-02-21T17:13:34.473679457Z",
commission: {
rate: "0.100000000000000000",
max_rate: "0.200000000000000000",
max_change_rate: "0.010000000000000000",
update_time: "2019-01-31T10:43:55.253281262Z"
}
},
{
operator_address: "cybervaloper1lv9myp9t677fn2368jpmlqgfgecr2kh8xz63xh",
consensus_pubkey: "cybervalconspub1zcjduepqxn4wh7wdq7ys7k9umxq9zqgdk4g6d0p7mfd67yws4g2gp7affstszq79ay",
jailed: false,
status: 2,
tokens: "9990000",
delegator_shares: "10000000.000000000000000000",
description: {
moniker: "litvintech-support-node-1",
identity: "",
website: "",
details: ""
},
bond_height: "165034",
unbonding_height: "143488",
unbonding_time: "2019-02-24T17:06:47.721047698Z",
commission: {
rate: "0.100000000000000000",
max_rate: "0.200000000000000000",
max_change_rate: "0.010000000000000000",
update_time: "2019-01-31T10:40:13.278779396Z"
}
}
])
    });
}

export default Cyber;

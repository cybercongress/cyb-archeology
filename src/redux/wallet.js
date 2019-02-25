import Web3 from 'web3';
import axios from 'axios';
import Cyber from '../cyber/Cyber';
import { navigate, goBack } from './browser';
import { setEthNetworkName } from './settings';
import { showSigner } from './signer';
import { getQuery } from '../utils';

const IPFS = require('ipfs-api');

const initState = {
    accounts: [],
    defaultAccount: '',

    password: null,
    incorrectPassword: false,

    transaction: null,
    receipt: null,

    transactions: [],

    notificationLinkCounter: 0,

    signerError: '',
};

export const reducer = (state = initState, action) => {
    switch (action.type) {
    case 'LOAD_ACCOUNTS': {
        return {
            ...state,
            accounts: action.payload,
        };
    }

    case 'SET_DEFAULT_ACCOUNT': {
        const { address } = action.payload;

        return {
            ...state,
            defaultAccount: address,
        };
    }

    case 'SET_ETH_PASSWORD': {
        return {
            ...state,
            password: action.payload,
            incorrectPassword: false,
        };
    }

    case 'SET_ETH_PASSWORD_FAIL': {
        return {
            ...state,
            incorrectPassword: true,
        };
    }


    case 'SET_ETH_TX': {
        const { transaction, receipt } = action.payload;

        return {
            ...state,
            transaction,
            receipt,
        };
    }


    case 'SET_ETH_TRANSACTIONS': {
        return {
            ...state,
            transactions: action.payload,
        };
    }

    case 'SET_NOTIFICATION_LINK_COUNTER_INC': {
        const prevCounter = state.notificationLinkCounter;

        return {
            ...state,
            notificationLinkCounter: prevCounter + (action.payload ? action.payload : 1),
        };
    }

    case 'SET_NOTIFICATION_LINK_COUNTER_DEC': {
        const prevCounter = state.notificationLinkCounter;

        return {
            ...state,
            notificationLinkCounter: (prevCounter > 1 ? prevCounter - 1 : 0),
        };
    }


    case 'SET_SIGNER_ERROR': {
        return {
            ...state,
            signerError: action.payload,
        };
    }

    default:
        return state;
    }
};

let eth;
let provider;
let web3;
let wv = null;

window.cyber = null;

const ZeroClientProvider = require('../preload/zero.js');

export const loadAccounts = () => (dispatch, getState) => new Promise((resolve) => {
    if (!eth) {
        return;
    }

    //     //Object.keys(__accounts).map(address => __accounts[address].address);
    // for(let n = 0; n < web3.eth.accounts.wallet.length; n++) {
    //     _accounts.push(web3.eth.accounts.wallet[n].address);
    // }
    var indexes = web3.eth.accounts.wallet._currentIndexes();
    const _accounts = indexes.map(index => {
        return web3.eth.accounts.wallet[index].address;
    });

    Promise.all(
        _accounts.map(address => new Promise((resolve) => {
            eth.getBalance(address.toLowerCase()).then((_balance) => {
                resolve({
                    balance: web3.utils.fromWei(_balance, 'ether'),
                    address: address,
                });
            });
        })),
    ).then((accounts) => {
        dispatch({
            type: 'LOAD_ACCOUNTS',
            payload: accounts,
        });
        resolve(accounts);
    });
});


const saveTransaction = (payload, txHash) => {
    const params = payload.params[0];
    const address = params.from;
    const jsonStr = localStorage.getItem('transactions') || '{}';
    const transactions = JSON.parse(jsonStr);

    if (!transactions[address]) {
        transactions[address] = [];
    }

    const newPayload = {
        ...payload,
        txHash,
        date: new Date(),
        type: 'eth',
        status: 'pending',
    };

    transactions[address] = transactions[address].concat(newPayload);

    localStorage.setItem('transactions', JSON.stringify(transactions));
};


export const setDefaultAccount = account => (dispatch) => {
    let address = '';
    let balance;
    if (!account) {
        const defaultAccount = localStorage.getItem('defaultEthAccount') || '';
        if (web3.eth.accounts.wallet.length > 0) {
            if (defaultAccount) {
                address = defaultAccount;
            } else {
                address = web3.eth.accounts.wallet[0].address;
                // Object.keys(__accounts).forEach(_address => {
                //     address = __accounts[_address].address;
                // });
            }
            balance = eth.getBalance(address);
        }
    } else {
        ({ address, balance } = account);
    }

    web3.eth.defaultAccount = address;

    if (balance && balance.then) {
        balance.then(_balance => {
            dispatch({
                type: 'SET_DEFAULT_ACCOUNT',
                payload: { address, balance: web3.utils.fromWei(_balance, 'ether') },
            });
        });
    } else {
        dispatch({
            type: 'SET_DEFAULT_ACCOUNT',
            payload: { address, balance },
        });
    }

    if (!!address) {
        localStorage.setItem('defaultEthAccount', address);
    }
};

export const importAccount = privateKey => (dispatch, getState) => new Promise((resolve) => {
    const _privateKey = privateKey.startsWith('0x') ? privateKey : `0x${privateKey}`;
    const data = web3.eth.accounts.privateKeyToAccount(_privateKey);

    // __accounts[data.address.toLowerCase()] = data;
    // localStorage.setItem('accounts', JSON.stringify(__accounts));

    web3.eth.accounts.wallet.add(data);
    web3.eth.accounts.wallet.save(getState().wallet.password);

    dispatch(loadAccounts()).then((accounts) => {
        if (accounts.length === 1) {
            dispatch(setDefaultAccount());
        }
        resolve(data);
    });
});

export const createAccount = () => (dispatch, getState) => {
    const data = web3.eth.accounts.create();

    // __accounts[data.address.toLowerCase()] = data;
    // localStorage.setItem('accounts', JSON.stringify(__accounts));
    web3.eth.accounts.wallet.add(data);
    web3.eth.accounts.wallet.save(getState().wallet.password);

    dispatch(loadAccounts()).then((accounts) => {
        if (accounts.length === 1) {
            dispatch(setDefaultAccount());
        }

    });
};

export const changePassword = (newPassword) => (dispatch, getState) => {
    web3.eth.accounts.wallet.save(newPassword);

    dispatch({
        type: 'SET_ETH_PASSWORD',
        payload: newPassword,
    });
};

export const deleteAccount = address => (dispatch, getState) => new Promise((resolve) => {

    // delete __accounts[address.toLowerCase()];
    // localStorage.setItem('accounts', JSON.stringify(__accounts));

    const _address = address.toLowerCase();

    const index = web3.eth.accounts.wallet[_address].index;
    web3.eth.accounts.wallet.remove(index);
    web3.eth.accounts.wallet.save(getState().wallet.password);
    web3.eth.accounts.wallet.load(getState().wallet.password);

    const { defaultAccount } = getState().wallet;

    if (address.toLowerCase() === defaultAccount.toLowerCase()) {
        dispatch(setDefaultAccount());
    }

    resolve(address);
});


export const sendFunds = (_from, to, amount, _confirmationNumber = 3) => dispatch => new Promise((resolve) => {
    dispatch(showSigner({
        fromAddress: _from,
        toAddress: to,
        gasPrice: 20,
        gasLimit: 210000,
        value: amount,
    })).then((data) => {
        console.log('>>', data, web3.utils.toWei(`${data.gasPrice}`, 'Gwei'));
        eth.sendTransaction({
            from: _from,
            to,
            value: web3.utils.toWei(amount.toString(), 'ether'),
            gasPrice: web3.utils.toWei(`${data.gasPrice}`, 'Gwei'),
            gas: data.gasLimit,
        }).on('transactionHash', (hash) => {
            console.log('transactionHash', hash);
            saveTransaction({
                params: [{
                    from: _from.toLowerCase(),
                    toAddress: to,
                    gasPrice: 20,
                    gasLimit: 210000,
                    value: amount,
                }],
            }, hash);

            dispatch({
                type: 'SET_NOTIFICATION_LINK_COUNTER_INC',
            });

        })
            .on('receipt', (receipt) => {
                console.log('receipt', receipt);
            })
            .on('confirmation', (confirmationNumber, receipt) => {
                console.log('confirmation', confirmationNumber, receipt);
                if (confirmationNumber === _confirmationNumber) {
                    resolve();
                }
            });
    }).catch((e) => {
        console.log('send error', e);
    });
});

export const getEthStatus = url => new Promise((resolve) => {
    axios.post(url, {
        jsonrpc: '2.0', id: 1, method: 'eth_protocolVersion', params: [],
    }, {
        headers: { 'Content-type': 'application/json' },
        timeout: 4 * 1000,
    })
        .then(resonce => resonce.data)
        .then((data) => {
            if (url.indexOf('localhost') !== -1 || url.indexOf('127.0.0.1') !== -1) {
                resolve('local');
            } else {
                resolve('remote');
            }
        }).catch((e) => {
            resolve('fail');
        });
});


const calculateGasLimit = (payload) => {
    const params = payload.params[0];
    let gasLimitPromise = Promise.resolve(210000);

    if (!params.gas) {
        gasLimitPromise = new Promise((resolve) => {
            web3.eth.estimateGas({
                ...params,
            }, (error, gasLimitValue) => {
                if (error) {
                    resolve(2000000);
                } else {
                    resolve(gasLimitValue);
                }
            });
        });
    } else {
        gasLimitPromise = Promise.resolve(web3.utils.hexToNumber(params.gas));
    }

    return gasLimitPromise;
};

const calculateGasPrice = (payload) => {
    const params = payload.params[0];
    const initialGasPrice = params.gasPrice ? web3.utils.fromWei(params.gasPrice, 'Gwei') : 0;

    let gasPricePromise = Promise.resolve(initialGasPrice);

    if (!params.gasPrice) {
        gasPricePromise = new Promise((resolve) => {
            web3.eth.getGasPrice((error, value) => {
                if (error) { // TOOD: problem with gas calculation
                    resolve(2);
                } else {
                    resolve(web3.utils.fromWei(value, 'Gwei'));
                }
            });
        });
    }

    return gasPricePromise;
};

export const receiveMessage = e => (dispatch, getState) => {
    if (!provider) {
        return;
    }
    if (e.channel === 'web3_eth') {
        const payload = e.args[0];

        wv = e.target;

        if (payload.method === 'eth_sendTransaction') {
            const params = payload.params[0];
            const value = params.value ? +web3.utils.fromWei(web3.utils.toBN(params.value), 'ether') : 0;

            Promise.all([
                calculateGasLimit(payload),
                calculateGasPrice(payload),
            ]).then(([gasLimit, gasPrice]) => dispatch(showSigner({
                fromAddress: params.from,
                toAddress: params.to,
                gasPrice,
                gasLimit,
                value,
            }))).then((data) => {
                if (data.gasLimit) {
                    payload.params[0].gas = web3.utils.numberToHex(+data.gasLimit);
                }

                if (data.gasPrice) {
                    payload.params[0].gasPrice = web3.utils.numberToHex(web3.utils.toWei(`${data.gasPrice}`, 'Gwei'));
                }
                provider.sendAsync(payload, (err, result) => {
                    if (!err) {
                        saveTransaction(payload, result.result);
                        if (!wv) {
                            return;
                        }
                        wv.send('web3_eth_call', result);

                        dispatch({
                            type: 'SET_NOTIFICATION_LINK_COUNTER_INC',
                        });
                    } else {
                        dispatch({
                            type: 'SET_SIGNER_ERROR',
                            payload: err.message,
                        });
                    }
                });
            }).catch(() => {
                if (!wv) {
                    return;
                }
                wv.send('web3_eth_call_reject', payload);
            });
        } else {
            provider.sendAsync(payload, (error, result) => {
                wv.send('web3_eth_call', result);
            });
        }
    }
    if (e.channel === 'cyber') {
        const method = e.args[0].method;
        const params = e.args[0].params;

        const wvCyber = e.target;


        if (method !== 'subscribe'){
            window.cyber[method].apply(window.cyber, params).then((result) => {
                wvCyber.send(`cyber_${method}`, result);
            }).catch(e => {
                wvCyber.send(`cyber_${method}_error`);
            });
        } else {
            window.cyber.onNewBlock((event) => {
                wvCyber.send('cyber_subscribe_event', JSON.parse(event.data));
            });
        }

    }
    if (e.channel === 'ipfs') {
        const method = e.args[0].method;
        const wvCyber = e.target;

        if (method === 'getGateway') {
            const gateway = getState().settings.IPFS_END_POINT;

            wvCyber.send(`ipfs_gateway`, gateway);
        }
        if (method === 'getIpfsConfig') {
            const config = getState().settings.ipfsWrite;

            wvCyber.send(`ipfs_config`, config);
        }
    }
    if (e.channel === 'params') {
        const method = e.args[0].method;
        const params = e.args[0].params;

        const wvCyber = e.target;


        if (method === 'getQuery') {
            wvCyber.send(`params_${method}`, getQuery());
        }
    }
};

export const init = endpoint => (dispatch, getState) => {
    provider = new ZeroClientProvider({
        rpcUrl: endpoint,
        getAccounts(cb) {
            // show address with low and upper literal
            // const accounts = Object.keys(__accounts).map(address => __accounts[address].address.toLowerCase());

            if (!getState().wallet.password) {
                dispatch(navigate('wallet.cyb'));
            }

            const accounts = getState().wallet.defaultAccount ? [getState().wallet.defaultAccount.toLowerCase()] : [];

            cb(null, accounts);
        },

        getPrivateKey(address, cb) {
            // const pk = __accounts[address].privateKey;
            const pk = web3.eth.accounts.wallet[address].privateKey;

            if (pk) {
                const privateKey = new Buffer(pk.substr(2), 'hex');
                cb(null, privateKey);
            } else {
                cb('pk not found');
            }
        },
    });
    web3 = new Web3(provider);
    ({ eth } = web3);
    provider.start();

    provider.on('data', (e, payload) => {
        const message = payload;
        const {
            method,
        } = message;

        if (wv && method && method.indexOf('_subscription') > -1) {
            // Emit subscription notification
            wv.send('web3_eth_event_data', payload);
        }
    });

    web3.eth.net.getId((err, netId) => {
        switch (netId) {
            case 1:
                dispatch(setEthNetworkName('Main'));
                break;
            case 42:
                dispatch(setEthNetworkName('Kovan'));
                break;
            case 4:
                dispatch(setEthNetworkName('Rinkeby'));
                break;
            default:
                dispatch(setEthNetworkName(`ID: ${netId}`));
        }
    });

    const ipfsConfig = getState().settings.ipfsWrite;
    const ipfs = new IPFS(ipfsConfig);

    window.cyber = new Cyber(
        getState().settings.SEARCH_END_POINT, ipfs,
        getState().settings.CYBERD_WS_END_POINT,
    );

    if (getState().wallet.password) {
        web3.eth.accounts.wallet.load(getState().wallet.password);
    }
    dispatch(loadAccounts())
        .then(() => dispatch(setDefaultAccount()));
};

function financial(x) {
    return Number.parseFloat(x).toFixed(2);
}

export const getDefaultAccountBalance = (state) => {
    const {
        accounts,
        defaultAccount
    } = state.wallet;

    const acc = accounts.find(a => a.address === defaultAccount);

    if (!acc ) return 0;

    return financial(acc.balance);
}


export const onCopyKey = (address) => (dispatch, getState) => {
    // const account = __accounts[address.toLowerCase()];
    const account = web3.eth.accounts.wallet[address.toLowerCase()];
    const { privateKey } = account;

    navigator.clipboard.writeText(privateKey).then(function() {
        // console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
        console.error('Async: Could not copy text: ', err);
    });
}

export const login = (password) => (dispatch, getState) => {
    try {
        web3.eth.accounts.wallet.load(password);
        if (web3.eth.accounts.wallet.length === 0) {
            throw 'no accounts';
        }
        dispatch({
            type: 'SET_ETH_PASSWORD',
            payload: password,
        });
        dispatch(loadAccounts())
            .then(() => {
                dispatch(setDefaultAccount());
                // dispatch({ type: 'MOVE_BACK' });
                dispatch(goBack()); //back to page if start not from waalet
            });
    } catch (e) {
        dispatch({
            type: 'SET_ETH_PASSWORD_FAIL',
        });
    }

}

export const createPassword = (password) => (dispatch, getState) => {
    dispatch({
        type: 'SET_ETH_PASSWORD',
        payload: password,
    });
    dispatch(createAccount());

    // dispatch(login(password));
    // web3.eth.accounts.wallet.save(password);
}

export const isLoginExist = () => {
    const cryptoWallet = localStorage.getItem('web3js_wallet');

    return !!cryptoWallet;
};


export const updateStatusTransactions = () => (dispatch) => {
    if (!web3.eth.defaultAccount) {
        return;
    }

    const jsonStr = localStorage.getItem('transactions') || '{}';

    if (jsonStr) {
        const transactions = JSON.parse(jsonStr);

        Object.keys(transactions).forEach((address) => {
            transactions[address].forEach((item) => {
                if (item.status === 'pending') {
                    Promise.all([
                        // web3.eth.getTransaction(item.txHash),
                        web3.eth.getTransactionReceipt(item.txHash),
                    ]).then(([/* transaction,  */receipt]) => {
                        // https://ethereum.stackexchange.com/a/6003
                        if (receipt.blockNumber && parseInt(receipt.status, 16) === 1) {
                            item.status = 'success';
                            localStorage.setItem('transactions', JSON.stringify(transactions));
                            dispatch({
                                type: 'SET_NOTIFICATION_LINK_COUNTER_DEC',
                            });
                        }
                    });
                }
            });
        });
    }
};


export const getTransaction = hash => (dispatch) => {
    Promise.all([
        web3.eth.getTransaction(hash),
        web3.eth.getTransactionReceipt(hash),
    ]).then(([transaction, receipt]) => {
        dispatch(updateStatusTransactions());
        dispatch({
            type: 'SET_ETH_TX',
            payload: { transaction, receipt },
        });
    });
};


export const getTransactions = address => (dispatch, getState) => {
    if (!address) {
        return;
    }
    let transactions = [];

    const addressLowerCase = address.toLowerCase();
    const jsonStr = localStorage.getItem('transactions') || '{}';

    transactions = JSON.parse(jsonStr);
    if (transactions[addressLowerCase]) {
        transactions = transactions[addressLowerCase];
    } else {
        transactions = [];
    }

    const { defaultAccount: cyberAddress } = getState().cyber;

    if (cyberAddress) {
        const cyberJsonStr = localStorage.getItem('cyb_transactions') || '{}';
        let cyberTransactions = JSON.parse(cyberJsonStr);

        if (cyberTransactions[cyberAddress]) {
            cyberTransactions = cyberTransactions[cyberAddress];
        } else {
            cyberTransactions = [];
        }

        transactions = transactions.concat(cyberTransactions);
    }

    const transactionsSorted = transactions.slice(0);

    transactionsSorted.sort((a, b) => new Date(b.date) - new Date(a.date));

    dispatch({
        type: 'SET_ETH_TRANSACTIONS',
        payload: transactionsSorted,
    });
};


export const checkPendingStatusTransactions = () => (dispatch) => {
    const jsonStr = localStorage.getItem('transactions') || '{}';

    if (jsonStr) {
        const transactions = JSON.parse(jsonStr);
        let pendingTransactionsCount = 0;

        Object.keys(transactions).forEach((address) => {
            transactions[address].forEach((item) => {
                if (item.status === 'pending') {
                    pendingTransactionsCount += 1;
                }
            });
        });
        if (pendingTransactionsCount) {
            dispatch({
                type: 'SET_NOTIFICATION_LINK_COUNTER_INC',
                payload: pendingTransactionsCount,
            });
        }
    }
};


export const resend = (txHash) => (dispatch, getState) => {
    const address = getState().wallet.defaultAccount;

    if (!address || !txHash) {
        return;
    }

    const addressLowerCase = address.toLowerCase();
    const jsonStr = localStorage.getItem('transactions') || '{}';
    let transactions = JSON.parse(jsonStr);

    if (transactions[addressLowerCase]) {
        transactions = transactions[addressLowerCase];
    } else {
        transactions = [];
    }

    const payload = transactions.find(x => x.txHash === txHash);

    // TODO: show singer
};

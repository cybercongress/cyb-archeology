import Web3 from 'web3';
import axios from 'axios';
import Cyber from '../cyber/Cyber';
import { navigate, goBack } from './browser';
import { setEthNetworkName } from './settings';
//import { setBadgeTextInc } from '../components/IdBar/IdBar';
const IPFS = require('ipfs-api');

const initState = {
    accounts: [],
    defaultAccount: '',
    pendingRequest: false,
    request: null,
    lastTransactionId: null,
    txError: null,

    password: null,
    incorrectPassword: false,

    transaction: null,
    receipt: null,

    transactions: [],
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

    case 'SHOW_PENDING': {
        return {
            ...state,
            pendingRequest: true,
            request: action.payload,
            lastTransactionId: null,
        };
    }

    case 'HIDE_PENDING': {
        return {
            ...state,
            pendingRequest: false,
            request: null,
        };
    }

    case 'SHOW_TRANSACTION': {
        return {
            ...state,
            lastTransactionId: action.payload,
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

    case 'SHOW_TX_ERROR': {
        return {
            ...state,
            txError: action.payload,
        };
    }

    case 'HIDE_TX_ERROR': {
        return {
            ...state,
            txError: null,
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

    default:
        return state;
    }
};

let eth;
let provider;
let web3;
let wv = null;
let web3Reqest = null;

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

const showPending = payload => ({ type: 'SHOW_PENDING', payload });
export const hidePending = () => ({ type: 'HIDE_PENDING' });
const hideTxError = () => ({ type: 'HIDE_TX_ERROR' });

export const sendFunds = (_from, to, amount, _confirmationNumber = 3) => () => new Promise((resolve) => {

    console.log('send eth');
    console.log(_from, to, amount, web3.utils.toWei(amount, 'ether'));
    eth.sendTransaction({
        from: _from,
        to,
        value: web3.utils.toWei(amount, 'ether'),
        gas: 210000,
    }).on('transactionHash', (hash) => {
        console.log('transactionHash', hash);
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
});

export const getStatus = url => new Promise((resolve) => {
    axios.post(url, {
        jsonrpc: '2.0', id: 1, method: 'eth_protocolVersion', params: [],
    }, { timeout: 4 * 1000 })
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

export const reject = () => (dispatch, getState) => {
    dispatch(hidePending());
    dispatch(hideTxError());

    if (!wv) {
        return;
    }
    wv.send('web3_eth_call_reject', web3Reqest);
};


export const approve = (gasLimit, gasPrice) => (dispatch, getState) => {
    // todo: refactor
    if (gasLimit) {
        web3Reqest.params[0].gas = web3.utils.numberToHex(+gasLimit);
    }

    if (gasPrice) {
        web3Reqest.params[0].gasPrice = web3.utils.numberToHex(+gasPrice);
    }

    provider.sendAsync(web3Reqest, (e, result) => {
        if (!wv) {
            return;
        }
        wv.send('web3_eth_call', result);

        if (e) {
           // dispatch(hidePending());
        } else {
            saveTransaction(web3Reqest, result.result);

            dispatch({
                type: 'SHOW_TRANSACTION',
                payload: result.result,
            });
         //   dispatch(hidePending());
        }
        dispatch(hidePending());
    });
};

const showAndCaclulateSingPopup = (payload) => (dispatch, getState) => {
    web3Reqest = payload;

    dispatch(hideTxError());

    const params = payload.params[0];
    const initialGasPrice = params.gasPrice ? web3.utils.fromWei(params.gasPrice, 'Gwei') : 0;

    let gasPricePromise = Promise.resolve(initialGasPrice);
    let gasLimitPromise = Promise.resolve(params.gas);

    if (!params.gasPrice) {
        gasPricePromise = new Promise((resolve) => {
            web3.eth.getGasPrice((error, value) => {
                resolve(web3.utils.fromWei(value, 'Gwei'));
            });
        });
    }

    if (!params.gas) {
        gasLimitPromise = new Promise((resolve) => {
            web3.eth.estimateGas({
                ...params,
            }, (error, gasLimitValue) => {
                if (error) {
                    resolve('2000000');
                    dispatch({
                        type: 'SHOW_TX_ERROR',
                        payload: {
                            type: 'error',
                            message: 'Problem with gas estimation',
                        },
                    });
                } else {
                    resolve(gasLimitValue);
                }
            });
        });
    }

    Promise.all([gasPricePromise, gasLimitPromise]).then(([gasPrice, gasLimit]) => {
        payload.params[0].gas = gasLimit;
        payload.params[0].gasPrice = web3.utils.toWei(gasPrice, 'gwei');
        dispatch(showPending(payload));
    });
};

export const receiveMessage = e => (dispatch, getState) => {
    if (!provider) {
        return;
    }
    if (e.channel === 'web3_eth') {
        const payload = e.args[0];

        wv = e.target;

        if (payload.method === 'eth_sendTransaction') {
            dispatch(showAndCaclulateSingPopup(payload));
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

        window.cyber[method].apply(window.cyber, params).then((result) => {
            wvCyber.send(`cyber_${method}`, result);
        });
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

    window.cyber = new Cyber(getState().settings.SEARCH_END_POINT, ipfs);

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


export const getTransaction = hash => (dispatch) => {
    Promise.all([
        web3.eth.getTransaction(hash),
        web3.eth.getTransactionReceipt(hash),
    ]).then(([transaction, receipt]) => {
        dispatch({
            type: 'SET_ETH_TX',
            payload: { transaction, receipt },
        });
    });
};

const saveTransaction = (payload, txHash) => {
    const params = payload.params[0];
    const address = params.from;
    const jsonStr = localStorage.getItem('transactions' + address) || '[]';
    const transactions = JSON.parse(jsonStr);

    const _payload = { ...payload, txHash, date: new Date(), type: 'eth', status: 'pending' };
    const _transactions = transactions.concat(_payload);

    localStorage.setItem('transactions' + address , JSON.stringify(_transactions));
};

export const getTransactions = address => (dispatch, getState) => {
    if (!address) {
        return;
    }
    let transactions = [];

    const addressLowerCase = address.toLowerCase();
    const jsonStr = localStorage.getItem(`transactions${addressLowerCase}`) || '[]';

    transactions = JSON.parse(jsonStr);

    const { defaultAccount: cyberAddress } = getState().cyber;

    if (cyberAddress) {
        const cyberJsonStr = localStorage.getItem(`cyb_transactions${cyberAddress}`) || '[]';
        const cyberTransactions = JSON.parse(cyberJsonStr);

        transactions = transactions.concat(cyberTransactions);
    }

    const transactionsSorted = transactions.slice(0);

    transactionsSorted.sort((a, b) => new Date(b.date) - new Date(a.date));

    dispatch({
        type: 'SET_ETH_TRANSACTIONS',
        payload: transactionsSorted,
    });
};

export const updateStatusTransactions = address => () => {
    if (!address) {
        return;
    }
    
	const addressLowerCase = address.toLowerCase();
    const jsonStr = localStorage.getItem(`transactions${addressLowerCase}`) || '[]';
	
	if (jsonStr) {
		let transactions = JSON.parse(jsonStr);
		/* transactions.filter(item => {
			return item.status == 'pending'
		}) */
		transactions.map(item => {
			if (item.status == 'pending') {
				/* const transaction = web3.eth.getTransaction(item.txHash);
				const receipt = web3.eth.getTransactionReceipt(item.txHash); */
				const { transaction, receipt } = getTransaction(item.txHash);
				//console.log(transaction, receipt);
				// https://ethereum.stackexchange.com/a/6003
				if (transaction.gas == receipt.gasUsed) {	
					item.status = 'success';
					//setBadgeTextInc();
				}
			}
		});
		
		localStorage.setItem('transactions' + addressLowerCase, JSON.stringify(transactions));
	}
};

export const resend = (txHash) => (dispatch, getState) => {
    const address = getState().wallet.defaultAccount;
    if (!address || !txHash) return;

    const _address = address.toLowerCase();
    const jsonStr = localStorage.getItem('transactions' + _address) || '[]';
    const transactions = JSON.parse(jsonStr);

    const payload = transactions.find(x => x.txHash === txHash);

    dispatch(showAndCaclulateSingPopup(payload));
}

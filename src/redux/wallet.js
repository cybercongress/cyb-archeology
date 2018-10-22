import Web3 from "web3";
import SignerProvider from 'ethjs-provider-signer';
import {sign} from 'ethjs-signer';
import Cyber from '../cyber/Cyber'

import axios from 'axios';

const initState = {
    accounts: [],
    defaultAccount: '',
    pendingRequest: false,
    request: null
}

export const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOAD_ACCOUNTS': {
            return {
                ...state,
                accounts: action.payload,
            }
        }

        case 'SET_DEFAULT_ACCOUNT': {
            return {
                ...state,
                defaultAccount: action.payload,
            }
        }

        case 'SHOW_PENDING': {
            return {
                ...state,
                pendingRequest: true,
                request: action.payload
            }
        }

        case 'HIDE_PENDING': {
            return {
                ...state,
                pendingRequest: false,
                request: null
            }
        }

        default:
            return state;
    }
}

let eth;
let provider;
let web3;

let __accounts = {};

//let cyber;

window.cyber = null;

export const init = (endpoint) => (dispatch, getState) => {
    __accounts = JSON.parse(localStorage.getItem('accounts') || '{}');

    provider = new SignerProvider(endpoint, {
        signTransaction: (rawTx, cb) => {
            const privateKey = __accounts[rawTx.from];
            cb(null, sign(rawTx, privateKey))
        },
        accounts: (cb) => {
            cb(null, Object.keys(__accounts))
        },
    });

    web3 = new Web3(provider);
    eth = web3.eth;

    if (Object.keys(__accounts).length > 0) {
        const address = Object.keys(__accounts)[0];
        dispatch(setDefaultAccount(address))
    }

    window.cyber = new Cyber(getState().settings.SEARCH_END_POINT)
}

export const loadAccounts = () => (dispatch, getState) => {
    if (!eth) return;

    eth.getAccounts((err, _accounts) => {
        Promise.all(
            _accounts.map(address => new Promise(resolve => {
                eth.getBalance(address)
                    .then(balance => resolve({
                        balance: web3.utils.fromWei(balance, 'ether'),
                        address
                    }))
            }))
        ).then(accounts => {
            dispatch({
                type: 'LOAD_ACCOUNTS',
                payload: accounts,
            })
        })
    })

}

export const createAccount = () => (dispatch, getState) => new Promise(resolve => {
    const data = web3.eth.accounts.create();
    __accounts[data.address.toLowerCase()] = data.privateKey;
    localStorage.setItem('accounts', JSON.stringify(__accounts));
    resolve(data);
})

export const importAccount = (privateKey) => (dispatch, getState) => new Promise(resolve => {
    const data = web3.eth.accounts.privateKeyToAccount('0x' + privateKey);

    __accounts[data.address.toLowerCase()] = data.privateKey;
    localStorage.setItem('accounts', JSON.stringify(__accounts));
    resolve(data);
})

export const deleteAccount = (address) => (dispatch, getState) => new Promise(resolve => {
    delete __accounts[address.toLowerCase()];
    localStorage.setItem('accounts', JSON.stringify(__accounts));

    const {defaultAccount} = getState().wallet;
    if (address.toLowerCase() === defaultAccount.toLowerCase()) {
        dispatch(setDefaultAccount());
    }

    resolve(address);
})

export const setDefaultAccount = (_address = '') => (dispatch, getState) => {
    let address = _address;
    if (_address === '') {
        if (Object.keys(__accounts).length > 0) {
            address = Object.keys(__accounts)[0];
        }
    }

    web3.eth.defaultAccount = address;
    dispatch({
        type: 'SET_DEFAULT_ACCOUNT',
        payload: address
    })
}

const showPending = (payload) => ({type: 'SHOW_PENDING', payload: payload });
const hidePending = () => ({type: 'HIDE_PENDING'});

let wv = null;
let web3Reqest = null;

export const approve = (gas) => (dispatch, getState) => {

    web3Reqest.params[0].gas = gas;

    provider.sendAsync(web3Reqest, (e, result) => {
        if (!wv) {
            return
        }
        wv.send('web3_eth_call', {
            ...web3Reqest,
            ...result
        });
        dispatch(hidePending())
    })
}

export const sendMony = (_from, to, amount, _confirmationNumber = 3) => (dispatch, getState) => new Promise(resolve => {
    console.log('send mony');
    console.log(_from, to, amount, web3.utils.toWei(amount, "ether"))
    eth.sendTransaction({
        from: _from,
        to,
        value: web3.utils.toWei(amount, "ether"),
        gas: 21000
    }).on('transactionHash', function (hash) {
        console.log('transactionHash', hash);
    })
        .on('receipt', function (receipt) {
            console.log('receipt', receipt);
        })
        .on('confirmation', function (confirmationNumber, receipt) {
            console.log('confirmation', confirmationNumber, receipt);
            if (confirmationNumber === _confirmationNumber) {
                resolve();
            }
        })
})

export const getStatus = (url) => new Promise((resolve) => {
    axios.post(url, {"jsonrpc": "2.0", "id": 1, "method": "eth_protocolVersion", "params": []}, {timeout: 4 * 1000})
        .then(resonce => resonce.data)
        .then(data => {
            if (url.indexOf('localhost') !== -1 || url.indexOf('127.0.0.1') !== -1) {
                resolve('local')
            } else {
                resolve('remote')
            }
        }).catch(e => {
        resolve('fail')
    })
    // return eth.getProtocolVersion();
})

export const reject = () => (dispatch, getState) => {
    dispatch(hidePending())
}

export const receiveMessage = (e) => (dispatch, getState) => {

    if (!provider) return;
    if (e.channel === 'web3_eth') {

        const payload = e.args[0]
        wv = e.target;

        if (payload.method == 'eth_sendTransaction') {
            web3Reqest = payload;
            dispatch(showPending(payload));
        } else {
            provider.sendAsync(payload, (e, result) => {
                wv.send('web3_eth_call', {...payload, ...result});
            })
        }
    }
    if (e.channel === 'cyber') {

        const method = e.args[0].method;
        const params = e.args[0].params;

        const wvCyber = e.target;
        window.cyber[method].apply(window.cyber, params).then((result) => {
            wvCyber.send('cyber_'+method, result);
        });
        console.log('e---->', e);
    }
}

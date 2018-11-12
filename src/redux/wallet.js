
import Web3 from "web3";
import SignerProvider from 'ethjs-provider-signer';
import {sign} from 'ethjs-signer';
import Cyber from '../cyber/Cyber'

import axios from 'axios';
// var Buffer = require('buffer/').Buffer

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

const ZeroClientProvider = require('./zero.js')

export const init = (endpoint) => (dispatch, getState) => {
    __accounts = JSON.parse(localStorage.getItem('accounts') || '{}');

    // const http = new Web3.providers.HttpProvider(endpoint)

    // provider = new SignerProvider(endpoint, {
    //     signTransaction: (rawTx, cb) => {
    //         debugger
    //         const privateKey = __accounts[rawTx.from.toLowerCase()];
    //         debugger
    //         cb(null, sign(rawTx, privateKey))
    //     },
    //     accounts: (cb) => {
    //         cb(null, Object.keys(__accounts))
    //     },
    // });

    // // provider.send = function(payload) {
    // //     return http.send(payload);
    // // }

    // web3 = new Web3(provider);
    // eth = web3.eth;

    // if (Object.keys(__accounts).length > 0) {
    //     const address = Object.keys(__accounts)[0];
    //     dispatch(setDefaultAccount(address))
    // }
    
    //endpoint


    provider = new ZeroClientProvider({
        rpcUrl: 'wss://rinkeby.infura.io/ws',
        getAccounts: function(cb){ 
            cb(null, Object.keys(__accounts))
        },

        getPrivateKey: function(address, cb) {
            const pk = __accounts[address.toLowerCase()];

            const privateKey = new Buffer(pk.substr(2), 'hex');
            cb(null, privateKey)
        } 
    });
    web3 = new Web3(provider);
    eth = web3.eth;
    provider.start();

    // function fn(event, cb) {
    //     debugger
    // }
    
    // provider.on(fn);

    provider.on('data', (e, payload) => {
        const message = payload;
        const { id, method, error, result } = message;
        if (wv && method && method.indexOf('_subscription') > -1) {
          // Emit subscription notification
          wv.send('web3_eth_event_data', payload);
        }
    })

    window.cyber = new Cyber(getState().settings.SEARCH_END_POINT)
}

export const loadAccounts = () => (dispatch, getState) => {
    if (!eth) return;

    // eth.getAccounts((err, _accounts) => {
    //     Promise.all(
    //         _accounts.map(address => new Promise(resolve => {
    //             eth.getBalance(address, (e, balance) => {
    //                 resolve({
    //                     balance: web3.fromWei(balance, 'ether').toNumber(),
    //                     address: address.toLowerCase()
    //                 })
    //             })
    //         }))
            
    //     ).then(accounts => {
    //         dispatch({
    //             type: 'LOAD_ACCOUNTS',
    //             payload: accounts,
    //         })
    //     })
    // })
    eth.getAccounts((err, _accounts) => {
        Promise.all(
            _accounts.map(address => new Promise(resolve => {
                eth.getBalance(address).then(_balance => {
                    resolve({
                        balance: web3.utils.fromWei(_balance, 'ether'),
                        address: address.toLowerCase()
                    })
                })
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


export const sendFunds = (_from, to, amount, _confirmationNumber = 3) => (dispatch, getState) => new Promise(resolve => {
    console.log('send eth');
    console.log(_from, to, amount, web3.utils.toWei(amount, "ether"));
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

let web3Reqest = null;

export const approve = (gas, _gasLimit) => (dispatch, getState) => {
    // const gasLimit = web3.utils.toWei(_gasLimit, 'Gwei');
    // web3Reqest.params[0].gas = gas;
    // web3Reqest.params[0].gasPrice = gasLimit;
    // web3Reqest.params[0].value = '0x00';

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

export const receiveMessage = (e) => (dispatch, getState) => {
    if (!provider) return;
    if (e.channel === 'web3_eth') {

        const payload = e.args[0]
        wv = e.target;

        if (payload.method === 'eth_sendTransaction') {
            web3Reqest = payload;
            debugger
        //     // web3Reqest.id = web3Reqest.id + 1;
        //     // payload.params[0].gas = 21000;
        //     // TODO: estimateGas
        //     // web3.eth.estimateGas(payload, (e, dd) => {
        //     //     debugger
        //     // })
            dispatch(showPending(payload));
        } else {
            provider.sendAsync(payload, (e, result) => {
                wv.send('web3_eth_call', { ...payload, ...result });
            })

                // const message = payload;
                // const { id, method, error, result } = message;
                // if (method && method.indexOf('_subscription') > -1) {
                //   // Emit subscription notification
                //   provider.emit('notification', message.params);
                // }
        }
    }
    if (e.channel === 'cyber') {

        const method = e.args[0].method;
        const params = e.args[0].params;

        const wvCyber = e.target;
        window.cyber[method].apply(window.cyber, params).then((result) => {
            wvCyber.send('cyber_'+method, result);
        });
    }
}

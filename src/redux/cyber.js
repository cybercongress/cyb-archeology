import { initSettingsState } from './settings';
import Cyber, { lotteryHash } from '../cyber/Cyber';
import { onApplicationStart } from './intro';

const initState = {
    accounts: [],
    defaultAccount: '',
};
const IPFS = require('ipfs-api');

export const reducer = (state = initState, action) => {
    switch (action.type) {
    case 'SET_CYBER_ACCOUNTS':
        return {
            ...state,
            accounts: [...action.payload],
        };

    case 'SET_CYBER_DEFAULT_ACCOUNT':
        const { address, publicKey, balance } = action.payload;
        return {
            ...state,
            defaultAccount: address,
        };

    default:
        return state;
    }
};

export const setDefaultCyberAccount = acount => (dispatch, getState) => {
    window.cyber.setDefaultAccount(acount.address);
    dispatch({
        type: 'SET_CYBER_DEFAULT_ACCOUNT',
        payload: !!acount ? acount : { address: '', publicKey: '', balance: '' },
    });
};

export const loadCyberdAccounts = () => (dispatch, getState) => {
    return window.cyber.getAccounts().then((accounts) => {
        if (!getState().cyber.defaultAccount && accounts.length > 0) {
            dispatch(setDefaultCyberAccount(accounts[0]));
        }

        if (accounts.length === 0) {
            dispatch(setDefaultCyberAccount(''));
        }

        dispatch({
            type: 'SET_CYBER_ACCOUNTS',
            payload: accounts,
        });
    });
};

export const claimFunds = (address, amount) => (dispatch, getState) => {
    window.cyber.claimFunds(address, amount);
};

export const sendFunds = (defaultAddress, recipientAddress, amount) => (dispatch, getState) => {
    window.cyber.sendFunds(defaultAddress, recipientAddress, amount)
        .then(account => dispatch(loadCyberdAccounts()));
};

export const createCyberAccount = () => (dispatch, getState) => {
    window.cyber.createAccount().then(account => dispatch(loadCyberdAccounts()));
};

export const forgetCyberAccount = address => (dispatch, getState) => {
    window.cyber.forgetAccount(address).then(() => dispatch(loadCyberdAccounts()));
};

export const restoreAccount = text => (dispatch, getState) => {
    if (text.indexOf(' ') !== -1) {
        return window.cyber.restoreAccount(text).then(account => dispatch(loadCyberdAccounts()));
    } else {
        return window.cyber.importAccount(text).then(account => dispatch(loadCyberdAccounts()));
    }
};

function financial(x) {
    return Number.parseFloat(x).toFixed(2);
}

export const getDefaultAccountBalance = (state) => {
    const {
        accounts,
        defaultAccount,
    } = state.cyber;

    const acc = accounts.find(a => a.address === defaultAccount);

    if (!acc) {
        return 0;
    }

    return financial(acc.balance);
};

export const getDefaultAccountPublicKey = (state) => {
    const {
        accounts,
        defaultAccount,
    } = state.cyber;

    const acc = accounts.find(a => a.address === defaultAccount);

    if (!acc) {
        return 0;
    }

    return acc.publicKey;
};

export const onCopyKey = (address) => (dispatch, getState) => {
    window.cyber.getAccount(address).then(account => {
        const { privateKey } = account;
        navigator.clipboard.writeText(privateKey).then(function() {
            // console.log('Async: Copying to clipboard was successful!');
        }, function(err) {
            console.error('Async: Could not copy text: ', err);
        });
    });
};

const pinLotteryResults = (ipfs) => {
    ipfs.pin.add(lotteryHash, (err, res) => {
        if (err) {
            console.log('Pin lottery results error: ', err);
        }

        if (res) {
            console.log('Pinned lottery results: ', res);
        }
    });
};

export const initCyber = () => (dispatch, getState) => {
    const settingsString = localStorage.getItem('settings');

    let settings;

    if (settingsString) {
        settings = JSON.parse(settingsString);
    } else {
        settings = initSettingsState;
    }

    const ipfs = new IPFS(settings.ipfsWrite);

    window.cyber = new Cyber(settings.cyberdUrl, settings.cyberdWsUrl, ipfs);

    pinLotteryResults(ipfs);
};

onApplicationStart((browserState, dispatch) => {
    dispatch(initCyber());

    const accounts = [browserState.cyberAccount];

    dispatch({
        type: 'SET_CYBER_ACCOUNTS',
        payload: accounts,
    });
    dispatch(setDefaultCyberAccount(accounts[0]));
});

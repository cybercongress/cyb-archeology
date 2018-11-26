const initState = {
    accounts: [],
    defaultAccount: '',
};

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
        payload: !!acount ? acount : { address: '', publicKey: '', balance: ''},
    });
};

export const claimFunds = (address, amount) => (dispatch, getState) => {
    window.cyber.claimFunds(address, amount);
};

export const sendFunds = (defaultAddress, recipientAddress, amount) => (dispatch, getState) => {
    window.cyber.sendFunds(defaultAddress, recipientAddress, amount).then(account => dispatch(init()));
};


export const init = () => (dispatch, getState) => {
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

export const createCyberAccount = () => (dispatch, getState) => {
    window.cyber.createAccount().then(account => dispatch(init()));
};

export const forgetCyberAccount = address => (dispatch, getState) => {
    window.cyber.forgetAccount(address).then(() => dispatch(init()));
};

export const restoreAccount = text => (dispatch, getState) => {
    if (text.indexOf(' ') !== -1) {
        return window.cyber.restoreAccount(text).then(account => dispatch(init()));
    } else {
        return window.cyber.importAccount(text).then(account => dispatch(init()));
    }
};

export const getDefaultAccountBalance = (state) => {
    const {
        accounts,
        defaultAccount
    } = state.cyber;

    const acc = accounts.find(a => a.address === defaultAccount);

    if (!acc ) return 0;

    return acc.balance;
}

export const getDefaultAccountPublicKey = (state) => {
    const {
        accounts,
        defaultAccount
    } = state.cyber;

    const acc = accounts.find(a => a.address === defaultAccount);

    if (!acc ) return 0;

    return acc.publicKey;
}

export const onCopyKey = (address) => (dispatch, getState) => {
    window.cyber.getAccount(address).then(account => {
        const { privateKey } = account;
        navigator.clipboard.writeText(privateKey).then(function() {
            // console.log('Async: Copying to clipboard was successful!');
        }, function(err) {
            console.error('Async: Could not copy text: ', err);
        });
    });
}

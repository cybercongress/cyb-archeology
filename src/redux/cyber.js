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
        return {
            ...state,
            defaultAccount: action.payload,
        };

    default:
        return state;
    }
};

export const init = () => (dispatch, getState) => {
    window.cyber.getAccounts().then((accounts) => {
        if (!getState().cyber.defaultAccount && accounts.length > 0) {
            dispatch(setDefaultCyberAccount(accounts[0].address));
        }

        dispatch({
            type: 'SET_CYBER_ACCOUNTS',
            payload: accounts,
        });
    });
};

export const restoreAccount = seedPhrase => (dispatch, getState) => {
    window.cyber.restoreAccount(seedPhrase).then(account => dispatch(init()));
};

export const importAccount = privateKey => (dispatch, getState) => {
    window.cyber.importAccount(privateKey).then(account => dispatch(init()));
};

export const setDefaultCyberAccount = address => (dispatch, getState) => {
    window.cyber.setDefaultAccount(address);
    dispatch({
        type: 'SET_CYBER_DEFAULT_ACCOUNT',
        payload: address,
    });
};

export const createCyberAccount = () => (dispatch, getState) => {
    window.cyber.createAccount().then(account => dispatch(init()));
};

export const forgetCyberAccount = address => (dispatch, getState) => {
    window.cyber.forgetAccount(address).then(() => dispatch(init()));
};

export const claimFunds = (address, amount) => (dispatch, getState) => {
    window.cyber.claimFunds(address, amount);
};

export const sendFunds = (defaultAddress, recipientAddress, amount) => (dispatch, getState) => {
    window.cyber.sendFunds(defaultAddress, recipientAddress, amount).then(account => dispatch(init()));
};

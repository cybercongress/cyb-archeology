const initState = {
    accounts: [],
    defaultAccount: '',
};

export const reducer = (state = initState, action) => {

    switch (action.type) {
        case 'SET_CYBER_ACCOUNTS':
            return {
                ...state,
                accounts: [...action.payload]
            };

        case 'SET_CYBER_DEFAULT_ACCOUNT':
            return {
                ...state,
                defaultAccount: action.payload
            };

        default:
            return state
    }

};

export const init = () => (dispatch, getState) => {
    window.cyber.getAccounts().then(accounts => {

        if (!getState().cyber.defaultAccount && accounts.length > 0) {
            dispatch({
                type: 'SET_CYBER_DEFAULT_ACCOUNT',
                payload: accounts[0].address
            })
        }

        dispatch({
            type: 'SET_CYBER_ACCOUNTS',
            payload: accounts
        })
    });
};

export const restoreAccount = (seedPhrase) => (dispatch, getState) => {
    window.cyber.restoreAccount(seedPhrase).then(account =>
        dispatch(init())
    )
};

export const importAccount = (privateKey) => (dispatch, getState) => {
    window.cyber.importAccount(privateKey).then(account =>
        dispatch(init())
    )
};

export const setDefaultCyberAccount = (address) => (dispatch, getState) => {
    window.cyber.setDefaultAccount(address);
    dispatch({
        type: 'SET_CYBER_DEFAULT_ACCOUNT',
        payload: address
    })
};

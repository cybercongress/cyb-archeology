import { navigate } from './browser';

const initState = {
    showIntro: true,
};

export const reducer = (state = initState, action) => {
    switch (action.type) {
    case 'START_BROWSING':
        return {
            ...state,
            showIntro: false,
        };

    default:
        return state;
    }
};

let moduleCallbacks = [];

export const onApplicationStart = (cb) => {
    moduleCallbacks.push(cb);
};

export const startBrowsing = (startConfig) => (dispatch) => {
    dispatch(navigate('wallet.cyb'));
    dispatch({
        type: 'START_BROWSING',
    });

    moduleCallbacks.forEach(cb => cb(startConfig, dispatch));
};

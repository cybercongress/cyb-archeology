

const initState = {
    fromAddress: '',
    toAddress: '',
    gasLimit: 0,
    gasPrice: 0,
    value: 0,
    isSignerPopup: false,
};


export const reducer = (state = initState, action) => {
    switch (action.type) {
    case 'SHOW_SIGNER': {
        return {
            ...state,
            isSignerPopup: true,
            ...action.payload,
        };
    }

    case 'HIDE_SIGNER': {
        return {
            ...state,
            isSignerPopup: false,
        };
    }

    default:
        return state;
    }
};


let callbackSuccess = null;
let callbackError = null;

export const showSigner = ({
    fromAddress, toAddress,
    value, gasPrice, gasLimit,
}, cbSuccess, cbError) => dispatch => {
    callbackSuccess = cbSuccess;
    callbackError = cbError;
    dispatch({
        type: 'SHOW_SIGNER',
        payload: {
            fromAddress, toAddress,
            value, gasPrice, gasLimit,
        },
    });
};

export const hidePopup = () => ({ type: 'HIDE_SIGNER' });

export const approve = (gasPrice, gasLimit) => (dispatch) => {
    callbackSuccess({ gasPrice, gasLimit });
};


export const reject = () => (dispatch) => {
    callbackError();
    dispatch(hidePopup());
};

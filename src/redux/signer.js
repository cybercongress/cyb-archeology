

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


let resolveFunc = null;
let rejectFunc = null;

export const showSigner = ({
    fromAddress, toAddress,
    value, gasPrice, gasLimit,
}) => dispatch => new Promise((resolve, reject) => {
    resolveFunc = resolve;
    rejectFunc = reject;
    dispatch({
        type: 'SHOW_SIGNER',
        payload: {
            fromAddress, toAddress,
            value, gasPrice, gasLimit,
        },
    });
});

const hidePopup = () => ({ type: 'HIDE_SIGNER' });

export const approve = (gasPrice, gasLimit) => (dispatch) => {
    resolveFunc({ gasPrice, gasLimit });
    dispatch(hidePopup());
};


export const reject = () => (dispatch) => {
    rejectFunc();
    dispatch(hidePopup());
};

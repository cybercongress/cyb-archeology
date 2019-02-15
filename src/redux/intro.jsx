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

export const startBrowsing = () => (dispatch) => {
    dispatch(navigate(''));
    dispatch({
        type: 'START_BROWSING',
    });
};

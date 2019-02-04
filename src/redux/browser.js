import { hashHistory } from 'react-router';
import { URLToDURA, DURAToURL } from '../utils';
import { getRegistryItems } from './rootRegistry';
import { getIpfsEndpoint } from './settings';
import { toggleMenu } from './appMenu';

// TODO: proccess loading

const START_DURA = '';

const initState = {
    url: DURAToURL(START_DURA).url,
    dura: START_DURA,
    backDura: null,
    loading: false,
    history: [],
};

export const reducer = (state = initState, action) => {
    switch (action.type) {
    case 'NAVIGATE': {
        return {
            ...state,
            ...action.payload,
        };
    }

    case 'MOVE_BACK': {
        const { history } = state;

        return {
            ...state,
            history: history.slice(0, history.length - 1),
        };
    }

    case 'UPDATE_DURA': {
        const { dura, date } = action.payload;
        const lastItem = state.history[state.history.length - 1];
        let history = state.history.concat({ dura, date });

        if (lastItem) {
            const { lastDura } = lastItem;

            if (!!lastDura && dura === `${lastDura}/#/`) {
                history = state.history.map((item, index) => {
                    if (index === state.history.length - 1) {

                        return { dura, date };
                    }
                    return item;
                });
            }
        }


        return {
            ...state,
            history,
            dura,
        };
    }
    default:
        return state;
    }
};

export const updateDURA = dura => (dispatch, getState) => {
    localStorage.setItem('LAST_DURA', dura);
    dispatch({
        type: 'UPDATE_DURA',
        payload: {
            dura,
            date: new Date(),
        },
    });
};

export const navigate = (_dura, init = false) => (dispatch, getState) => {
    const apps = getRegistryItems(getState());
    const ipfsEndpoint = getIpfsEndpoint(getState());
    const { url, dura } = DURAToURL(_dura, apps, ipfsEndpoint);


    if ((_dura === '' || dura === '') && getState().appMenu.openMenu) {
        dispatch(toggleMenu());
    }

    if (_dura === 'rr.cyb') {
        // if (!init)
        hashHistory.push('/rootregistry');
        dispatch(updateDURA(_dura));
        return;
    }

    if (_dura === 'settings.cyb') {
        // if (!init)
        hashHistory.push('/settings');
        dispatch(updateDURA(_dura));
        return;
    }

    if (_dura === 'wallet.cyb') {
        // if (!init)
        hashHistory.push('/wallet');
        dispatch(updateDURA(_dura));
        return;
    }

    if (_dura === 'history.cyb') {
        hashHistory.push('/history');
        dispatch(updateDURA(_dura));
        return;
    }

    if (_dura === 'txq.cyb') {
        hashHistory.push('/txq');
        dispatch(updateDURA(_dura));
        return;
    }

    if (_dura.indexOf('help.cyb') === 0) {
        const url = `/help${_dura.split('help.cyb')[1]}`;
        const dura = `help.cyb${_dura.split('help.cyb')[1]}`;

        hashHistory.push(url);
        dispatch(updateDURA(dura));
        return;
    }

    if (!!_dura && _dura.split('.')[1] === 'eth') {
        hashHistory.push(`/eth/${_dura.split('.')[0]}`);
        dispatch(updateDURA(_dura));
        return;
    }

    if (_dura === 'apps.cyb') {
        // if (!init)
        hashHistory.push('/appstore');
        dispatch(updateDURA(_dura));
        return;
    }


    if (_dura === '') { // App not found
        // if (!init)
        hashHistory.push('/');
        dispatch(updateDURA(_dura));
        return;
    }

    if (dura === 'notfound.cyb') {
        hashHistory.push(`/notfound?dura=${_dura}`);
        dispatch(updateDURA(_dura));
        return;
    }

    console.log('navigate');
    console.log('dura', dura);
    console.log('url', url);
    console.log('');

    dispatch(updateDURA(dura));


    dispatch({
        type: 'NAVIGATE',
        payload: {
            url,
            dura,
            loading: false,
        },
    });

    hashHistory.push('/browser');
};

export const willNavigate = url => (dispatch, getState) => {
    const apps = getRegistryItems(getState());
    const ipfsEndpoint = getIpfsEndpoint(getState());

    let dura = URLToDURA(url, apps, ipfsEndpoint);

    if (url.indexOf('cyb://') !== -1) {
        dura = url.split('cyb://')[1];
    }

    if (url.indexOf('dura://') !== -1) {
        dura = url.split('dura://')[1];
    }

    console.log('will-navigate');
    console.log('url', url);
    console.log('dura', dura);
    console.log('');

    dispatch(navigate(dura));
};

export const newWindow = e => (dispatch) => {
    dispatch(willNavigate(e.url));
};

export const didNavigateInPage = url => (dispatch, getState) => {
    const apps = getRegistryItems(getState());
    const ipfsEndpoint = getIpfsEndpoint(getState());

    const dura = URLToDURA(url, apps, ipfsEndpoint);

    console.log('did-navigate-in-page ');
    console.log('url', url);
    console.log('dura', dura);


    dispatch(updateDURA(dura));

    // dispatch({ // update URL in webview component, fix problem with links
    //     type: 'NAVIGATE',
    //     payload: {
    //         url,
    //         dura,
    //         loading: false,
    //     },
    // });
};

export const init = _IPFS_END_POINT => (dispatch, getState) => {
    const dura = localStorage.getItem('LAST_DURA') || '';

    dispatch(navigate(dura, true));
};

export const canBack = (state) => {
    const { history } = state.browser;

    return history.length > 1;
};

export const goBack = () => (dispatch, getState) => {
    const { history } = getState().browser;
    if (canBack(getState())) {
        const lastUrl = history[history.length - 2].dura;

        dispatch(navigate(lastUrl));
        dispatch({ type: 'MOVE_BACK' });
        dispatch({ type: 'MOVE_BACK' });
    }
};

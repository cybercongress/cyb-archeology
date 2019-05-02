import axios from 'axios';
import { getEthStatus } from './wallet';
import { init as initCyberdWallet } from './cyber';

const initState = {
    IPFS_END_POINT: 'http://earth.cybernode.ai:34402',
    PARITTY_END_POINT: 'http://earth.cybernode.ai:34645',
    SEARCH_END_POINT: 'http://earth.cybernode.ai:34657',
    CYBERD_WS_END_POINT: 'ws://earth.cybernode.ai:34657/websocket',

    pending: false,
    ipfsStatus: 'fail',
    ipfsWriteStatus: 'fail',
    ethNodeStatus: 'fail',
    cyberNodeStatus: 'fail',
    cyberdWsStatus: 'fail',
    ethNetworkName: null,
    cyberNetwork: '',
    ipfsWrite: {
        host: 'localhost',
        port: 5001,
        protocol: 'http',
    },

    username: '',
};

export const reducer = (state = initState, action) => {
    switch (action.type) {
    case 'INIT_SETTINGS': {
        return {
            ...state,
            ...action.payload,
        };
    }
    case 'SET_IPFS_END_POINT': {
        return {
            ...state,
            IPFS_END_POINT: action.payload,
        };
    }
    case 'SET_PARITTY_END_POINT': {
        return {
            ...state,
            PARITTY_END_POINT: action.payload,
        };
    }

    case 'SET_SEARCH_END_POINT': {
        return {
            ...state,
            SEARCH_END_POINT: action.payload,
        };
    }

    case 'SET_SEARCH_WS_END_POINT': {
        return {
            ...state,
            CYBERD_WS_END_POINT: action.payload,
        };
    }

    case 'SET_USERNAME': {
        return {
            ...state,
            username: action.payload,
        };
    }

    case 'SET_STATUS': {
        return {
            ...state,
            ...action.payload,
            pending: false,
        };
    }

    case 'SET_CHECKING_PENDING': {
        return {
            ...state,
            pending: true,
        };
    }

    case 'SET_ETH_NETWORK_NAME': {
        return {
            ...state,
            ethNetworkName: action.payload,
        };
    }

    case 'SET_IPFS_WRITE_URL': {
        return {
            ...state,
            ipfsWrite: action.payload,
        };
    }

    default:
        return state;
    }
};

export const getIpfsEndpoint = state => state.settings.IPFS_END_POINT;

export const getIpfsWriteUrl = state => {
    const { ipfsWrite: { protocol, host, port } } = state.settings;

    return `${protocol}://${host}:${port}`;
};

export const init = () => (dispatch, getState) => new Promise((resolve) => {
    const __settings = localStorage.getItem('settings')
        ? JSON.parse(localStorage.getItem('settings'))
        : initState;

    dispatch({
        type: 'INIT_SETTINGS',
        payload: __settings,
    });
    dispatch(checkStatus());
    resolve(__settings);
});

const saveSettingsInLS = () => (dispatch, getState) => {
    const { settings } = getState();

    localStorage.setItem('settings', JSON.stringify(settings));
};

export const setUsername = username => (dispatch, getState) => {
    dispatch({
        type: 'SET_USERNAME',
        payload: username,
    });

    dispatch(saveSettingsInLS());
};

export const getIpfsStatus = url => new Promise((resolve) => {
    axios.get(`${url}/ipfs/QmZfSNpHVzTNi9gezLcgq64Wbj1xhwi9wk4AxYyxMZgtCG`, { timeout: 1000 })
        .then((data) => {
            if (url.indexOf('localhost') !== -1 || url.indexOf('127.0.0.1') !== -1) {
                resolve('local');
            } else {
                resolve('remote');
            }
        }).catch((e) => {
            resolve('fail');
        });
});

export const setIPFS = ipfsUrl => (dispatch, getState) => {
    dispatch({ type: 'SET_IPFS_END_POINT', payload: ipfsUrl });
    dispatch(saveSettingsInLS());
    //dispatch(getIpfsStatus(ipfsUrl));
};

export const setIpfsWriteUrl = url => (dispatch, getState) => {
    const splitted = url.split('://');
    const protocol = splitted[0];
    const host = splitted[1].split(':')[0];
    const port = splitted[1].split(':')[1];

    dispatch({
        type: 'SET_IPFS_WRITE_URL',
        payload: {
            host,
            port,
            protocol,
        },
    });
    dispatch(saveSettingsInLS());
};

export const setEthEndpoint = PARITTY_END_POINT => (dispatch, getState) => {
    dispatch({ type: 'SET_PARITTY_END_POINT', payload: PARITTY_END_POINT });
    dispatch(saveSettingsInLS());
    //dispatch(initWallet(PARITTY_END_POINT));
    //dispatch(checkStatus());

    // const { password } = getState().wallet;
    // if (!!password) {
    //     dispatch(login(password));
    // }
};

export const setSearch = SEARCH_END_POINT => (dispatch, getState) => {
    dispatch({ type: 'SET_SEARCH_END_POINT', payload: SEARCH_END_POINT });
    dispatch(saveSettingsInLS());
    //dispatch(initCyberdWallet());
    //dispatch(checkStatus());
};

export const setSearchWS = CYBERD_WS_END_POINT => (dispatch, getState) => {
    dispatch({ type: 'SET_SEARCH_WS_END_POINT', payload: CYBERD_WS_END_POINT });
    dispatch(saveSettingsInLS());
};

export const setEthNetworkName = ethNetworkName => (dispatch, getState) => {
    dispatch({
        type: 'SET_ETH_NETWORK_NAME',
        payload: ethNetworkName,
    });
};

export const getIpfsWriteStatus = url => new Promise((resolve) => {
    axios.get(`${url}/api/v0/version`, { timeout: 1000 })
        .then((data) => {
            if (url.indexOf('localhost') !== -1 || url.indexOf('127.0.0.1') !== -1) {
                resolve('local');
            } else {
                resolve('remote');
            }
        }).catch((e) => {
            resolve('fail');
        });
});

export const getCyberStatus = url => new Promise((resolve) => {
    axios.get(`${url}/status`, { timeout: 1000 })
        .then(response => response.data.result)
        .then((data) => {
            const { network } = data.node_info;

            if (url.indexOf('localhost') !== -1 || url.indexOf('127.0.0.1') !== -1) {
                resolve({ status: 'local', network });
            } else {
                resolve({ status: 'remote', network });
            }
        }).catch((e) => {
            resolve({ status: 'fail' });
        });
});

export const getCyberWsStatus = url => new Promise((resolve) => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
        if (url.indexOf('localhost') !== -1 || url.indexOf('127.0.0.1') !== -1) {
            resolve('local');
        } else {
            resolve('remote');
        }
    };

    ws.onerror = () => {
        resolve('fail');
    };
});


export const checkStatus = () => (dispatch, getState) => {
    const {
        IPFS_END_POINT,
        PARITTY_END_POINT,
        SEARCH_END_POINT,
        CYBERD_WS_END_POINT,
    } = getState().settings;

    const ipfsWriteUrl = getIpfsWriteUrl(getState());

    dispatch({ type: 'SET_CHECKING_PENDING' });

    Promise.all([
        getIpfsStatus(IPFS_END_POINT),
        getIpfsWriteStatus(ipfsWriteUrl),
        getEthStatus(PARITTY_END_POINT),
        getCyberStatus(SEARCH_END_POINT),
        getCyberWsStatus(CYBERD_WS_END_POINT),
    ]).then(([ipfsStatus, ipfsWriteStatus, ethNodeStatus, cyberNodeStatus, cyberdWsStatus]) => {

        if (cyberNodeStatus.status !== 'fail' && window.cyber) {
            window.cyber.setChainId(cyberNodeStatus.network);
        }

        dispatch({
            type: 'SET_STATUS',
            payload: {
                ipfsStatus,
                ipfsWriteStatus,
                ethNodeStatus,
                cyberNodeStatus: cyberNodeStatus.status,
                cyberdWsStatus,
                cyberNetwork: cyberNodeStatus.network,
            },
        });
    });
};

export const resetAllSettings = () => (dispatch, getState) => {
    localStorage.removeItem('settings');
    dispatch(init())
        .then(() => {
            //dispatch(initWallet(getState().settings.PARITTY_END_POINT));
            dispatch(initCyberdWallet());
            dispatch(checkStatus());
        });
};

export const importSettings = settings => (dispatch, getState) => {
    dispatch({
        type: 'INIT_SETTINGS',
        payload: settings,
    });
};

export const exportSettings = () => (dispatch, getState) => {
    return getState().settings;
};

import axios from 'axios';
import { getEthStatus, initEthWallet } from './wallet';
import { initCyber, loadCyberdAccounts } from './cyber';

export const initSettingsState = {
    ipfsUrl: 'http://localhost:8080',
    ethUrl: 'http://titan.cybernode.ai:38645',
    cyberdUrl: 'https://titan.cybernode.ai/api/',
    cyberdWsUrl: 'wss://titan.cybernode.ai/websocket',
    ipfsWrite: {
        host: 'localhost',
        port: 5001,
        protocol: 'http',
    },

    ethNetworkName: null,
    cyberdNetworkName: '',

    pending: false,
    ipfsStatus: 'fail',
    ipfsWriteStatus: 'fail',
    ethStatus: 'fail',
    cyberdStatus: 'fail',
    cyberdWsStatus: 'fail',

    username: '',
};

export const reducer = (state = initSettingsState, action) => {
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
            ipfsUrl: action.payload,
        };
    }
    case 'SET_PARITTY_END_POINT': {
        return {
            ...state,
            ethUrl: action.payload,
        };
    }

    case 'SET_SEARCH_END_POINT': {
        return {
            ...state,
            cyberdUrl: action.payload,
        };
    }

    case 'SET_SEARCH_WS_END_POINT': {
        return {
            ...state,
            cyberdWsUrl: action.payload,
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

export const getIpfsEndpoint = state => state.settings.ipfsUrl;

export const getIpfsWriteUrl = (state) => {
    const { ipfsWrite: { protocol, host, port } } = state.settings;

    return `${protocol}://${host}:${port}`;
};

export const init = () => (dispatch, getState) => new Promise((resolve) => {
    const __settings = localStorage.getItem('settings')
        ? JSON.parse(localStorage.getItem('settings'))
        : initSettingsState;

    dispatch({
        type: 'INIT_SETTINGS',
        payload: __settings,
    });
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
    dispatch(checkStatus());
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
    dispatch(checkStatus());

    dispatch(initCyber());
};

export const setEthEndpoint = PARITTY_END_POINT => (dispatch, getState) => {
    dispatch({ type: 'SET_PARITTY_END_POINT', payload: PARITTY_END_POINT });
    dispatch(saveSettingsInLS());
    dispatch(checkStatus());

    dispatch(initEthWallet(getState().wallet.mnemonic));
};

export const setCyberdUrl = SEARCH_END_POINT => (dispatch, getState) => {
    dispatch({ type: 'SET_SEARCH_END_POINT', payload: SEARCH_END_POINT });
    dispatch(saveSettingsInLS());
    dispatch(checkStatus());

    dispatch(initCyber());
    dispatch(loadCyberdAccounts());
};

export const setCyberdWsUrl = CYBERD_WS_END_POINT => (dispatch, getState) => {
    dispatch({ type: 'SET_SEARCH_WS_END_POINT', payload: CYBERD_WS_END_POINT });
    dispatch(saveSettingsInLS());
    dispatch(checkStatus());

    dispatch(initCyber());
    dispatch(loadCyberdAccounts());
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
        ipfsUrl,
        ethUrl,
        cyberdUrl,
        cyberdWsUrl,
    } = getState().settings;

    const ipfsWriteUrl = getIpfsWriteUrl(getState());

    dispatch({ type: 'SET_CHECKING_PENDING' });

    Promise.all([
        getIpfsStatus(ipfsUrl),
        getIpfsWriteStatus(ipfsWriteUrl),
        getEthStatus(ethUrl),
        getCyberStatus(cyberdUrl),
        getCyberWsStatus(cyberdWsUrl),
    ]).then(([ipfsStatus, ipfsWriteStatus, ethStatus, cyberNodeStatus, cyberdWsStatus]) => {

        if (cyberNodeStatus.status !== 'fail' && window.cyber) {
            window.cyber.setChainId(cyberNodeStatus.network);
        }

        dispatch({
            type: 'SET_STATUS',
            payload: {
                ipfsStatus,
                ipfsWriteStatus,
                ethStatus,
                cyberdStatus: cyberNodeStatus.status,
                cyberdWsStatus,
                cyberdNetworkName: cyberNodeStatus.network,
            },
        });
    });
};

export const resetAllSettings = () => (dispatch, getState) => {
    localStorage.removeItem('settings');
    dispatch(init())
        .then(() => {
            dispatch(checkStatus());

            dispatch(initCyber());
            dispatch(loadCyberdAccounts());

            dispatch(initEthWallet(getState().wallet.mnemonic));
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

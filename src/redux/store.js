import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import {
    reducer as browserReducer,
    init as initBrowser,
} from './browser';

import {
    reducer as walletReducer,
    init as initWallet,
} from './wallet';

import {
    reducer as settingReducer,
    init as initSettings,
} from './settings';

import {
    reducer as rootRegistryReducer,
    init as initRootRegistry,
} from './rootRegistry';

import {
    reducer as appMenuReducer,
    init as initAppMenu,
} from './appMenu';

import {
    reducer as cyberReducer,
    init as initCyber,
} from './cyber';


import {
    reducer as signerReducer,
} from './signer';

const rootReducer = combineReducers({
    browser: browserReducer,
    wallet: walletReducer,
    settings: settingReducer,
    rootRegistry: rootRegistryReducer,
    appMenu: appMenuReducer,
    cyber: cyberReducer,
    signer: signerReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));


export const appStart = () => new Promise((resolve) => {
    store.dispatch(initSettings()).then(({ IPFS_END_POINT, PARITTY_END_POINT }) => {
        store.dispatch(initRootRegistry());
        store.dispatch(initWallet(PARITTY_END_POINT));
        store.dispatch(initAppMenu());
        store.dispatch(initBrowser(IPFS_END_POINT));
        store.dispatch(initCyber());
        resolve();
    });
});

export { store };

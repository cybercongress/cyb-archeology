const { ipcRenderer } = require('electron');

const EventEmitter = require('./preload/EventEmitter');

class ElectronProvider extends EventEmitter {
    constructor() {
        super();

        console.log('[electron provider created]');

        this.isCyb = true;

        this._providerCallbacks = {};

        ipcRenderer.on('web3_eth_call', (_, payload) => {
            const id = payload.id || payload[0].id;

            if (this._providerCallbacks[id]) {
                this._providerCallbacks[id](null, payload);
            }
        });

        ipcRenderer.on('web3_eth_call_reject', (_, payload) => {
            const id = payload.id || payload[0].id;

            if (this._providerCallbacks[id]) {
                this._providerCallbacks[id]('reject');
            }
        });

        ipcRenderer.on('web3_eth_event_data', (_, payload) => {
            this.emit('data', payload);
        });
    }

    send() {
        console.log('Sync calls are not anymore supported');
    }

    sendAsync(payload, callback) {
        // if (!payload) { return; }

        const id = payload.id || payload[0].id;

        this._providerCallbacks[id] = callback;
        ipcRenderer.sendToHost('web3_eth', payload);
    }
}

window.web3 = { currentProvider: new ElectronProvider() };

window.getIpfsConfig = () => new Promise((resolve) => {
    ipcRenderer.sendToHost('ipfs', {
        method: 'getIpfsConfig',
    });
    ipcRenderer.once('ipfs_config', (_, payload) => {
        resolve(payload);
    });
});

window.getIpfsGateway = () => new Promise((resolve) => {
    ipcRenderer.sendToHost('ipfs', {
        method: 'getGateway',
    });
    ipcRenderer.once('ipfs_gateway', (_, payload) => {
        resolve(payload);
    });
});

window.cyb = {
    getQuery() {
        return new Promise(((resolve) => {
            ipcRenderer.sendToHost('params', {
                method: 'getQuery',
            });
            ipcRenderer.once('params_getQuery', (_, payload) => {
                resolve(payload);
            });
        }));
    },

    setQuery(query) {
        console.log('[set query]: ', query);
        ipcRenderer.sendToHost('params', {
            method: 'setQuery',
            params: [query],
        });
    },

    onQueryUpdate(callback) {
        ipcRenderer.on('params_newQuery', (_, payload) => {
            console.log('[query updated]: ', payload);
            callback(payload);
        });
    },
};

window.cyber = {
    search(q) {
        return new Promise(((resolve, reject) => {
            ipcRenderer.sendToHost('cyber', {
                method: 'search',
                params: [q],
            });
            ipcRenderer.once('cyber_search', (_, payload) => {
                resolve(payload);
            });
        }));
    },

    searchCids(q) {
        return new Promise(((resolve, reject) => {
            ipcRenderer.sendToHost('cyber', {
                method: 'searchCids',
                params: [q],
            });
            ipcRenderer.once('cyber_searchCids', (_, payload) => {
                resolve(payload);
            });
        }));
    },

    link(from, to, address) {
        if (!address) {
            return;
        }

        return new Promise(((resolve, reject) => {
            ipcRenderer.sendToHost('cyber', {
                method: 'link',
                params: [from, to, address],
            });
            ipcRenderer.once('cyber_link', (_, payload) => {
                resolve(payload);
            });
            ipcRenderer.once('cyber_link_error', (_, payload) => {
                reject();
            });
        }));
    },

    getStatistics() {
        return new Promise((resolve, reject) => {
            ipcRenderer.sendToHost('cyber', {
                method: 'getStatistics',
                params: [],
            });
            ipcRenderer.once('cyber_getStatistics', (_, payload) => {
                resolve(payload);
            });
        });
    },

    getValidators() {
        return new Promise((resolve, reject) => {
            ipcRenderer.sendToHost('cyber', {
                method: 'getValidators',
                params: [],
            });
            ipcRenderer.once('cyber_getValidators', (_, payload) => {
                resolve(payload);
            });
        });
    },

    onNewBlock(cb) {
        ipcRenderer.sendToHost('cyber', {
            method: 'subscribe',
            params: [],
        });

        ipcRenderer.on('cyber_subscribe_event', (_, payload) => {
            cb(payload);
        });
    },

    unsubscribeNewBlock() {
        ipcRenderer.sendToHost('cyber', {
            method: 'unsubscribeNewBlock',
            params: [],
        });
    },

    getDefaultAddress() {
        return new Promise(((resolve) => {
            ipcRenderer.sendToHost('cyber', {
                method: 'getDefaultAddress',
                params: [],
            });
            ipcRenderer.on('cyber_getDefaultAddress', (_, payload) => {
                resolve(payload);
            });
        }));
    },
};

window.removeAllListeners = () => {
    console.log('[remove all listeners]');
    ipcRenderer.removeAllListeners();
    window.cyber.unsubscribeNewBlock();
};

ipcRenderer.on('removeAllListeners', () => {
    window.removeAllListeners();
});

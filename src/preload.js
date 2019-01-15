const { ipcRenderer } = require('electron');

const EventEmitter = require('./preload/EventEmitter');

class ElectronProvider extends EventEmitter {
    constructor() {
        super();

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

window.getIpfsConfig = () => {
    return new Promise(resolve => {
        ipcRenderer.sendToHost('ipfs', {
            method: 'getIpfsConfig',
        });
        ipcRenderer.once('ipfs_config', (_, payload) => {
            resolve(payload);
        });
    });
};

window.getIpfsGateway = () => {
    return new Promise(resolve => {
        ipcRenderer.sendToHost('ipfs', {
            method: 'getGateway',
        });
        ipcRenderer.once('ipfs_gateway', (_, payload) => {
            resolve(payload);
        });
    });
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
    getDefaultAddress(cb) {
        ipcRenderer.sendToHost('cyber', {
            method: 'getDefaultAddress',
            params: [],
        });
        ipcRenderer.on('cyber_getDefaultAddress', (_, payload) => {
            console.log('p:', payload);
            cb(payload);
        });
    },
};

window.web3 = { currentProvider: new ElectronProvider() };

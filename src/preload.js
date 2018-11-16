const { ipcRenderer } = require('electron');

const EventEmitter = require('./preload/EventEmitter');

class ElectronProvider extends EventEmitter {
    constructor() {
        super();

        this._providerCallbacks = {};
        ipcRenderer.on('web3_eth_call', (_, payload) => {
            const id = payload.id || payload[0].id;
            const _payload = payload.id ? payload : payload[0];

            if (this._providerCallbacks[id]) {
                this._providerCallbacks[id](null, payload);
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

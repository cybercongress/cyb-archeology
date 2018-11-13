const { ipcRenderer } = require('electron');

const EventEmitter = require('./preload/EventEmitter');

class ElectronProvider extends EventEmitter {
    constructor() {
        super();

        this._providerCallbacks = {};
        ipcRenderer.on('web3_eth_call', (_, payload) => {
            console.log('web3_eth_call');
            console.log(JSON.stringify(payload));
            if (this._providerCallbacks[payload.id]) {
                this._providerCallbacks[payload.id](null, payload);
            }
        });

        ipcRenderer.on('web3_eth_event_data', (_, payload) => {
            console.log('web3_eth_event_data');
            console.log(JSON.stringify(payload));
            this.emit('data', payload);
        });
    }

    send() {
        console.log('Sync calls are not anymore supported');
    }

    sendAsync(payload, callback) {
        console.log('>>');
        console.log(JSON.stringify(payload));
        console.log();

        if (!payload) { return; }

        this._providerCallbacks[payload.id] = callback;
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

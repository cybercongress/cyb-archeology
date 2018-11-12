const { ipcRenderer } = require('electron');

const __providerCallbacks = {};

// const EthereumProvider = require('./preload/EthereumProvider');
const EventEmitter = require('./preload/EventEmitter');

class ElectronProvider extends EventEmitter {
    constructor() {
        // Call super for `this` to be defined
        super();

        this._nextJsonrpcId = 0;
    }

    send(payload, callback) {
        console.log('Sync calls are not anymore supported');
    }

    sendAsync(payload, callback) {
        console.log('>>');
        console.log(JSON.stringify(payload));
        console.log();

        // const id = this._nextJsonrpcId++;
        if (!payload) { return; }

        __providerCallbacks[payload.id] = callback;
        ipcRenderer.sendToHost('web3_eth', payload);
        // ipcRenderer.once('web3_eth_call', (_, payload) => {
        //     try {
        //         callback(null, payload)
        //     } catch(e) {
        //         console.log('error')
        //         console.log(e)
        //         console.log(JSON.stringify(payload))
        //     }
        // });
    }

    // on(event, cb) {
    //     ipcRenderer.sendToHost('web3_event', event);
    // }

    _emitNotification(result) {
        console.log(' _emitNotification ');
        this.emit('notification', result);
    }
}

const provider = new ElectronProvider();

ipcRenderer.on('web3_eth_call', (_, payload) => {
    console.log('web3_eth_call');
    console.log(JSON.stringify(payload));
    if (__providerCallbacks[payload.id]) {
        __providerCallbacks[payload.id](null, payload);
    }
});

ipcRenderer.on('web3_eth_event_data', (_, payload) => {
    console.log('web3_eth_event_data');
    console.log(JSON.stringify(payload));
    provider.emit('data', payload);
});


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

window.web3 = { currentProvider: provider };

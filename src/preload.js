const {ipcRenderer} = require('electron')


const __providerCallbacks = {}


const ElectronProvider = {
    sendAsync: function (payload, callback) {
        ipcRenderer.sendToHost('web3_eth', payload);
        __providerCallbacks[payload.id + payload.method] = callback
    }
}

ipcRenderer.on('web3_eth_call', (_, payload) => {
    if (__providerCallbacks[payload.id + payload.method]) {
        __providerCallbacks[payload.id + payload.method](null, payload);
    }
});

window.cyber = {
    search: function (q) {
        return new Promise(function (resolve, reject) {
            ipcRenderer.sendToHost('cyber', {
                method: 'search',
                params: [q]
            });
            ipcRenderer.once('cyber_search', (_, payload) => {
                resolve(payload);
            });
        })

    },
    link: function (from, to, address) {
        if (!address) {
            return
        }

        return new Promise(function (resolve, reject) {
            ipcRenderer.sendToHost('cyber', {
                method: 'link',
                params: [from, to, address]
            });
            ipcRenderer.once('cyber_link', (_, payload) => {
                resolve(payload);
            });
        })
    },
    getDefaultAddress: function (cb) {
        ipcRenderer.sendToHost('cyber', {
            method: 'getDefaultAddress',
            params: []
        });
        ipcRenderer.on('cyber_getDefaultAddress', (_, payload) => {
            console.log('p:', payload);
            cb(payload);
        });
    }
};

window.web3 = {currentProvider: ElectronProvider};


const {ipcRenderer} = require('electron')


const ElectronProvider = {
    send: function(payload, callback) {
        console.log('Sync calls are not anymore supported')
    },
    sendAsync: function (payload, callback) {
        ipcRenderer.sendToHost('web3_eth', payload);
        ipcRenderer.once('web3_eth_call', (_, payload) => {
            try {
                callback(null, payload)
            } catch(e) {
                console.log('error')
                console.log(e)
                console.log(JSON.stringify(payload))
            }
        });
    }
}

// ipcRenderer.on('web3_eth_call', (_, payload) => {
//     console.log('web3_eth_call');
//     console.log(JSON.stringify(payload));
//     if (payload.method && __providerCallbacks[payload.id + payload.method]) {
//         __providerCallbacks[payload.id + payload.method](null, payload);
//     }
// });

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


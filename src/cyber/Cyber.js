import * as axios from "axios";
import {
    create as createCyberdAccount,
    importAccount as importCyberdAccount,
    recover as recoverCyberdAccount
} from "../cyber/crypto";
import keyPair from '../cyber/keypair';


import builder from './builder';

const chainId = 'test-chain-fbqPMq';

const __accounts = {
    'cosmosaccaddr1mkvg9tpaslgchjuuwck5s6etl8l8nhhy6csn7t': '011F2F7F094DAC01523DACE672A19D188C27F481E30C221F07F0C17CB5A5CEDB'
};

function Cyber(nodeUrl) {
    var self = this;

    let defaultAccount = null;

    self.search = function (cid) {
        return new Promise(resolve => {
            axios({
                method: 'get',
                url: nodeUrl + '/search?cid=' + cid,
            })
                .then(data => {
                    let cids = data.data.result.cids;
                    const links = cids.map(cid => ({hash: cid.Cid}));

                    resolve(links)
                })
                .catch(error =>
                    resolve([])
                )

        })
    }


    self.link = function (from, to, address = '') {
        return axios({
            method: 'get',
            url: nodeUrl + '/account?address=' + address
        })
        /*            .then(data => {

                    const account = data.data.result.account;
                    const chainId = this.state.chainId;

                    const cyberdAcc = new cyberd.Account(address, chainId, parseInt(account.account_number, 10), parseInt(account.sequence, 10));

                    const linkRequest = new cyberd.Request(cyberdAcc, cidFrom, cidTo, constants.TxType.LINK);

                    resolve(linkRequest);


                }).*/
            .then(response => {
                return response.data.result.account;
            })
            .then((account) => {
                const acc = {
                    address: account.address,
                    chain_id: this.chain_id, //todo: get from node
                    account_number: parseInt(account.account_number, 10),
                    sequence: parseInt(account.sequence, 10)
                };
                const linkRequest = {
                    acc,
                    fromCid: from,
                    toCid: to,
                    type: 'link'
                };

                return axios({
                    method: 'post',
                    url: nodeUrl + '/link',
                    data: builder.buildAndSignTxRequest(linkRequest, __accounts[address], chainId)
                }).then(data =>
                    console.log('Link results: ', data)
                ).catch(error =>
                    console.log('Cannot link', error)
                )
            })
    }

    let __setDefaultAddress;

    self.getDefaultAddress = function () {
        return new Promise(resolve => {
            __setDefaultAddress = resolve;
            resolve(defaultAccount);
        })
    }

    self.setDefaultAccount = function (_address) {
        defaultAccount = _address;
        if (__setDefaultAddress) __setDefaultAddress(defaultAccount);
    }

    self.getAccounts = function () {
        return new Promise(resolve => {
            const _accounts = JSON.parse(localStorage.getItem('cyberAccounts') || '{}');

            Promise.all(
                Object.keys(_accounts).map(address => axios({
                        method: 'get',
                        url: nodeUrl + '/account?address=' + address
                    }).then(data => {
                        let balance = 0;
                        if (!data.data.error) {
                            const account = data.data.result.account;
                            balance = account.coins[0].amount;
                        }

                        return {
                            address: address,
                            balance
                        }
                    })
                )
            ).then(accounts => {
                resolve(accounts)
            });
        })
    }

    self.restoreAccount = function (seedPhrase) {
        return new Promise(resolve => {
            const account = recoverCyberdAccount(seedPhrase);
            const key = keyPair.recover(seedPhrase);

            __accounts[account.address] = key.privateKey;

            localStorage.setItem('cyberAccounts', JSON.stringify(__accounts));

            resolve();
        })
    };

    self.importAccount = function (privateKey) {
        return new Promise(resolve => {
            const account = importCyberdAccount(privateKey);

            __accounts[account.address] = privateKey;

            localStorage.setItem('cyberAccounts', JSON.stringify(__accounts));

            resolve();
        })
    }

}

export default Cyber;

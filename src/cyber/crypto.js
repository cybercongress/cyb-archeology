import utils from './utils';

const keypair = require('./keypair');
const codec = require("./codec");
const constants = require('./constants').CyberdNetConfig;


function encode(acc) {
    if (!utils.isEmpty(acc)) {
        let defaultCoding = constants.DEFAULT_ENCODING;
        switch (defaultCoding) {
            case constants.ENCODING_BECH32: {
                if (codec.hex.isHex(acc.address)) {
                    acc.address = codec.bech32.toBech32(constants.PREFIX_BECH32_ACCADDR, acc.address)
                }
                if (codec.hex.isHex(acc.publicKey)) {
                    acc.publicKey = codec.bech32.toBech32(constants.PREFIX_BECH32_ACCPUB, acc.publicKey)
                }
                break;
            }
            default: {

            }
        }
        return acc
    }
}


/**
 *
 * @param language
 * @returns {*}
 */
export const create = (language) => {
    let keyPair = keypair.create();
    if (keyPair) {
        return encode({
            address: keyPair.address,
            phrase: keyPair.secret,
            privateKey: keyPair.privateKey,
            publicKey: keyPair.publicKey
        })
    }
    return keyPair
};

export const recover = (secret, language) => {
    let keyPair = keypair.recover(secret);
    if (keyPair) {
        return encode({
            address: keyPair.address,
            phrase: secret,
            privateKey: keyPair.privateKey,
            publicKey: keyPair.publicKey
        })
    }
};

export const importAccount = (privateKey) => {
    let keyPair = keypair.import(privateKey);
    if (keyPair) {
        return encode({
            address: keyPair.address,
            phrase: null,
            privateKey: keyPair.privateKey,
            publicKey: keyPair.publicKey
        })
    }
};

export const isValidAddress = (address) => {
    return keypair.isValidAddress(address)
};

export const isValidPrivate = (privateKey) => {
    return keypair.isValidPrivate(privateKey)
};

export const getAddress = (publicKey) => {
    let pubKey = codec.hex.hexToBytes(publicKey);
    let address = keypair.getAddress(pubKey);
    address = codec.bech32.toBech32(constants.PREFIX_BECH32_ACCADDR, address);
    return address
};

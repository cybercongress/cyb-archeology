const Sha256 = require('sha256');
const RIPEMD160 = require('ripemd160');
const bip39 = require('bip39');
const Random = require('randombytes');
const Secp256k1 = require('secp256k1');
const BN = require('bn.js');
const codec = require('./codec');
const constants = require('./constants');

module.exports = {

    getPrivateKeyFromSecret(mnemonicS) {
        const seed = bip39.mnemonicToSeed(mnemonicS);
        const master = hd.computeMastersFromSeed(seed);

        return hd.derivePrivateKeyForPath(master.secret, master.chainCode, constants.AminoKey.FullFundraiserPath);
    },

    sign(private_key, msg) {
        const sigByte = Buffer.from(JSON.stringify(msg));
        const sig32 = Buffer.from(Sha256(sigByte, { asBytes: true }));

        const prikeyArr = Buffer.from(new Uint8Array(codec.hex.hexToBytes(private_key)));
        const sig = Secp256k1.sign(sig32, prikeyArr);

        return Array.from(sig.signature);
    },

    getAddress(publicKey) {
        if (publicKey.length > 33) {
            publicKey = publicKey.slice(5, publicKey.length);
        }
        const hmac = Sha256(publicKey);
        const b = Buffer.from(codec.hex.hexToBytes(hmac));
        const addr = new RIPEMD160().update(b);

        return addr.digest('hex').toUpperCase();
    },

    create(_entropy) {
        const entropySize = 24 * 11 - 8;
        const entropy = Random(entropySize / 8);
        const mnemonicS = bip39.entropyToMnemonic(_entropy ? _entropy : entropy);

        const secretKey = this.getPrivateKeyFromSecret(mnemonicS);

        const pubKey = Secp256k1.publicKeyCreate(secretKey);

        return {
            secret: mnemonicS,
            address: this.getAddress(pubKey),
            privateKey: codec.hex.bytesToHex(secretKey),
            publicKey: codec.hex.bytesToHex(pubKey),
        };
    },

    recover(seed) {
        const secretKey = this.getPrivateKeyFromSecret(seed);
        const pubKey = Secp256k1.publicKeyCreate(secretKey);

        return {
            secret: seed,
            address: this.getAddress(pubKey),
            privateKey: codec.hex.bytesToHex(secretKey),
            publicKey: codec.hex.bytesToHex(pubKey),
        };
    },

    import(secretKey) {
        const secretBytes = Buffer.from(secretKey, 'hex');
        const pubKey = Secp256k1.publicKeyCreate(secretBytes);

        return {
            address: this.getAddress(pubKey),
            privateKey: secretKey,
            publicKey: codec.hex.bytesToHex(pubKey),
        };
    },

    isValidAddress(address) {
        const prefix = constants.CyberdNetConfig.PREFIX_BECH32_ACCADDR;

        return codec.bech32.isBech32(prefix, address);
    },

    isValidPrivate(privateKey) {
        return /^[0-9a-fA-F]{64}$/i.test(privateKey);
    },
};

const hd = {

    computeMastersFromSeed(seed) {
        const masterSecret = Buffer.from('Bitcoin seed');
        const master = hd.i64(masterSecret, seed);

        return master;
    },

    derivePrivateKeyForPath(privKeyBytes, chainCode, path) {
        let data = privKeyBytes;
        
        const parts = path.split('/');

        parts.forEach((part) => {
            const harden = part.slice(part.length - 1, part.length) === "'";

            if (harden) {
                part = part.slice(0, part.length - 1);
            }
            const idx = parseInt(part);
            const json = hd.derivePrivateKey(data, chainCode, idx, harden);

            data = json.data;
            chainCode = json.chainCode;
        });
        const derivedKey = data;

        return derivedKey;
    },

    i64(key, data) {
        const createHmac = require('create-hmac');
        const hmac = createHmac('sha512', key);

        hmac.update(data); // optional encoding parameter
        const i = hmac.digest(); // synchronously get result with optional encoding parameter

        return {
            secret: i.slice(0, 32),
            chainCode: i.slice(32, i.length),
        };
    },

    derivePrivateKey(privKeyBytes, chainCode, index, harden) {
        let data;
        let indexBuffer = Buffer.from([index]);

        if (harden) {
            const c = new BN(index).or(new BN(0x80000000));

            indexBuffer = this.bnToBuffer(c);

            const privKeyBuffer = Buffer.from(privKeyBytes);

            data = Buffer.from([0]);
            data = Buffer.concat([data, privKeyBuffer]);
        } else {
            const pubKey = Secp256k1.publicKeyCreate(privKeyBytes);
            // TODO

            if (index === 0) {
                indexBuffer = Buffer.from([0, 0, 0, 0]);
            }
            data = pubKey;
        }
        data = Buffer.concat([data, indexBuffer]);
        const i64P = hd.i64(chainCode, Uint8Array.from(data));
        const aInt = new BN(privKeyBytes);
        const bInt = new BN(i64P.secret);
        const x = hd.addScalars(aInt, bInt);

        return {
            data: this.bnToBuffer(x),
            chainCode: i64P.chainCode,
        };
    },

    addScalars(a, b) {
        const c = a.add(b);
        const bn = require('secp256k1/lib/js/bn/index');
        const n = bn.n.toBuffer();
        const x = c.mod(new BN(n));

        return x;
    },

    bnToBuffer(bn) {
        return this.stripZeros(new Buffer(this.padToEven(bn.toString(16)), 'hex'));
    },

    stripZeros(buffer) {
        var i = 0; // eslint-disable-line
        for (i = 0; i < buffer.length; i++) {
            if (buffer[i] !== 0) {
                break;
            }
        }
        return (i > 0) ? buffer.slice(i) : buffer;
    },

    padToEven(str) {
        return str.length % 2 ? `0${str}` : str;
    },
};

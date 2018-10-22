import {buildLinkSignMsg, buildSignature, buildTxRequest} from './message';
const constants = require('./constants');
const cyberdKeypair = require('./keypair');
const codec = require("./codec");

const builder = {
    buildSignMsg(req, chainId) {

        if (codec.hex.isHex(req.acc.address)) {
            req.acc.address = codec.bech32.toBech32(constants.CyberdNetConfig.PREFIX_BECH32_ACCADDR, req.acc.address)
        }

        let msg;
        switch (req.type) {
            case constants.TxType.LINK: {
                msg = buildLinkSignMsg(req.acc, req.fromCid, req.toCid, chainId);
                break;
            }
            default: {
                throw new Error("not exist tx type")
            }
        }
        msg.validateBasic()
        return msg
    },

    signTxRequest(signMsg, privateKey) {

        let objectToSign = signMsg.getSignObject()

        let signedBytes = cyberdKeypair.sign(privateKey, objectToSign)
        let keypair = cyberdKeypair.import(privateKey)

        let signs = [buildSignature(codec.hex.hexToBytes(keypair.publicKey), signedBytes, signMsg.accnum, signMsg.sequence)]
        return buildTxRequest(signMsg.msgs, signMsg.fee, signs, signMsg.memo)
    },

    buildAndSignTxRequest(req, privateKey, chainId) {
        let signMsg = this.buildSignMsg(req, chainId);
        return this.signTxRequest(signMsg, privateKey)
    }
}

export default builder;

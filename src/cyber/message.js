import utils from './utils';

const constants = require('./constants');
const amino = require('./amino');


class Validator {
    validateBasic() {
        throw new Error('not implement');
    }
}

class Msg extends Validator {
    getSignObject() {
        throw new Error('not implement');
    }

    type() {
        throw new Error('not implement');
    }
}

class Coin {
    constructor(amount, denom) {
        this.denom = denom;
        this.amount = amount;
    }
}

class MsgLink extends Msg {
    constructor(from, fromCid, toCid) {
        super();
        this.address = from;
        this.links = [{from: fromCid, to: toCid}];
        console.log(this)
    }

    getSignObject() {
        return amino.marshalJSON(this.type(), utils.sortObjectKeys(this));
    }

    validateBasic() {
        this.links.forEach((link) => {
            if (utils.isEmpty(link.from)) {
                throw new Error('from cid is empty');
            }
            if (utils.isEmpty(link.to)) {
                throw new Error('to cid is empty');
            }
        });
    }

    type() {
        return 'cyberd/Link';
    }
}

class Input {
    constructor(address, amount) {
        this.address = address;
        this.coins = [new Coin(amount, 'cyb')];
    }
}

class Output {
    constructor(address, amount) {
        this.address = address;
        this.coins = [new Coin(amount, 'cyb')];
    }
}

class MsgSend extends Msg {
    constructor(from, to, amount) {
        super();
        this.inputs = [new Input(from, amount)];
        this.outputs = [new Output(to, amount)];
    }

    getSignObject() {
        return amino.marshalJSON(this.type(), utils.sortObjectKeys(this));
    }

    validateBasic() {
    }

    type() {
        return 'cosmos-sdk/Send';
    }
}

class Fee {
    constructor(amount, gas) {
        this.amount = amount;
        if (!gas) {
            gas = constants.CyberdNetConfig.MAXGAS;
        }
        this.gas = gas;
    }

    getSignObject() {
        if (utils.isEmpty(this.amount)) {
            this.amount = [new Coin('0', '')];
        }
        return this;
    }
}


class SignMsg extends Msg {
    constructor(chainID, accnum, sequence, fee, msg, memo) {
        super();
        this.chainID = chainID;
        this.accnum = accnum;
        this.sequence = sequence;
        this.fee = fee;
        this.msgs = [msg];
        this.memo = memo;
    }

    getSignObject() {
        const msgs = [];

        this.msgs.forEach((msg) => {
            msgs.push(msg.getSignObject());
        });

        const signObject = {
            account_number: this.accnum,
            chain_id: this.chainID,
            fee: this.fee.getSignObject(),
            memo: this.memo,
            msgs,
            sequence: this.sequence,
        };

        return utils.sortObjectKeys(signObject);
    }

    validateBasic() {
        if (utils.isEmpty(this.chainID)) {
            throw new Error('chainID is empty');
        }
        if (this.accnum < 0) {
            throw new Error('accountNumber is empty');
        }
        if (this.sequence < 0) {
            throw new Error('sequence is empty');
        }
        this.msgs.forEach((msg) => {
            msg.validateBasic();
        });
    }
}

class Signature {
    constructor(pub_key, signature, account_number, sequence) {
        this.pub_key = pub_key;
        this.signature = signature;
        this.account_number = account_number;
        this.sequence = sequence;
    }
}

class TxRequest {
    constructor(msgs, fee, signatures, memo) {
        this.msgs = msgs;
        this.fee = fee;
        this.signatures = signatures;
        this.memo = memo;
    }
}


export const buildLinkSignMsg = (acc, cidTo, cidFrom, chainId) => {
    const fee = new Fee();
    const msg = new MsgLink(acc.address, cidTo, cidFrom);

    return new SignMsg(chainId, acc.account_number, acc.sequence, fee, msg, '');
};

export const buildSendSignMsg = (acc, from, to, amount, chainId) => {
    const fee = new Fee();
    const msg = new MsgSend(from, to, amount);

    return new SignMsg(chainId, acc.account_number, acc.sequence, fee, msg, '');
};

export const buildSignature = (pub_key, signature, account_number, sequence) => new Signature(pub_key, signature, account_number, sequence);

export const buildTxRequest = (msgs, fee, signatures, memo) => new TxRequest(msgs, fee, signatures, memo);

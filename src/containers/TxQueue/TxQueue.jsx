import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTransactions, resend } from '../../redux/wallet';
import CybLink from '../../components/CybLink';

function syntaxHighlight(json) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

class TxQueue extends Component {
    componentDidMount() {
        this.props.getTransactions(this.props.defaultAccount)
    }

    resend = (txHash) => {
        this.props.resend(txHash);
    }

    render() {
        const { defaultAccount, transactions } = this.props;
        return (
            <div>
                <h2>transaction</h2>
                <div>
                    {transactions.map(item => (
                        <div key={item.txHash}>
                            <CybLink dura={`${item.txHash}.eth`}>{item.txHash}</CybLink>
                            {/*<button onClick={() => this.resend(item.txHash)}>resend</button>*/}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        transactions: state.wallet.transactions,
        defaultAccount: state.wallet.defaultAccount
    }),
    {
        getTransactions,
        resend
    }
)(TxQueue);

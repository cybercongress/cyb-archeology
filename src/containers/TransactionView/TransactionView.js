import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTransaction } from '../../redux/wallet';

import './transaction.css';

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

class TransactionView extends Component {
    componentDidMount() {
        this.props.getTransaction(this.props.params.txHash)
    } 
    render() {
        const { data } = this.props;
        return (
            <div>
                <h2>transaction</h2>
                {data ? (
                    <pre dangerouslySetInnerHTML={{ __html: syntaxHighlight(data) }}>
                    </pre>
                    ): (
                        <div>not found</div>
                    )}
            </div>
        );
    }
}

export default connect(
    state => ({
        data: state.wallet.transaction
    }),
    {
        getTransaction
    }
)(TransactionView);

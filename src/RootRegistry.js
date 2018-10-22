import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {addRegistryItem, deleteRegistryItem, getRegistryItemsAsArray} from "./redux/rootRegistry";

import Container from './components/Container/Container';

class RootRegistry extends Component {

    addRegistryItem = () => {
        const name = this.refs.name.value;
        const hash = this.refs.hash.value;
        const isIpfs = !!this.refs.ipfs.checked;
        this.props.addRegistryItem(
            name,
            hash,
            isIpfs ? 'ipfs' : 'ipns'
        ).then(() => {
            this.refs.name.value = '';
            this.refs.hash.value = '';
        });
    }

    deleteRegistryItem = (itemName) => {
        this.props.deleteRegistryItem(itemName);
    }

    render() {
        const rows = this.props.registryItems.map(item => (
            <tr key={item.name}>
                <td>.{item.name}</td>
                <td>{item.hash}</td>
                <td>{item.protocol}</td>
                <td>
                    <button onClick={() => this.deleteRegistryItem(item.name)}>remove</button>
                </td>
            </tr>
        ))
        return (
            <Container>
                <div>
                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>hash</th>
                            <th>protocol</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {rows}
                        <tr key='add_row'>
                            <td>.<input ref='name' placeholder='name'/></td>
                            <td><input ref='hash' placeholder='hash'/></td>
                            <td>
                                <label>
                                    <input type='radio' defaultChecked={true} ref='ipfs' name='protocol'/>ipfs
                                </label>
                                <label>
                                    <input type='radio' defaultChecked={false} ref='ipns' name='protocol'/>ipns
                                </label>
                            </td>
                            <td>
                                <button onClick={this.addRegistryItem}>add</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </Container>
        );
    }
}

export default connect(
    state => ({
        registryItems: getRegistryItemsAsArray(state)
    }),
    {
        addRegistryItem,
        deleteRegistryItem
    }
)(RootRegistry);

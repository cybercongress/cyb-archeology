import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import {
    //    Title,
    MainContainer,
    PageTitle,
    Table,
    Button,
    Input,
    FlexContainer,
    Text,
    ScrollContainer,
} from '@cybercongress/ui';
import {
    addRegistryItem,
    deleteRegistryItem,
    getRegistryItemsAsArray,
    resetToDefault,
} from '../../redux/rootRegistry';

// import Button from '../../components/Button/Button';
// import Input from '../../components/Input/Input';
// import ScrollContainer from '../../components/ScrollContainer/ScrollContainer';
// import Table from '../../components/Table/Table';

class RootRegistryPage extends Component {
    addRegistryItem = () => {
        const name = this.name.value;
        const hash = this.hash.value;
        const isIpfs = !!this.refs.ipfs.checked;

        this.props.addRegistryItem(name, hash, isIpfs ? 'ipfs' : 'ipns').then(() => {
            this.name.value = '';
            this.hash.value = '';
        });
    };

    deleteRegistryItem = (itemName) => {
        this.props.deleteRegistryItem(itemName);
    };

    render() {
        const { registryItems } = this.props;

        const rows = registryItems.map(item => (
            <tr key={ item.name }>
                <td>
.
                    {item.name}
                </td>
                <td>{item.hash}</td>
                <td>{item.protocol}</td>
                <td>
                    <Button sizeSm color='blue' onClick={ () => this.deleteRegistryItem(item.name) }>
                        REMOVE
                    </Button>
                </td>
            </tr>
        ));

        return (
            <ScrollContainer>
                <MainContainer>
                    <PageTitle>Cyb root registry</PageTitle>
                    <div style={ { paddingBottom: 20 } }>
                        <Button sizeSm color='blue' onClick={ this.props.resetToDefault }>
                            RESET TO DEFAULT
                        </Button>
                    </div>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>hash</th>
                                    <th>Protocol</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {rows}
                                <tr className='addRow' key='add_row'>
                                    <td>
                                        <Input
                                          inputRef={ (node) => {
                                                this.name = node;
                                            } }
                                          placeholder='name'
                                        />
                                    </td>
                                    <td>
                                        <Input
                                          inputRef={ (node) => {
                                                this.hash = node;
                                            } }
                                          placeholder='hash'
                                        />
                                    </td>
                                    <td>
                                        <FlexContainer noPadding>
                                            <input
                                              type='radio'
                                              defaultChecked
                                              ref='ipfs'
                                              name='protocol'
                                            />
                                            <Text color='black' size='lg'>
                                                ipfs
                                            </Text>
                                        </FlexContainer>
                                        <FlexContainer noPadding>
                                            <input
                                              type='radio'
                                              defaultChecked={ false }
                                              ref='ipns'
                                              name='protocol'
                                            />
                                            <Text color='black' size='lg'>
                                                ipns
                                            </Text>
                                        </FlexContainer>

                                        {/* <input type='radio' defaultChecked ref='ipfs' name='protocol' />
ipfs

                                        <input type='radio' defaultChecked={ false } ref='ipns' name='protocol' />
ipns */}
                                    </td>
                                    <td>
                                        <Button
                                          sizeSm
                                          color='turquoise'
                                          onClick={ this.addRegistryItem }
                                        >
                                            ADD
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </MainContainer>
            </ScrollContainer>
        );
    }
}

export default connect(
    state => ({
        registryItems: getRegistryItemsAsArray(state),
    }),
    {
        addRegistryItem,
        deleteRegistryItem,
        resetToDefault,
    },
)(RootRegistryPage);

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
    TableEv,
    Pane,
    IconButton,
    Popover,
    Menu,
    TextEv,
    TextInput,
    Dialog,
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
    state = {
        isShownRemove: false,
        isShownRename: false,
        isShownAdd: false,
        name: '',
        emptyName: false,
        hash: '',
        emptyHash: false,
    };

    addRegistryItem = () => {
        const name = this.state.name;
        const hash = this.state.hash;
        const isIpfs = !!this.refs.ipfs.checked;

        this.props.addRegistryItem(name, hash).then(() => {
            this.state.name = '';
            this.state.hash = '';
        });
    };

    isShownAdd = () => {
        this.setState({
            isShownAdd: !this.state.isShownAdd,
        });
    };

    isShownRemove = () => {
        this.setState({
            isShownRemove: !this.state.isShownRemove,
        });
    };

    isShownRename = () => {
        this.setState({
            isShownRename: !this.state.isShownRename,
        });
    };

    deleteRegistryItem = (itemName) => {
        this.props.deleteRegistryItem(itemName);
    };

    nameApp = (event) => {
        this.setState({
            name: event.target.value,
        });
    };

    ipfsApp = (event) => {
        this.setState({
            hash: event.target.value,
        });
    };

    render() {
        const { registryItems } = this.props;

        const MenuRow = ({ items }) => (
            <Menu>
                {/* <Menu.Group>
                     <Menu.Item icon='edit' onClick={ () => this.isShownRename() }>
                        Rename
                    </Menu.Item>
                </Menu.Group> */}
                {/* <Menu.Divider /> */}
                <Menu.Group>
                    <Menu.Item
                      icon='trash'
                      intent='danger'
                      onClick={ () => this.deleteRegistryItem(items) }
                    >
                        Remove
                    </Menu.Item>
                </Menu.Group>
            </Menu>
        );

        const rows = registryItems.map(item => (
            <TableEv.Row paddingLeft={ 20 } height={ 50 } isSelectable key={ item.name }>
                <TableEv.TextCell>
.
                    {item.name}
                </TableEv.TextCell>
                <TableEv.TextCell flexGrow={ 3 }>{item.hash}</TableEv.TextCell>
                <TableEv.Cell width={ 60 } flex='none'>
                    {/* <Button sizeSm color='blue' onClick={ () => this.deleteRegistryItem(item.name) }>
                        REMOVE
                    </Button> */}
                    <Popover content={ <MenuRow items={ item.name } /> }>
                        <Pane paddingY={ 5 } paddingX={ 5 } width='100%'>
                            <IconButton iconSize={ 12 } appearance='minimal' icon='more' />
                        </Pane>
                    </Popover>
                </TableEv.Cell>
            </TableEv.Row>
        ));

        return (
            <ScrollContainer>
                <MainContainer>
                    <div style={ { paddingBottom: 20 } }>
                        <Button onClick={ this.props.resetToDefault }>RESET TO DEFAULT</Button>
                        <Button
                          iconBefore='add'
                          height={ 32 }
                          paddingX={ 15 }
                          onClick={ () => this.isShownAdd() }
                        >
                            Add
                        </Button>
                    </div>
                    <div>
                        <TableEv>
                            <TableEv.Head paddingLeft={ 20 }>
                                <TableEv.TextHeaderCell>Name</TableEv.TextHeaderCell>
                                <TableEv.TextHeaderCell flexGrow={ 3 }>hash</TableEv.TextHeaderCell>
                                <TableEv.TextHeaderCell flex='none' width={ 60 } />
                            </TableEv.Head>
                            <TableEv.Body style={ { backgroundColor: '#fff', overflowY: 'hidden' } }>
                                {rows}
                                {/* <tr className='addRow' key='add_row'>
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
                                        </FlexContainer> */}

                                {/* <input type='radio' defaultChecked ref='ipfs' name='protocol' />
ipfs

                                        <input type='radio' defaultChecked={ false } ref='ipns' name='protocol' />
ipns */}
                                {/* </td>
                                    <td>
                                        <Button
                                          sizeSm
                                          color='turquoise'
                                          onClick={ this.addRegistryItem }
                                        >
                                            ADD
                                        </Button>
                                    </td>
                                </tr> */}
                            </TableEv.Body>
                        </TableEv>
                    </div>
                    <Dialog
                      isShown={ this.state.isShownAdd }
                      title='Add domain'
                      onCloseComplete={ () => this.setState({ isShownAdd: false }) }
                      confirmLabel='Update'
                      width={ 450 }
                      onConfirm={ close => close(this.addRegistryItem) }
                    >
                        <Pane
                          paddingTop={ 20 }
                          paddingBottom={ 30 }
                          paddingX={ 40 }
                          display='flex'
                          flexDirection='column'
                        >
                            <Pane display='flex' flexDirection='column' marginBottom={ 25 }>
                                <Text display='inline-block' marginBottom={ 10 }>
                                    Name
                                </Text>
                                <TextInput width='100%' onChange={ e => this.nameApp(e) } />
                            </Pane>
                            <Pane display='flex' flexDirection='column'>
                                <Text display='inline-block' marginBottom={ 10 }>
                                    IPFS Hash
                                </Text>
                                <TextInput width='100%' onChange={ e => this.ipfsApp(e) } />
                            </Pane>
                        </Pane>
                    </Dialog>
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

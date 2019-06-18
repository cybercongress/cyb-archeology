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
        // const isIpfs = !!this.refs.ipfs.checked;

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
                </Menu.Group>
                <Menu.Divider /> */}
                <Menu.Group>
                    <Menu.Item
                      icon='trash'
                      intent='danger'
                      onClick={ () => this.deleteRegistryItem(items) }
                        // onClick={ () => this.isShownRemove()}
                    >
                        Remove
                    </Menu.Item>
                </Menu.Group>
            </Menu>
        );

        const rows = registryItems.map(item => (
            <TableEv.Row
              paddingLeft={ 20 }
              height={ 50 }
              borderBottom='none'
              isSelectable
              key={ item.name }
            >
                <TableEv.TextCell flexGrow={ 1 }>
                    <span style={ { color: '#fff', fontSize: '16px' } }>
.
                        {item.name}
                    </span>
                </TableEv.TextCell>
                <TableEv.TextCell flexGrow={ 2 }>
                    <span style={ { color: '#fff', fontSize: '16px' } }>{item.hash}</span>
                </TableEv.TextCell>
                <TableEv.Cell width={ 60 } flex='none'>
                    {/* <Button sizeSm color='blue' onClick={ () => this.deleteRegistryItem(item.name) }>
                        REMOVE
                    </Button> */}
                    <Popover content={ <MenuRow items={ item.name } /> }>
                        <Pane paddingY={ 5 } paddingX={ 5 } width='100%'>
                            <IconButton
                              iconSize={ 12 }
                              className='color-white-svg icon-btn'
                              appearance='minimal'
                              icon='more'
                            />
                        </Pane>
                    </Popover>
                </TableEv.Cell>
            </TableEv.Row>
        ));

        return (
            <div style={ { height: '100%' } }>
                <ScrollContainer style={ { height: 'calc(100% - 75px)' } }>
                    <MainContainer>
                        {/* <Pane
                          marginBottom={ 15 }
                          width='100%'
                          display='flex'
                          justifyContent='flex-end'
                        >
                            <Button
                              className='btn'
                              marginRight={ 10 }
                              onClick={ this.props.resetToDefault }
                            >
                                RESET TO DEFAULT
                            </Button>
                            <Button
                              iconBefore='add'
                              height={ 32 }
                              className='btn'
                              paddingX={ 15 }
                              onClick={ () => this.isShownAdd() }
                            >
                                Add
                            </Button>
                        </Pane> */}

                        <TableEv>
                            <TableEv.Head
                              style={ {
                                    backgroundColor: '#000',
                                    borderBottom: '1px solid #ffffff80',
                                } }
                              paddingLeft={ 20 }
                            >
                                <TableEv.TextHeaderCell>
                                    <span style={ { color: '#fff', fontSize: '17px' } }>Name</span>
                                </TableEv.TextHeaderCell>
                                <TableEv.TextHeaderCell flexGrow={ 2 }>
                                    <span style={ { color: '#fff', fontSize: '17px' } }>
                                        IPFS Hash
                                    </span>
                                </TableEv.TextHeaderCell>
                                <TableEv.TextHeaderCell flex='none' width={ 60 } />
                            </TableEv.Head>
                            <TableEv.Body style={ { backgroundColor: '#000', overflowY: 'hidden' } }>
                                {rows}
                            </TableEv.Body>
                        </TableEv>

                        <Dialog
                          isShown={ this.state.isShownAdd }
                          title='Add domain'
                          onCloseComplete={ () => this.setState({ isShownAdd: false }) }
                          confirmLabel='Update'
                          width={ 450 }
                          onConfirm={ close => close(this.addRegistryItem()) }
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

                        {/* <Dialog
                      isShown={ this.state.isShownRename }
                      title='Rename domain'
                      onCloseComplete={() => this.setState({ isShownRename: false })}
                      onConfirm={ close => close(this.addRegistryItem()) }
                      confirmLabel='Update'
                      width={450}
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
                                <TextInput width='100%' />
                            </Pane>
                            <Pane display='flex' flexDirection='column'>
                                <Text display='inline-block' marginBottom={ 10 }>
                                    IPFS Hash
                                </Text>
                                <TextInput width='100%' />
                            </Pane>
                        </Pane>
                    </Dialog> */}

                        <Dialog
                          isShown={ this.state.isShownRemove }
                          title='Remove domain'
                          intent='danger'
                          onCloseComplete={ () => this.setState({ isShownRemove: false }) }
                          confirmLabel='Delete'
                          width={ 450 }
                          onConfirm={ close => close(this.deleteRegistryItem(this.items)) }
                        >
                            Are you sure you want to delete Presentation?
                        </Dialog>
                    </MainContainer>
                </ScrollContainer>
                <Pane
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  position='fixed'
                  bottom={ 0 }
                  width='100%'
                  backgroundColor='#000000'
                  paddingY={ 15 }
                  zIndex={ 2 }
                >
                    <Pane
                      alignItems='center'
                      justifyContent='center'
                      display='flex'
                      width='100%'
                      maxWidth={ 1000 }
                    >
                        <Button
                          height={ 32 }
                          paddingX={ 15 }
                          marginX={ 10 }
                          className='btn'
                          minWidth={ 130 }
                          fontSize='14px'
                          onClick={ this.props.resetToDefault }
                        >
                            RESET TO DEFAULT
                        </Button>
                        <Button
                          iconBefore='add'
                          height={ 32 }
                          paddingX={ 15 }
                          marginX={ 10 }
                          className='btn'
                          minWidth={ 130 }
                          justifyContent='center'
                          fontSize='14px'
                          onClick={ () => this.isShownAdd() }
                        >
                            Add
                        </Button>
                    </Pane>
                </Pane>
            </div>
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

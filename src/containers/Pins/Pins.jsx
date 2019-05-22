import React, { Component } from 'react';

// import { connect } from 'react-redux';

// import * as actions from '../../redux/settings';
import {
    MainContainer,
    ScrollContainer,
    TableEv as Table,
    Pane,
    IconButton,
    Menu,
    Popover,
    Dialog,
    TextEv as Text,
    TextInput,
} from '@cybercongress/ui';

const addRegistryItem = [
    {
        name: 'Wikipedia',
        hash: '.wiki',
        protocol: 'ipfs',
    },
    {
        name: 'Cyber Search',
        hash: '.cyber',
        protocol: 'ipfs',
    },
    {
        name: 'My dragons',
        hash: '.dragons/account',
        protocol: 'ipfs',
    },
    {
        name: 'Presentation',
        hash: 'QmS2F1UgmYHAekcvezFLCrBibEBjJezSDqwq8fuwF5Qqvi',
        protocol: 'ipfs',
    },
];

class Pins extends Component {
    state = {
        isShownRename: false,
    };

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

    isShownRename = () => {
        this.setState({
            isShownRename: !this.state.isShownRename,
        });
    };

    render() {
        const {
            registryItems, isShown, isShownRename, isShownAdd,
        } = this.props;

        const rows = addRegistryItem.map(item => (
            <Table.Row
              borderBottom='none'
              paddingLeft={ 20 }
              height={ 50 }
              isSelectable
              key={ item.name }
            >
                <Table.TextCell>
                    <span style={ { color: '#fff', fontSize: 16 } }>
.
                        {item.name}
                    </span>
                </Table.TextCell>
                <Table.TextCell flexShrink={ 0 } flexGrow={ 1.5 }>
                    <span style={ { color: '#fff', fontSize: 16 } }>{item.hash}</span>
                </Table.TextCell>
                {/* <Table.TextCell>{item.protocol}</Table.TextCell> */}
                <Table.Cell width={ 60 } flex='none'>
                    {/* <Button sizeSm color='blue' onClick={ () => this.deleteRegistryItem(item.name) }> */}
                    <Popover
                      position='bottom'
                      content={ (
                          <Menu>
                              <Menu.Group>
                                  <Menu.Item icon='edit' onClick={ () => this.isShownRename() }>
                                        Rename
                                  </Menu.Item>
                              </Menu.Group>
                              <Menu.Divider />
                              <Menu.Group>
                                  <Menu.Item icon='trash' intent='danger'>
                                        Remove
                                  </Menu.Item>
                              </Menu.Group>
                          </Menu>
) }
                    >
                        <Pane paddingY={ 5 } paddingX={ 5 } width='100%'>
                            <IconButton
                              iconSize={ 12 }
                              className='color-white-svg icon-btn'
                              appearance='minimal'
                              icon='more'
                            />
                        </Pane>
                    </Popover>
                    {/* </Button> */}
                </Table.Cell>
            </Table.Row>
        ));

        return (
            <ScrollContainer>
                <MainContainer>
                    <Table>
                        <Table.Head
                          style={ { backgroundColor: '#000', borderBottom: '1px solid #ffffff80' } }
                          paddingLeft={ 20 }
                        >
                            <Table.TextHeaderCell>
                                <span style={ { color: '#fff', fontSize: 17 } }>Name</span>
                            </Table.TextHeaderCell>
                            <Table.TextHeaderCell flexShrink={ 0 } flexGrow={ 1.5 }>
                                <span style={ { color: '#fff', fontSize: 17 } }>DURA</span>
                            </Table.TextHeaderCell>
                            <Table.TextHeaderCell width={ 60 } flex='none' />
                        </Table.Head>
                        <Table.Body style={ { backgroundColor: '#000', overflowY: 'hidden' } }>
                            {rows}
                        </Table.Body>
                    </Table>

                    <Dialog
                      isShown={ this.state.isShownRename }
                      title='Rename pin'
                        //  onCloseComplete={() => setState({ isShown: false })}
                      confirmLabel='Update'
                      width={ 450 }
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
                    </Dialog>
                </MainContainer>
            </ScrollContainer>
        );
    }
}

export default Pins;

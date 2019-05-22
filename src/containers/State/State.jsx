import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import * as actions from '../../redux/settings';
import {
    HelloContainer,
    HelloContainerLeftCol,
    HelloContainerRightCol,
    HelloContainerRightColContent,
    HelloContainerRightColBtn,
    BigImg,
    ButtonEverGreen,
    Pane,
    TableEv as Table,
    TextEv as Text,
    Checkbox,
} from '@cybercongress/ui';

const idrobot = require('../Hello/img/idrobot.png');

const State = () => (
    <HelloContainer height='calc(100% - 60px)' marginTop={ 60 }>
        <HelloContainerLeftCol>
            <BigImg srcBigImg={ idrobot } />
        </HelloContainerLeftCol>
        <HelloContainerRightCol>
            <HelloContainerRightColContent>
                <Pane width='100%'>
                    <Table>
                        <Table.Head>
                            <Table.TextHeaderCell flexGrow={ 6 }>Component</Table.TextHeaderCell>
                            <Table.TextHeaderCell textAlign='center' flexGrow={ 1 }>
                                Export
                            </Table.TextHeaderCell>
                        </Table.Head>
                        <Table.Body style={ { backgroundColor: '#fff', overflowY: 'hidden' } }>
                            <Table.Row isSelectable>
                                <Table.TextCell paddingX={ 20 } flexGrow={ 6 }>
                                    <Text>tx.cyb</Text>
                                </Table.TextCell>
                                <Table.TextCell flexGrow={ 1 }>
                                    <Pane width='100%' display='flex' justifyContent='center'>
                                        <Checkbox />
                                    </Pane>
                                </Table.TextCell>
                            </Table.Row>
                            <Table.Row isSelectable>
                                <Table.TextCell paddingX={ 20 } flexGrow={ 6 }>
                                    <Text>path.cyb</Text>
                                </Table.TextCell>
                                <Table.TextCell flexGrow={ 1 }>
                                    <Pane width='100%' display='flex' justifyContent='center'>
                                        <Checkbox />
                                    </Pane>
                                </Table.TextCell>
                            </Table.Row>
                            <Table.Row isSelectable>
                                <Table.TextCell paddingX={ 20 } flexGrow={ 6 }>
                                    <Text>root.cyb</Text>
                                </Table.TextCell>
                                <Table.TextCell flexGrow={ 1 }>
                                    <Pane width='100%' display='flex' justifyContent='center'>
                                        <Checkbox />
                                    </Pane>
                                </Table.TextCell>
                            </Table.Row>
                            <Table.Row isSelectable>
                                <Table.TextCell paddingX={ 20 } flexGrow={ 6 }>
                                    <Text>connect.cyb</Text>
                                </Table.TextCell>
                                <Table.TextCell flexGrow={ 1 }>
                                    <Pane width='100%' display='flex' justifyContent='center'>
                                        <Checkbox />
                                    </Pane>
                                </Table.TextCell>
                            </Table.Row>
                            <Table.Row isSelectable>
                                <Table.TextCell paddingX={ 20 } flexGrow={ 6 }>
                                    <Text>pins.cyb</Text>
                                </Table.TextCell>
                                <Table.TextCell flexGrow={ 1 }>
                                    <Pane width='100%' display='flex' justifyContent='center'>
                                        <Checkbox />
                                    </Pane>
                                </Table.TextCell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Pane>
            </HelloContainerRightColContent>
            <HelloContainerRightColBtn center>
                <ButtonEverGreen>Export selected</ButtonEverGreen>
            </HelloContainerRightColBtn>
        </HelloContainerRightCol>
    </HelloContainer>
);

export default State;

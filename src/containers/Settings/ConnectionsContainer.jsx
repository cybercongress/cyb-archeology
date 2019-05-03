import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    TableEv as Table, Pill, TextEv as Text, TextInput, Pane,
} from '@cybercongress/ui';
import {
    setIPFS,
    setIpfsWriteUrl,
    setCyberdUrl,
    setCyberdWsUrl,
    setEthEndpoint,
    checkStatus,
    getIpfsWriteUrl,
} from '../../redux/settings';
import { debounce, getColorByStatus } from '../../utils';

class ConnectionsContainer extends Component {
    constructor(props) {
        super(props);

        this.checkStatuses = debounce(this.props.checkStatus, 500);
    }

    componentWillMount() {
        this.props.checkStatus();
    }

    onIpfsChange = (e) => {
        this.props.setIPFS(e.target.value);
        this.checkStatuses();
    };

    onIpfsWriteChange = (e) => {
        this.props.setIpfsWriteUrl(e.target.value);
        this.checkStatuses();
    };

    onCyberdChange = (e) => {
        this.props.setCyberdUrl(e.target.value);
        this.checkStatuses();
    };

    onCyberdWsChange = (e) => {
        this.props.setCyberdWsUrl(e.target.value);
        this.checkStatuses();
    };

    onEthChange = (e) => {
        this.props.setEthEndpoint(e.target.value);
        this.checkStatuses();
    };

    render() {
        const {
            ipfsUrl,
            ipfsWriteUrl,

            cyberdUrl,
            cyberdWsUrl,

            ipfsStatus,
            ipfsWriteStatus,

            cyberdStatus,
            cyberdWsStatus,

            ethUrl,
            ethStatus,
        } = this.props;

        return (
            <Pane width='100%'>
                <Table>
                    <Table.Head>
                        <Table.TextHeaderCell>Provider</Table.TextHeaderCell>
                        <Table.TextHeaderCell>Endpoint</Table.TextHeaderCell>
                    </Table.Head>
                    <Table.Body style={ { backgroundColor: '#fff', overflowY: 'hidden' } }>
                        <Table.Row isSelectable>
                            <Table.TextCell>
                                <Pill
                                    height={ 8 }
                                    width={ 8 }
                                    borderRadius='50%'
                                    paddingX={ 0 }
                                    isSolid
                                    marginLeft={ 20 }
                                    marginRight={ 25 }
                                    color={ getColorByStatus(ipfsStatus) }
                                />
                                <Text>IPFS read</Text>
                            </Table.TextCell>
                            <Table.TextCell>
                                <TextInput value={ ipfsUrl } onChange={ e => this.onIpfsChange(e) } width='80%' />
                            </Table.TextCell>
                        </Table.Row>
                        <Table.Row isSelectable>
                            <Table.TextCell>
                                <Pill
                                    height={ 8 }
                                    width={ 8 }
                                    borderRadius='50%'
                                    paddingX={ 0 }
                                    isSolid
                                    marginLeft={ 20 }
                                    marginRight={ 25 }
                                    color={ getColorByStatus(ipfsWriteStatus) }
                                />
                                <Text>IPFS write</Text>
                            </Table.TextCell>
                            <Table.TextCell>
                                <TextInput value={ ipfsWriteUrl } onChange={ e => this.onIpfsWriteChange(e) } width='80%' />
                            </Table.TextCell>
                        </Table.Row>
                        <Table.Row isSelectable>
                            <Table.TextCell>
                                <Pill
                                    height={ 8 }
                                    width={ 8 }
                                    borderRadius='50%'
                                    paddingX={ 0 }
                                    isSolid
                                    marginLeft={ 20 }
                                    marginRight={ 25 }
                                    color={ getColorByStatus(ethStatus) }
                                />
                                <Text>Ethereum HTTP</Text>
                            </Table.TextCell>
                            <Table.TextCell>
                                <TextInput value={ ethUrl } onChange={ e => this.onEthChange(e) } width='80%' />
                            </Table.TextCell>
                        </Table.Row>
                        <Table.Row isSelectable>
                            <Table.TextCell>
                                <Pill
                                    height={ 8 }
                                    width={ 8 }
                                    borderRadius='50%'
                                    paddingX={ 0 }
                                    isSolid
                                    marginLeft={ 20 }
                                    marginRight={ 25 }
                                    color={ getColorByStatus(cyberdStatus) }
                                />
                                <Text>Cyberd HTTP</Text>
                            </Table.TextCell>
                            <Table.TextCell>
                                <TextInput value={ cyberdUrl } onChange={ e => this.onCyberdChange(e) } width='80%' />
                            </Table.TextCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.TextCell>
                                <Pill
                                    height={ 8 }
                                    width={ 8 }
                                    borderRadius='50%'
                                    paddingX={ 0 }
                                    isSolid
                                    marginLeft={ 20 }
                                    marginRight={ 25 }
                                    color={ getColorByStatus(cyberdWsStatus) }
                                />
                                <Text>Cyberd Ws</Text>
                            </Table.TextCell>
                            <Table.TextCell>
                                <TextInput value={ cyberdWsUrl } onChange={ e => this.onCyberdWsChange(e) } width='80%' />
                            </Table.TextCell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </Pane>
        );
    }
}

export default connect(({ settings }) => ({
    ipfsUrl: settings.ipfsUrl,
    ipfsWriteUrl: getIpfsWriteUrl({ settings }),

    ipfsStatus: settings.ipfsStatus,
    ipfsWriteStatus: settings.ipfsWriteStatus,

    cyberdUrl: settings.cyberdUrl,
    cyberdWsUrl: settings.cyberdWsUrl,

    cyberdStatus: settings.cyberdStatus,
    cyberdWsStatus: settings.cyberdWsStatus,

    ethUrl: settings.ethUrl,
    ethStatus: settings.ethStatus,
}), {
    setIPFS,
    setIpfsWriteUrl,
    setCyberdUrl,
    setCyberdWsUrl,
    setEthEndpoint,
    checkStatus,
    getIpfsWriteUrl,
})(ConnectionsContainer);

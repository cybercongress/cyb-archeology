import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ScrollContainer,
    SettingsIndicator,
    Control,
    FlexContainer,
    FlexContainerLeft,
    FlexContainerRight,
    FormControl,
    MainContainer,
    SectionContent,
    Section,
    PageTitle,
    Button,
    Input,
} from '@cybercongress/ui';
import * as actions from '../../redux/settings';
import CybLink from '../../components/CybLink';
import { getEthStatus } from '../../redux/wallet';

const ERROR_MESSAGE = 'Cannot connect. Used:';

class Settings extends Component {

    state = {
        ipfsError: false,
        ethError: false,
        cyberdError: false,
    };

    componentWillMount() {
        this.props.checkStatus();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.IPFS_END_POINT !== nextProps.IPFS_END_POINT
            || this.props.PARITY_END_POINT !== nextProps.PARITY_END_POINT
            || this.props.CYBERD_END_POINT !== nextProps.CYBERD_END_POINT
            || this.props.CYBERD_WS_END_POINT !== nextProps.CYBERD_WS_END_POINT) {
            this.ipfsInput.value = nextProps.IPFS_END_POINT;
            this.ethInput.value = nextProps.PARITY_END_POINT;
            this.cyberdInput.value = nextProps.CYBERD_END_POINT;
            this.cyberdWSInput.value = nextProps.CYBERD_WS_END_POINT;
        }
    }

    updateIPFS = () => {
        const { value } = this.ipfsInput;
        const { setIPFS } = this.props;

        actions
            .getIpfsStatus(value)
            .then((status) => {
                if (status === 'fail') {
                    this.setState({
                        ipfsError: true,
                    });
                } else {
                    setIPFS(value);
                }
            });
    };

    updateCyberd = () => {
        const { value } = this.cyberdInput;
        const { setSearch } = this.props;

        actions
            .getCyberStatus(value)
            .then((status) => {
                if (status.status === 'fail') {
                    this.setState({
                        cyberdError: true,
                    });
                } else {
                    setSearch(value);
                }
            });
    };

    updateEth = (endpoint) => {
        const { setEthEndpoint } = this.props;

        getEthStatus(endpoint)
            .then((status) => {
                if (status === 'fail') {
                    this.setState({
                        ethError: true,
                    });
                } else {
                    setEthEndpoint(endpoint);
                }
            });
    };

    setEthMain = () => {
        this.updateEth('http://earth.cybernode.ai:34545');
    };

    setEthKovan = () => {
        this.updateEth('http://earth.cybernode.ai:34645');
    };

    setEthRinkeby = () => {
        this.updateEth('http://earth.cybernode.ai:34745');
    };

    setEthCustom = () => {
        this.updateEth(this.ethInput.value);
    };

    updateIpfsWrite = () => {
        const url = this.ipfsWriteInput.value;

        this.props.setIpfsWriteUrl(url);
    };

    updateCyberdWS = () => {
        this.props.setSearchWS(this.cyberdWSInput.value);
    };

    onIpfsChange = () => {
        this.setState({
            ipfsError: false,
        });
    };

    onEthChange = () => {
        this.setState({
            ethError: false,
        });
    };

    onCyberdChange = () => {
        this.setState({
            cyberdError: false,
        });
    };

    render() {
        const {
            IPFS_END_POINT,
            PARITY_END_POINT,
            CYBERD_END_POINT,
            CYBERD_WS_END_POINT,

            ipfsStatus,
            parityStatus,
            cyberdStatus,

            resetAllSettings,
            ipfsWriteUrl,
        } = this.props;

        const {
            ipfsError,
            ethError,
            cyberdError,
        } = this.state;

        return (
            <ScrollContainer>
                <MainContainer>
                    <PageTitle>Settings</PageTitle>
                    <Section>
                        <SectionContent title='CONNECTION' grow={ 3 }>
                            <FormControl blockRow flex_basis_auto>
                                <Control title='IPFS read:'>
                                    <div style={ { width: '320px' } }>
                                        <Input
                                          inputRef={ node => (this.ipfsInput = node) }
                                          defaultValue={ IPFS_END_POINT }
                                          errorMessage={ ipfsError ? `${ERROR_MESSAGE} ${IPFS_END_POINT}` : '' }
                                          onChange={ this.onIpfsChange }
                                        />
                                    </div>

                                    <Button
                                      color='blue'
                                      style={ { height: '30px' } }
                                      onClick={ this.updateIPFS }
                                    >
                                        update
                                    </Button>
                                </Control>
                                <Control title='IPFS write:'>
                                    <div style={ { width: '320px' } }>
                                        <Input
                                          inputRef={ node => (this.ipfsWriteInput = node) }
                                          defaultValue={ ipfsWriteUrl }
                                        />
                                    </div>
                                    <Button
                                      color='blue'
                                      style={ { height: '30px' } }
                                      onClick={ this.updateIpfsWrite }
                                    >
                                        update
                                    </Button>
                                </Control>
                            </FormControl>

                            <FormControl blockRow flex_basis_auto>
                                <Control title='ETH node:'>
                                    <div style={ { width: '320px' } }>
                                        <Input
                                          inputRef={ node => (this.ethInput = node) }
                                          defaultValue={ PARITY_END_POINT }
                                          errorMessage={ ethError ? `${ERROR_MESSAGE} ${PARITY_END_POINT}` : '' }
                                          onChange={ this.onEthChange }
                                        />
                                    </div>
                                    <Button
                                      color='blue'
                                      style={ { height: '30px' } }
                                      onClick={ this.setEthCustom }
                                    >
                                        update
                                    </Button>
                                </Control>
                                <Control noText style={ { marginTop: 10 } }>
                                    <Button
                                      color='blue'
                                      style={ { height: '30px' } }
                                      onClick={ this.setEthMain }
                                    >
                                        Main
                                    </Button>
                                    <Button
                                      color='blue'
                                      style={ { height: '30px' } }
                                      onClick={ this.setEthRinkeby }
                                    >
                                        Rinkeby
                                    </Button>
                                    <Button
                                      color='blue'
                                      style={ { height: '30px' } }
                                      onClick={ this.setEthKovan }
                                    >
                                        Kovan
                                    </Button>
                                </Control>
                            </FormControl>

                            <FormControl blockRow flex_basis_auto>
                                <Control title='cyberd node:'>
                                    <div style={ { width: '320px' } }>
                                        <Input
                                          inputRef={ node => (this.cyberdInput = node) }
                                          defaultValue={ CYBERD_END_POINT }
                                          errorMessage={ cyberdError ? `${ERROR_MESSAGE} ${CYBERD_END_POINT}` : '' }
                                          onChange={ this.onCyberdChange }
                                        />
                                    </div>
                                    <Button
                                      color='blue'
                                      style={ { height: '30px' } }
                                      onClick={ this.updateCyberd }
                                    >
                                        update
                                    </Button>
                                </Control>
                                <Control title='cyberd ws:'>
                                    <div style={ { width: '320px' } }>
                                        <Input
                                          inputRef={ node => (this.cyberdWSInput = node) }
                                          defaultValue={ CYBERD_WS_END_POINT }
                                        />
                                    </div>
                                    <Button
                                      color='blue'
                                      style={ { height: '30px' } }
                                      onClick={ this.updateCyberdWS }
                                    >
                                        update
                                    </Button>
                                </Control>
                            </FormControl>
                        </SectionContent>

                        <SectionContent flex direction='column' title='STATUS'>
                            <FormControl blockRow>
                                <SettingsIndicator status={ ipfsStatus } />
                            </FormControl>
                            <FormControl blockRow>
                                <SettingsIndicator status={ parityStatus } />
                            </FormControl>
                            <FormControl blockRow>
                                <SettingsIndicator status={ cyberdStatus } />
                            </FormControl>
                        </SectionContent>
                    </Section>

                    <FlexContainer>
                        <FlexContainerLeft>
                            <CybLink dura='rr.cyb'>
                                <Button color='greenyellow'>
                                    CYB ROOT REGISTRY
                                </Button>
                            </CybLink>
                        </FlexContainerLeft>
                        <FlexContainerRight style={ { paddingRight: 20 } }>
                            <Button color='blue' onClick={ resetAllSettings }>
                                RESET SETTINGS
                            </Button>
                        </FlexContainerRight>
                    </FlexContainer>
                </MainContainer>
            </ScrollContainer>
        );
    }
}

export default connect(
    ({ settings }) => ({
        IPFS_END_POINT: settings.IPFS_END_POINT,
        PARITY_END_POINT: settings.PARITTY_END_POINT,
        CYBERD_END_POINT: settings.SEARCH_END_POINT,
        CYBERD_WS_END_POINT: settings.CYBERD_WS_END_POINT,

        ipfsStatus: settings.ipfsStatus,
        parityStatus: settings.ethNodeStatus,
        cyberdStatus: settings.cyberNodeStatus,
        ipfsWriteUrl: actions.getIpfsWriteUrl({ settings }),
    }),
    actions,
)(Settings);

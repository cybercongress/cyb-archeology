import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from './redux/settings';

import Container from './components/Container/Container';
import Titile from "./components/Titile/Titile";
import Button from "./components/Button/Button";
import Block, {BlockRow, RowItem} from "./components/Settings/Block";
import Input from "./components/Input/Input";
import Indicator, {SettingsIndicator} from "./components/Indicator/Indicator";
import {
    ConnectionContainer,
    NodeStatusContainer,
    SettingLabel, SettingRow,
    SettingsContainer
} from "./components/Settings/Settings";
import CybLink from "./components/CybLink";

const _IPFS_END_POINT = 'IPFS_END_POINT';
const _PARITY_END_POINT = 'PARITY_END_POINT';
const _CYBERD_END_POINT = 'CYBERD_END_POINT';

class Settings extends Component {

    updateIPFS = (endpoint) => {
        this.props.setIPFS(endpoint)
    };

    updateParity = (endpoint) => {
        this.props.setParity(endpoint)
    };

    updateCyberd = (endpoint) => {
        this.props.setSearch(endpoint)
    };

    componentWillMount() {
        this.props.checkStatus();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.IPFS_END_POINT !== nextProps.IPFS_END_POINT ||
            this.props.PARITY_END_POINT !== nextProps.PARITY_END_POINT ||
            this.props.CYBERD_END_POINT !== nextProps.CYBERD_END_POINT) {

            this.IPFS_END_POINT.value = nextProps.IPFS_END_POINT;
            this.PARITY_END_POINT.value = nextProps.PARITY_END_POINT;
            this.CYBERD_END_POINT.value = nextProps.CYBERD_END_POINT;
        }
    }

    updateEndpoint = (name) => {
        let endpoint;
        switch (name) {
            case _IPFS_END_POINT: {
                endpoint = this.IPFS_END_POINT.value;
                this.updateIPFS(endpoint);
                break;
            }
            case _PARITY_END_POINT: {
                endpoint = this.PARITY_END_POINT.value;
                this.updateParity(endpoint);
                break;
            }
            case _CYBERD_END_POINT: {
                endpoint = this.CYBERD_END_POINT.value;
                this.updateCyberd(endpoint);
                break;
            }
            default: {
            }
        }
    };

    render() {
        const {
            IPFS_END_POINT,
            PARITY_END_POINT,
            CYBERD_END_POINT,

            ipfsStatus,
            parityStatus,
            cyberdStatus,

            resetAllSettings
        } = this.props;

        return (
            <Container>
                <Titile>/ Settings</Titile>
                <SettingsContainer>
                    <ConnectionContainer>
                        <Titile inline={true}>CONNECTION</Titile>
                        <Block>

                            <BlockRow>
                                <SettingRow>
                                    <SettingLabel>IPFS node:</SettingLabel>
                                    <Input style={{width: 200}} inputRef={node => this.IPFS_END_POINT = node}
                                           defaultValue={IPFS_END_POINT}/>
                                    <Button onClick={() => this.updateEndpoint(_IPFS_END_POINT)}>update</Button>
                                </SettingRow>
                            </BlockRow>

                            <BlockRow>
                                <SettingRow>

                                    <SettingLabel>Parity node:</SettingLabel>
                                    <Input style={{width: 200}} inputRef={node => this.PARITY_END_POINT = node}
                                           defaultValue={PARITY_END_POINT}/>
                                    <Button onClick={() => this.updateEndpoint(_PARITY_END_POINT)}>update</Button>
                                </SettingRow>
                            </BlockRow>

                            <BlockRow>
                                <SettingRow>
                                    <SettingLabel>cyberd node:</SettingLabel>
                                    <Input style={{width: 200}} inputRef={node => this.CYBERD_END_POINT = node}
                                           defaultValue={CYBERD_END_POINT}/>
                                    <Button onClick={() => this.updateEndpoint(_CYBERD_END_POINT)}>update</Button>
                                </SettingRow>
                            </BlockRow>

                        </Block>
                    </ConnectionContainer>
                    <NodeStatusContainer>
                        <Titile inline={true}>STATUS</Titile>
                        <Block>
                            <BlockRow>
                                <SettingRow>
                                    <SettingsIndicator status={ipfsStatus}/>
                                </SettingRow>
                            </BlockRow>
                            <BlockRow>
                                <SettingRow>
                                    <SettingsIndicator status={parityStatus}/>
                                </SettingRow>
                            </BlockRow>
                            <BlockRow>
                                <SettingRow>
                                    <SettingsIndicator status={cyberdStatus}/>
                                </SettingRow>
                            </BlockRow>
                        </Block>
                    </NodeStatusContainer>
                </SettingsContainer>

                <Block>
                    <BlockRow>
                        <SettingRow>
                            <Button color='green' dura='rr.cyb'>CYB ROOT REGISTRY</Button>
                            <Button onClick={resetAllSettings}>RESET ALL SETTINGS</Button>
                        </SettingRow>
                    </BlockRow>
                </Block>
            </Container>
        );
    }
}

export default connect(
    ({settings}) => ({
        IPFS_END_POINT: settings.IPFS_END_POINT,
        PARITY_END_POINT: settings.PARITTY_END_POINT,
        CYBERD_END_POINT: settings.SEARCH_END_POINT,

        ipfsStatus: settings.ipfsStatus,
        parityStatus: settings.ethNodeStatus,
        cyberdStatus: settings.cyberNodeStatus,
    }),
    actions
)(Settings);

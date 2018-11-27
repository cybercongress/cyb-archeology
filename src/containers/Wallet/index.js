import React, { Component } from 'react';
import { connect } from 'react-redux';

import EthAccounts from './EthAccounts';
import ETHImport from './ETHImport';
import EthSend from './EthSend';

import CyberAccounts from './CyberAccounts';
import CyberImport from './CyberImport';
import CyberSend from './CyberSend';

import Titile from '../../components/Titile/Titile';
import { WalletContainer } from '../../components/Wallet/Wallet';

import WalletLauout, { WalletSidebar, WalletContent } from '../../components/Wallet/WalletLauout/WalletLauout';
import WalletTabs, { WalletTab } from '../../components/Wallet/WalletTabs/WalletTabs';

import Block, { BlockRow, RowItem } from '../../components/Settings/Block';
import {
    SettingLabel, SettingRow,
} from '../../components/Settings/Settings';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { setPassword } from '../../redux/wallet';
import { Message } from '@cybercongress/ui';

class Page extends Component {
    state = {
        tab: 'eth',
        menu: 'accounts',
    };

    select = (tab) => {
        this.setState({ tab });
    };

    selectMenu = (menu) => {
        this.setState({ menu });
    }

    setPassord = () => {
        const password = this.password.value;
        this.props.setPassword(password);
    }

    render() {
        const { password, incorrectPassword } = this.props;

        if (!password) {
            return (
                <WalletContainer>
                    <Titile>/Set passord</Titile>
                    <Block style={{ width: 400 }}>
                        {incorrectPassword && (
                            <BlockRow>
                                <Message type={'error'}>incorrect password</Message>
                            </BlockRow>
                        )}
                        <BlockRow>
                            <SettingRow>
                                <SettingLabel>password</SettingLabel>
                                <Input inputRef={ node => this.password = node }/>
                            </SettingRow>
                        </BlockRow>
                        <BlockRow>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <Button>create</Button>
                                <Button onClick={this.setPassord} color={'green'}>set passord</Button>
                            </div>
                        </BlockRow>
                    </Block>
                </WalletContainer>
            );
        }

        const { tab, menu } = this.state;

        let content;

        if (tab === 'eth' && menu === 'import') {
            content = (
                <ETHImport importCompleted={() => this.selectMenu('accounts')}/>
            );
        }

        if (tab === 'eth' && menu === 'accounts') {
            content = (
                <EthAccounts />
            );
        }

        if (tab === 'eth' && menu === 'send') {
            content = (
                <EthSend />
            );
        }

        if (tab === 'cyb' && menu === 'accounts') {
            content = (
                <CyberAccounts />
            );
        }

        if (tab === 'cyb' && menu === 'import') {
            content = (
                <CyberImport importCompleted={() => this.selectMenu('accounts')}/>
            );
        }

        if (tab === 'cyb' && menu === 'send') {
            content = (
                <CyberSend />
            );
        }

        return (
            <WalletContainer>
                <Titile>/Wallet</Titile>
                <WalletLauout>
                    <WalletSidebar>
                        <div>
                            <WalletTabs>
                                <WalletTab
                                  onClick={ () => this.select('eth') }
                                  isActive={ tab === 'eth' }
                                >
eth
                                </WalletTab>
                                <WalletTab
                                  onClick={ () => this.select('cyb') }
                                  isActive={ tab === 'cyb' }
                                >
cyb
                                </WalletTab>
                            </WalletTabs>
                        </div>
                        <div>

                            <WalletTabs vertical>
                                <WalletTab
                                  onClick={ () => this.selectMenu('accounts') }
                                  isActive={ menu === 'accounts' }
                                >
accounts
                                </WalletTab>
                                <WalletTab
                                  onClick={ () => this.selectMenu('import') }
                                  isActive={ menu === 'import' }
                                >
import account
                                </WalletTab>
                                <WalletTab
                                  onClick={ () => this.selectMenu('send') }
                                  isActive={ menu === 'send' }
                                >
send tokens
                                </WalletTab>
                            </WalletTabs>

                        </div>
                    </WalletSidebar>
                    <WalletContent>
                        {content}
                    </WalletContent>
                </WalletLauout>
            </WalletContainer>
        );
    }
}


export default connect(state => ({
    password: state.wallet.password,
    incorrectPassword: state.wallet.incorrectPassword
}), { setPassword })(Page);

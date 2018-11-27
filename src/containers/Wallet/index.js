import React, { Component } from 'react';

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

    render() {
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
            // content = (
            //     <EthSend />
            // );
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


export default Page;

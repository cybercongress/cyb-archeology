import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    PageTitle,
    MainContainer,
    WalletTabs,
    WalletTab,
    WalletLauout,
    WalletSidebar,
    WalletContent,
    ScrollContainer,
    Button,
} from '@cybercongress/ui';
import EthAccounts from './EthAccounts';
import ETHImport from './ETHImport';
import EthSend from './EthSend';

import CyberAccounts from './CyberAccounts';
import CyberImport from './CyberImport';
import CyberSend from './CyberSend';
import ChangePassword from '../Application/ChangePassword';

class Page extends Component {
    state = {
        tab: 'eth',
        menu: 'accounts',
        show: false,
    };

    select = (tab) => {
        this.setState({ tab });
    };

    selectMenu = (menu) => {
        this.setState({ menu });
    };

    showMnemonic = () => {
        this.setState({
            show: !this.state.show,
        });
    }

    render() {
        // const { password } = this.props;

        // if (!password) {
        //     return <RequirePassword />;
        // }

        const { tab, menu } = this.state;

        let content;

        if (tab === 'eth' && menu === 'import') {
            content = <ETHImport importCompleted={ () => this.selectMenu('accounts') } />;
        }

        if (tab === 'eth' && menu === 'accounts') {
            content = <EthAccounts />;
        }

        if (tab === 'eth' && menu === 'send') {
            content = <EthSend />;
        }

        if (tab === 'cyb' && menu === 'accounts') {
            content = <CyberAccounts />;
        }

        if (tab === 'cyb' && menu === 'import') {
            content = <CyberImport importCompleted={ () => this.selectMenu('accounts') } />;
        }

        if (tab === 'cyb' && menu === 'send') {
            content = <CyberSend />;
        }

        if (menu === 'changePassword') {
            content = <ChangePassword />;
        }

        return (
            <ScrollContainer>
                <MainContainer>
                    <PageTitle>Wallet</PageTitle>
                    <WalletLauout style={ { paddingTop: 45 } }>
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
                                    {/*<WalletTab
                                      onClick={ () => this.selectMenu('import') }
                                      isActive={ menu === 'import' }
                                    >
                                        import account
                                    </WalletTab>*/}
                                    {/*<WalletTab
                                      onClick={ () => this.selectMenu('send') }
                                      isActive={ menu === 'send' }
                                    >
                                        send tokens
                                    </WalletTab>*/}
                                    <WalletTab
                                      onClick={ () => this.selectMenu('changePassword') }
                                      isActive={ menu === 'changePassword' }
                                    >
                                        Change password
                                    </WalletTab>
                                </WalletTabs>
                            </div>
                        </WalletSidebar>
                        <WalletContent>
                            <div>{content}</div>
                            <div>
                                <Button color='blue' onClick={ this.showMnemonic }>
                                    EXPORT MNEMONIC
                                </Button>
                            </div>
                            {this.state.show && <div>
                                {this.props.mnemonic}
                            </div>}
                        </WalletContent>

                    </WalletLauout>
                </MainContainer>
            </ScrollContainer>
        );
    }
}

export default connect(state => ({
    password: state.wallet.password,
    mnemonic: state.wallet.mnemonic,
}))(Page);

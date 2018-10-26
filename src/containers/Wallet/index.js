import React, {Component} from "react";
import EthWallet from "./EthWallet"
import CyberWallet from "./CyberWallet"
import Titile from "../../components/Titile/Titile";
import {WalletContainer} from "../../components/Wallet/Wallet";


class Page extends Component {

    state = {
        tab: 'cyb'
    };

    select = (tab) => {
        this.setState({tab});
    };

    render() {
        const {tab} = this.state;
        return (
            <WalletContainer>
                <Titile>/Wallet</Titile>
                    <button onClick={() => this.select('eth')}>Ethereum</button>
                    <button onClick={() => this.select('cyb')}>Cyberd</button>
                    {tab === 'eth' && <EthWallet/>}
                    {tab === 'cyb' && <CyberWallet/>}
            </WalletContainer>
        );
    }
}


export default Page;

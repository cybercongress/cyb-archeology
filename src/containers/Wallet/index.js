import React, {Component} from "react";
import Container from "../../components/Container/Container";
import EthWallet from "./EthWallet"
import CyberWallet from "./CyberWallet"


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
            <div>
                <Container>
                    <button onClick={() => this.select('eth')}>Ethereum</button>
                    <button onClick={() => this.select('cyb')}>Cyberd</button>
                </Container>
                <Container>
                    {tab === 'eth' && <EthWallet/>}
                    {tab === 'cyb' && <CyberWallet/>}
                </Container>
            </div>
        );
    }
}


export default Page;

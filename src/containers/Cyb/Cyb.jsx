import React from 'react';
import { connect } from 'react-redux';
import {
    Section,
    MainContainer,
    ScrollContainer,
} from '@cybercongress/ui';
import {
    CardCyb,
    Container,
} from '../../components/Cyb/Cyb';

const Cyb = ({username, defaultEthAccount, ipfsStatus}) => (
    <ScrollContainer>
        <MainContainer>
            <Section marginTop={ 5 } title='Identity'>
                <Container>
                    <CardCyb title={username} hash={defaultEthAccount} />
                    <CardCyb title='Change password' disabled />
                    <CardCyb title='State management' />
                </Container>
            </Section>
            <Section marginTop={ 5 } title='State'>
                <Container>
                    <CardCyb
                      title='Export state'
                      hash={defaultEthAccount}
                    />
                    <CardCyb title='Import state' />
                    <CardCyb title='Reset state to defaults' />
                </Container>
            </Section>
            <Section marginTop={ 5 } title='State'>
                <Container>
                    <CardCyb title='Configure web3 provider' />
                    <CardCyb title='IPFS' ipfsStatus={ipfsStatus} />
                    <CardCyb title='Ethereum' />
                    <CardCyb title='Cyber' />
                </Container>
            </Section>
            <Section marginTop={ 5 } title='Activity'>
                <Container>
                    <CardCyb title='Timeline' />
                    <CardCyb title='Activity reflection' disabled />
                </Container>
            </Section>
            <Section marginTop={ 5 } title='Apps'>
                <Container>
                    <CardCyb title='Setup root apps' />
                    <CardCyb title='Pinned files' />
                </Container>
            </Section>
            <Section marginTop={ 5 } title='Resources'>
                <Container>
                    <CardCyb title='Device' disabled />
                    <CardCyb title='Storage' disabled />
                    <CardCyb title='Memory' disabled />
                    <CardCyb title='Processor' disabled />
                    <CardCyb title='Graphics' disabled />
                    <CardCyb title='Battery' disabled />
                </Container>
            </Section>
            <Section marginTop={ 5 } title='Wire'>
                <Container>
                    <CardCyb
                      title='WiFi'
                      hash={defaultEthAccount}
                      disabled
                    />
                    <CardCyb title='Ethernet' disabled />
                    <CardCyb title='Bluetooth' disabled />
                </Container>
            </Section>
            <Section marginTop={ 5 } title='Input'>
                <Container>
                    <CardCyb title='Location' disabled />
                    <CardCyb title='Time' disabled />
                    <CardCyb title='Camera' disabled />
                    <CardCyb title='Microphone' disabled />
                </Container>
            </Section>
            <Section marginTop={ 5 } title='Output'>
                <Container>
                    <CardCyb title='Display' disabled />
                    <CardCyb title='Display' disabled />
                </Container>
            </Section>
            <Section marginTop={ 5 } title='Resources'>
                <Container>
                    <CardCyb title='Help articles' />
                    <CardCyb title='Wiki' />
                    <CardCyb title='Blog' />
                    <CardCyb title='Github' />
                    <CardCyb title='Version' version='0.1.2' />
                    <CardCyb
                      title='Binary content address'
                      address='QmT26rKxQdkD6XruyN8J3LDkRxWy6ZAjeYabfQUe9GssGf.ipfs'
                    />
                    <CardCyb
                      title='Source content address'
                      address='QmT26rKxQdkD6XruyN8J3LDkRxWy6ZAjeYabfQUe9GssGf.ipfs'
                    />
                    <CardCyb
                      title='Release signature'
                      address='QmT26rKxQdkD6XruyN8J3LDkRxWy6ZAjeYabfQUe9GssGf.ipfs'
                      disabled
                    />
                </Container>
            </Section>
        </MainContainer>
    </ScrollContainer>
);

export default connect(
    state => ({
        defaultEthAccount: state.wallet.defaultAccount,
        username: state.settings.username,

        ipfsStatus: state.settings.ipfsStatus,
    }),
)(Cyb);

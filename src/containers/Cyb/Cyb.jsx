import React from 'react';
import {
    Section,
    MainContainer,
    ScrollContainer,
} from '@cybercongress/ui';
import {
    CardCyb,
    Container,
} from '../../components/Cyb/Cyb';

const cyberc0n = require('../../components/Cyb/img/cyberc0n.jpg');
const dragonereum = require('../../components/Cyb/img/dragonereum.png');
const cybercongressAi = require('../../components/Cyb/img/cybercongress.ai.png');
const cybercongress = require('../../components/Cyb/img/cybercongress.png');

const Cyb = () => (
    <ScrollContainer>
        <MainContainer>
            <Section title='Your most visited content:'>
                <Container>
                    <CardCyb title='Cyberc0n' img={ cyberc0n } />
                    <CardCyb title='Dragonereum' img={ dragonereum } />
                    <CardCyb title='Web3 blog' img={ cybercongressAi } />
                    <CardCyb title='Cybercongress' img={ cybercongress } />
                </Container>
            </Section>
            <Section title='Check out some related content:'>
                <Container>
                    <CardCyb title='Cyberc0n' img={ cyberc0n } />
                    <CardCyb title='Dragonereum' img={ dragonereum } />
                    <CardCyb title='Web3 blog' img={ cybercongressAi } />
                </Container>
            </Section>
        </MainContainer>
    </ScrollContainer>
);

export default Cyb;

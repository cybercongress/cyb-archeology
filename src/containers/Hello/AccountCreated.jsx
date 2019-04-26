import React from 'react';
import {
    HelloContainerLeftCol, HelloContainer, HelloContainerRightCol,
    HelloContainerRightColContent, TextIlineBlock, Text, HelloContainerRightColBtn,
    ButtonEverGreen, SlallImgText, HelloCardAccaunt, BntGroup,
} from '@cybercongress/ui';

const cybEye2 = require('./img/cybEye2.png');

const AccountCreated = () => (
    <HelloContainer>
        <HelloContainerLeftCol>
            <SlallImgText imgCyb={ cybEye2 }>
                <TextIlineBlock marginBottom={ 10 }>
                    This is your new body,
                    {' '}
                    <Text fontSize='16px' color='#fff'>
                        xhipster
                    </Text>
                    . In new web world it is a pair of Ethereum and Cyber cryptoaddresses. You need
                    them to operate with funds and interact with apps.
                </TextIlineBlock>
                <TextIlineBlock marginBottom={ 10 }>
                    Your body is weak now - balances are empty. But you can deposit funds on them
                    anytime.
                </TextIlineBlock>
                <TextIlineBlock>
                    So, enough for it - take the keys of your identity and become master of your
                    life.
                </TextIlineBlock>
            </SlallImgText>
        </HelloContainerLeftCol>
        <HelloContainerRightCol bntGroup={ <BntGroup /> }>
            <HelloContainerRightColContent>
                <HelloCardAccaunt />
            </HelloContainerRightColContent>
            <HelloContainerRightColBtn center>
                <ButtonEverGreen>Back up mnemonic</ButtonEverGreen>
            </HelloContainerRightColBtn>
        </HelloContainerRightCol>
    </HelloContainer>
);

export default AccountCreated;

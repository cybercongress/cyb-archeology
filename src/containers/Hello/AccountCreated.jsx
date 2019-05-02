import React from 'react';
import {
    HelloContainerLeftCol, HelloContainer, HelloContainerRightCol,
    HelloContainerRightColContent, TextIlineBlock, TextEv as Text, HelloContainerRightColBtn,
    ButtonEverGreen, SlallImgText, BntGroup,
} from '@cybercongress/ui';
import connect from 'react-redux/es/connect/connect';
import AccountCard from './AccountCard';

const cybEye2 = require('./img/cybEye2.png');

class AccountCreated extends React.Component {
    render() {
        const {
            onNext, eth, cyber, username,
        } = this.props;

        return (
            <HelloContainer>
                <HelloContainerLeftCol>
                    <SlallImgText imgCyb={ cybEye2 }>
                        <TextIlineBlock marginBottom={ 10 }>
                            This is your new body,
                            <Text fontSize='16px' color='#fff'>
                                { username }
                            </Text>
                            . In new web world it is a pair of Ethereum and Cyber cryptoaddresses.
                            You need them to operate with funds and interact with apps.
                        </TextIlineBlock>
                        <TextIlineBlock marginBottom={ 10 }>
                            Your body is weak now - balances are empty. But you can deposit funds on
                            them anytime.
                        </TextIlineBlock>
                        <TextIlineBlock>
                            So, enough for it - take the keys of your identity and become master of
                            your life.
                        </TextIlineBlock>
                    </SlallImgText>
                </HelloContainerLeftCol>
                <HelloContainerRightCol bntGroup={ <BntGroup /> }>
                    <HelloContainerRightColContent>
                        <AccountCard
                            username={ username }
                            eth={ eth }
                            cyber={ cyber }
                        />
                    </HelloContainerRightColContent>
                    <HelloContainerRightColBtn center>
                        <ButtonEverGreen
                            onClick={ onNext }
                        >
                            Back up mnemonic
                        </ButtonEverGreen>
                    </HelloContainerRightColBtn>
                </HelloContainerRightCol>
            </HelloContainer>
        );
    }
}

export default connect(state => ({
    username: state.settings.username,
}), {})(AccountCreated);

import React from 'react';
import {
    HelloContainerLeftCol, HelloContainer, HelloContainerRightCol,
    HelloContainerRightColContent, TextIlineBlock, HelloContainerRightColBtn,
    ButtonEverGreen, SlallImgText, BntGroup,
} from '@cybercongress/ui';
import connect from 'react-redux/es/connect/connect';
import AccountCard from './AccountCard';

const cybEye = require('./img/eye.jpg');

class AccountImported extends React.Component {
    render() {
        const {
            onNext, onBack, eth, cyber, username,
        } = this.props;

        return (
            <HelloContainer>
                <HelloContainerLeftCol>
                    <SlallImgText imgCyb={ cybEye }>
                        <TextIlineBlock marginBottom={ 10 }>Check your identity.</TextIlineBlock>
                        <TextIlineBlock>
                            If it’s not your what you expected to see, you can go back and import another.
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
                    <HelloContainerRightColBtn paddingX='10%'>
                        <ButtonEverGreen
                            custonClass='btn-white'
                            onClick={ onBack }
                        >
                            Back
                        </ButtonEverGreen>
                        <ButtonEverGreen
                            onClick={ onNext }
                        >
                            Encrypt
                        </ButtonEverGreen>
                    </HelloContainerRightColBtn>
                </HelloContainerRightCol>
            </HelloContainer>
        );
    }
}

export default connect(state => ({
    username: state.settings.username,
}), {})(AccountImported);

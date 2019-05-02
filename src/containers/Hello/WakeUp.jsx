import React from 'react';
import {
    HelloContainer, HelloContainerLeftCol, BigImg, HelloContainerRightCol,
    HelloContainerRightColContent, Pane, TextIlineBlock, HelloContainerRightColBtn,
    ButtonEverGreen, TextEv as Text, BntGroup,
} from '@cybercongress/ui';
import connect from 'react-redux/es/connect/connect';

const cybEye = require('./img/eye.jpg');

class WakeUp extends React.Component {
    render() {
        const { onNext, username } = this.props;

        return (
            <HelloContainer>
                <HelloContainerLeftCol>
                    <BigImg srcBigImg={ cybEye } />
                </HelloContainerLeftCol>
                <HelloContainerRightCol bntGroup={ <BntGroup /> }>
                    <HelloContainerRightColContent>
                        <Pane>
                            <TextIlineBlock marginBottom={ 20 }>
                                Welcome to the new world,&nbsp;
                                <Text fontSize='18px' color='#fff'>
                                    {username}
                                </Text>
                                .
                            </TextIlineBlock>
                            <TextIlineBlock marginBottom={ 20 }>
                                I'm trying to free your mind,&nbsp;
                                <Text fontSize='18px' color='#fff'>
                                    {username}
                                </Text>
                                , but I can only show you the door, you're the one that has to walk
                                through it.
                            </TextIlineBlock>
                            <TextIlineBlock marginBottom={ 20 }>
                                I used the game approach to train you faster and the icons below
                                will reflect your progress.
                            </TextIlineBlock>
                            <TextIlineBlock>Let’s make our first training!</TextIlineBlock>
                        </Pane>
                    </HelloContainerRightColContent>
                    <HelloContainerRightColBtn center>
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
}), {})(WakeUp);

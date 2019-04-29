import React from 'react';
import {
    HelloContainer, HelloContainerLeftCol, BigImg, HelloContainerRightCol,
    HelloContainerRightColContent, Pane, TextIlineBlock, HelloContainerRightColBtn,
    ButtonEverGreen, BntGroup,
} from '@cybercongress/ui';

const cybEye = require('./img/eye.jpg');

const ShowMyIdentity = ({ onNext }) => (
    <HelloContainer>
        <HelloContainerLeftCol>
            <BigImg srcBigImg={ cybEye } />
        </HelloContainerLeftCol>
        <HelloContainerRightCol bntGroup={ <BntGroup /> }>
            <HelloContainerRightColContent>
                <Pane>
                    <TextIlineBlock marginBottom={ 20 }>
                        I generated secure, random identity for you. Now there are no forces that
                        can control your character and values. You're in control of it. Nobody, even
                        me can not know it after encryption.
                    </TextIlineBlock>
                    <TextIlineBlock>
                        So, don’t be afraid, make your first step - take a look!
                    </TextIlineBlock>
                </Pane>
            </HelloContainerRightColContent>
            <HelloContainerRightColBtn center>
                <ButtonEverGreen
                    onClick={ onNext }
                >
                    Show my identity
                </ButtonEverGreen>
            </HelloContainerRightColBtn>
        </HelloContainerRightCol>
    </HelloContainer>
);

export default ShowMyIdentity;

import React from 'react';
import {
    HelloContainer, HelloContainerLeftCol, BigImg, HelloContainerRightCol,
    HelloContainerRightColContent, Pane, TextIlineBlock, HelloContainerRightColBtn,
    ButtonEverGreen,
} from '@cybercongress/ui';

const ShowMeTheMatrix = () => (
    <HelloContainer>
        <HelloContainerLeftCol>
            <BigImg />
        </HelloContainerLeftCol>
        <HelloContainerRightCol>
            <HelloContainerRightColContent>
                <Pane>
                    <TextIlineBlock marginBottom={ 20 }>
                        That you are a slave, xhipster.
                        {' '}
                    </TextIlineBlock>
                    <TextIlineBlock marginBottom={ 20 }>
                        Like everyone else, you were born into bondage, born into a prison that you
                        cannot smell, taste, or touch.
                    </TextIlineBlock>
                    <TextIlineBlock>
                        A prison for your mind without an ability to control your identity, your
                        values, your data.
                    </TextIlineBlock>
                </Pane>
            </HelloContainerRightColContent>
            <HelloContainerRightColBtn center>
                <ButtonEverGreen>Show me the Matrix</ButtonEverGreen>
            </HelloContainerRightColBtn>
        </HelloContainerRightCol>
    </HelloContainer>
);

export default ShowMeTheMatrix;

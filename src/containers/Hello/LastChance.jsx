import React from 'react';
import {
    HelloContainerLeftCol, HelloContainer, BigImg, HelloContainerRightCol,
    HelloContainerRightColContent, Pane, TextIlineBlock, HelloContainerRightColBtn,
    ButtonEverGreen,
} from '@cybercongress/ui';

const LastChance = () => (
    <HelloContainer>
        <HelloContainerLeftCol>
            <BigImg srcBigImg={ CybMatrix } />
        </HelloContainerLeftCol>
        <HelloContainerRightCol>
            <HelloContainerRightColContent>
                <Pane>
                    <TextIlineBlock marginBottom={ 20 }>
                        Unfortunately, no one can be told what the Matrix is. You have to see it for
                        yourself. This is your last chance.
                    </TextIlineBlock>
                    <TextIlineBlock marginBottom={ 20 }>
                        You take the blue pill - the story ends, you wake up in web2 and you believe
                        whatever you want to.
                    </TextIlineBlock>
                    <TextIlineBlock marginBottom={ 20 }>
                        You take the red pill - you stay in Wonderland and I show you how deep the
                        rabbit hole goes. What I'm offering is the truth, nothing more.
                    </TextIlineBlock>
                    <TextIlineBlock>
                        Remember, once you enter new web world there will be no way back…
                    </TextIlineBlock>
                </Pane>
            </HelloContainerRightColContent>
            <HelloContainerRightColBtn>
                <ButtonEverGreen custonClass='btn-blue'>Stay asleep</ButtonEverGreen>
                <ButtonEverGreen custonClass='btn-red'>Wake up</ButtonEverGreen>
            </HelloContainerRightColBtn>
        </HelloContainerRightCol>
    </HelloContainer>
);

export default LastChance;

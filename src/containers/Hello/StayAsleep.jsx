import React from 'react';
import {
    HelloContainer, HelloContainerLeftCol, BigImg, HelloContainerRightCol,
    HelloContainerRightColContent, TextIlineBlock,
} from '@cybercongress/ui';

const StayAsleep = () => (
    <HelloContainer>
        <HelloContainerLeftCol>
            <BigImg />
        </HelloContainerLeftCol>
        <HelloContainerRightCol>
            <HelloContainerRightColContent>
                <TextIlineBlock>You already did your choise. I have nothing to you.</TextIlineBlock>
            </HelloContainerRightColContent>
        </HelloContainerRightCol>
    </HelloContainer>
);

export default StayAsleep;

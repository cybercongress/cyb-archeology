import React from 'react';
import {
    HelloContainer, HelloContainerLeftCol, BigImg, HelloContainerRightCol,
    HelloContainerRightColContent, TextIlineBlock,
} from '@cybercongress/ui';

const CybMatrix = require('./img/cyb_animation.gif');

const StayAsleep = () => (
    <HelloContainer>
        <HelloContainerLeftCol>
            <BigImg srcBigImg={ CybMatrix } />
        </HelloContainerLeftCol>
        <HelloContainerRightCol>
            <HelloContainerRightColContent>
                <TextIlineBlock>You already did your choise. I have nothing to you.</TextIlineBlock>
            </HelloContainerRightColContent>
        </HelloContainerRightCol>
    </HelloContainer>
);

export default StayAsleep;

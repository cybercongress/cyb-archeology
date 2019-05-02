import React from 'react';
import {
    HelloContainerLeftCol, HelloContainer, HelloContainerRightCol,
    HelloContainerRightColContent, TextIlineBlock, HelloContainerRightColBtn,
    ButtonEverGreen, BigImg, BntGroup,
} from '@cybercongress/ui';

const CybMatrix = require('../Hello/img/cyb_animation.gif');

const Congratulation = ({ onNext }) => (
    <HelloContainer>
        <HelloContainerLeftCol>
            <BigImg srcBigImg={ CybMatrix } />
        </HelloContainerLeftCol>
        <HelloContainerRightCol bntGroup={ <BntGroup /> }>
            <HelloContainerRightColContent>
                <TextIlineBlock>
                    Well, now you are ready to enjoy your web3 experience!
                </TextIlineBlock>
            </HelloContainerRightColContent>
            <HelloContainerRightColBtn center>
                <ButtonEverGreen
                    onClick={ onNext }
                >
                    Get off the matrix
                </ButtonEverGreen>
            </HelloContainerRightColBtn>
        </HelloContainerRightCol>
    </HelloContainer>
);

export default Congratulation;

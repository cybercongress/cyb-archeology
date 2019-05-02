import React from 'react';
import {
    HelloContainerLeftCol, HelloContainer, BigImg, HelloContainerRightCol,
    HelloContainerRightColContent, Pane, TextIlineBlock, TextEv as Text, HelloContainerRightColBtn,
    ButtonEverGreen,
} from '@cybercongress/ui';
import connect from 'react-redux/es/connect/connect';

const CybMatrix = require('./img/cyb_animation.gif');

class ImportOrCreate extends React.Component {
    render() {
        return (
            <HelloContainer>
                <HelloContainerLeftCol>
                    <BigImg srcBigImg={ CybMatrix } />
                </HelloContainerLeftCol>
                <HelloContainerRightCol>
                    <HelloContainerRightColContent>
                        <Pane>
                            <TextIlineBlock marginBottom={ 20 }>
                                <Text color='#fff' fontSize='18px' display='inline'>
                                    {this.props.username}
                                </Text>
                                , The Matrix is everywhere. It is all around us.
                            </TextIlineBlock>
                            <TextIlineBlock marginBottom={ 20 }>
                                Even now, in this room. You can see it when you look into your Chrome
                                window, or when you turn on your Youtube.
                            </TextIlineBlock>
                            <TextIlineBlock marginBottom={ 20 }>
                                You can feel it when you Google something, when you go to Facebook, when you
                                pay with Paypal. It is the world that has been put over your eyes to blind
                                you from the truth.
                            </TextIlineBlock>
                            <TextIlineBlock>
                                I assume that you are enlightened and already know the private keys from
                                your Kingdom though. Otherwise you should identify the truth
                            </TextIlineBlock>
                        </Pane>
                    </HelloContainerRightColContent>
                    <HelloContainerRightColBtn>
                        <ButtonEverGreen
                            custonClass='btn-white'
                            onClick={ this.props.onImport }
                        >
                            I know the keys
                        </ButtonEverGreen>
                        <ButtonEverGreen
                            onClick={ this.props.onWhatTruth }
                        >
                            What truth?
                        </ButtonEverGreen>
                    </HelloContainerRightColBtn>
                </HelloContainerRightCol>
            </HelloContainer>
        );
    }
}

export default connect(state => ({
    username: state.settings.username,
}), {})(ImportOrCreate);

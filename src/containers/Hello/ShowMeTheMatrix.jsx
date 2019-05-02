import React from 'react';
import {
    HelloContainer, HelloContainerLeftCol, BigImg, HelloContainerRightCol,
    HelloContainerRightColContent, Pane, TextIlineBlock, HelloContainerRightColBtn,
    ButtonEverGreen, TextEv as Text,
} from '@cybercongress/ui';
import connect from 'react-redux/es/connect/connect';

const CybMatrix = require('./img/cyb_animation.gif');

class ShowMeTheMatrix extends React.Component {
    render() {
        const { username, onNext } = this.props;

        return (
            <HelloContainer>
                <HelloContainerLeftCol>
                    <BigImg srcBigImg={ CybMatrix } />
                </HelloContainerLeftCol>
                <HelloContainerRightCol>
                    <HelloContainerRightColContent>
                        <Pane>
                            <TextIlineBlock marginBottom={ 20 }>
                                That you are a slave,&nbsp;
                                <Text color='#FFF' fontSize='16px'>
                                    { username }
                                </Text>
                                .
                            </TextIlineBlock>
                            <TextIlineBlock marginBottom={ 20 }>
                                Like everyone else, you were born into bondage, born into a prison
                                that you cannot smell, taste, or touch.
                            </TextIlineBlock>
                            <TextIlineBlock>
                                A prison for your mind without an ability to control your identity,
                                your values, your data.
                            </TextIlineBlock>
                        </Pane>
                    </HelloContainerRightColContent>
                    <HelloContainerRightColBtn center>
                        <ButtonEverGreen
                            onClick={ onNext }
                        >
                            Show me the Matrix
                        </ButtonEverGreen>
                    </HelloContainerRightColBtn>
                </HelloContainerRightCol>
            </HelloContainer>
        );
    }
}
export default connect(state => ({
    username: state.settings.username,
}), {})(ShowMeTheMatrix);

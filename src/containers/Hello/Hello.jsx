import React from 'react';
import {
    HelloContainer, HelloContainerLeftCol, BigImg, HelloContainerRightCol,
    HelloContainerRightColContent, Card, Pane, TextIlineBlock,
    HelloContainerRightColBtn, ButtonEverGreen, TextInput, Icon, TextEv as Text,
} from '@cybercongress/ui';
import connect from 'react-redux/es/connect/connect';
import { setUsername } from '../../redux/settings';

const CybMatrix = require('./img/cyb_animation.gif');

class Hello extends React.Component {
    state = {
        username: '',
        emptyUsername: false,
    };

    onUsernameChange = (event) => {
        this.setState({
            username: event.target.value,
            emptyUsername: event.target.value === '',
        });
    };

    goNext = () => {
        const { username } = this.state;

        if (!(username === '')) {
            this.props.setUsername(username);

            this.props.onNext();
        } else {
            this.setState({
                emptyUsername: true,
            });
        }
    };

    render() {
        const { username, emptyUsername } = this.state;

        return (
            <HelloContainer>
                <HelloContainerLeftCol>
                    <BigImg srcBigImg={ CybMatrix } />
                </HelloContainerLeftCol>
                <HelloContainerRightCol>
                    <HelloContainerRightColContent>
                        <Card
                            display='flex'
                            flexDirection='column'
                            alignItems='center'
                            boxShadow='0 0 1px #fff'
                            width='100%'
                            paddingX='4vh'
                            paddingY='4.5vh'
                            maxWidth={ 500 }
                            maxHeight={ 500 }
                            height='100%'
                        >
                            <Pane
                                width='100%'
                                display='flex'
                                flexDirection='column'
                                alignItems='flex-center'
                            >
                                <TextIlineBlock
                                    style={ { wordSpacing: '2px', lineHeight: 2 } }
                                    marginBottom={ 5 }
                                >
                                    Hi, I’m cyb - your friendly robot, and I want to show you the new
                                    Internet.
                                </TextIlineBlock>
                                <TextIlineBlock style={ { wordSpacing: '2px' } }>
                                    How do I call you?
                                </TextIlineBlock>
                            </Pane>
                            <Pane
                                width='75%'
                                display='flex'
                                flexDirection='column'
                                justifyContent='center'
                                height='100%'
                                marginBottom='6%'
                            >
                                <Pane width='100%' marginBottom='6%'>
                                    <Pane position='relative'>
                                        <TextInput
                                            width='100%'
                                            backgroundColor='transparent'
                                            color='#fff'
                                            height='6vh'
                                            maxHeight={ 42 }
                                            paddingX={ 10 }
                                            value={ username }
                                            onChange={ e => this.onUsernameChange(e) }
                                            isInvalid={ emptyUsername }
                                        />
                                        {emptyUsername && (
                                            <Pane
                                                position='absolute'
                                                left={ 0 }
                                                bottom='-50%'
                                                width='100%'
                                                display='flex'
                                                alignItems='center'
                                            >
                                                <Icon icon='info-sign' color='danger' size={ 11 } marginRight={ 5 } />
                                                <Pane>
                                                    <Text fontSize='11px' color='#ec4c47'>
                                                        Empty username
                                                    </Text>
                                                </Pane>
                                            </Pane>
                                        )}
                                    </Pane>
                                </Pane>
                            </Pane>
                        </Card>
                    </HelloContainerRightColContent>
                    <HelloContainerRightColBtn center>
                        <ButtonEverGreen
                            onClick={ this.goNext }
                        >
                            Let's go
                        </ButtonEverGreen>
                    </HelloContainerRightColBtn>
                </HelloContainerRightCol>
            </HelloContainer>
        );
    }
}

export default connect(state => ({
    username: state.settings.username,
}), {
    setUsername,
})(Hello);

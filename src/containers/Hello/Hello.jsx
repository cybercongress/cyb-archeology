import React from 'react';
import {
    HelloContainer, HelloContainerLeftCol, BigImg, HelloContainerRightCol,
    HelloContainerRightColContent, Card, Pane, TextIlineBlock,
    HelloContainerRightColBtn, ButtonEverGreen, TextInput,
} from '@cybercongress/ui';
import connect from 'react-redux/es/connect/connect';
import { setUsername } from '../../redux/settings';

class Hello extends React.Component {
    state = {
        username: '',
    };

    onUsernameChange = (event) => {
        this.setState({
            username: event.target.value,
        });
    };

    goNext = () => {
        this.props.setUsername(this.state.username);

        this.props.onNext();
    };

    render() {
        const { username } = this.state;

        return (
            <HelloContainer>
                <HelloContainerLeftCol>
                    <BigImg />
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
                                        />
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

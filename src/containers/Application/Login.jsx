import React from 'react';
import {
    HelloContainer, HelloContainerLeftCol, BigImg, ButtonEverGreen,
    HelloContainerRightCol, HelloContainerRightColContent, Card,
    HelloContainerRightColBtn, Pane, TextIlineBlock, TextInput,
    TextEv as Text, Icon,
} from '@cybercongress/ui';
import connect from 'react-redux/es/connect/connect';

const CybMatrix = require('../Hello/img/cyb_animation.gif');

class Login extends React.Component {
    state = {
        password: '',
    };

    onLogin = () => {
        this.props.onLogin(this.state.password);
    };

    onPasswordChange = (event) => {
        this.setState({
            password: event.target.value,
        });
    };

    render() {
        const { password } = this.state;
        const { username, error } = this.props;

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
                            maxWidth='80%'
                            paddingX='3vh'
                            paddingY='3vh'
                            minWidth={ 500 }
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
                                    style={ { wordSpacing: '1px', lineHeight: 1.5 } }
                                    marginBottom={ 5 }
                                >
                                    Welcome back,&nbsp;
                                    <Text color='#FFF' fontSize='16px'>
                                        {username}
                                    </Text>.
                                </TextIlineBlock>
                                <TextIlineBlock style={ { wordSpacing: '1px' } }>
                                    Please, unlock your state.
                                </TextIlineBlock>
                            </Pane>
                            <Pane
                                width='80%'
                                display='flex'
                                flexDirection='column'
                                justifyContent='center'
                                height='100%'
                                marginBottom='6%'
                            >
                                <Pane width='100%' marginBottom='6%'>
                                    <Pane position='relative'>
                                        <TextInput
                                            type='password'
                                            width='100%'
                                            backgroundColor='transparent'
                                            color='#fff'
                                            height='6vh'
                                            maxHeight={ 42 }
                                            isInvalid={ !!error }
                                            paddingX={ 10 }
                                            onChange={ e => this.onPasswordChange(e) }
                                            value={ password }
                                        />
                                        {error && (
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
                                                        {error}
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
                            onClick={this.onLogin}
                        >
                            Unlock
                        </ButtonEverGreen>
                    </HelloContainerRightColBtn>
                </HelloContainerRightCol>
            </HelloContainer>
        );
    }
}

export default connect(state => ({
    username: state.settings.username,
}), null)(Login);

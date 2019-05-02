import React from 'react';
import {
    HelloContainerLeftCol, HelloContainer, HelloContainerRightCol,
    HelloContainerRightColContent, TextIlineBlock, HelloContainerRightColBtn,
    ButtonEverGreen, SlallImgText, BntGroup, Pane, Icon, TextEv as Text, TextInput, Card,
} from '@cybercongress/ui';
import connect from 'react-redux/es/connect/connect';

const cybRed = require('./img/cyb-red.png');

class CreatePassword extends React.Component {
    state = {
        password: '',
        confirmPassword: '',
        emptyPassword: false,
        passwordDontMatch: false,
    };

    onPasswordChange = (event) => {
        this.setState({
            password: event.target.value,
            emptyPassword: false,
            passwordDontMatch: false,
        });
    };

    onPasswordConfirmationChange = (event) => {
        this.setState({
            confirmPassword: event.target.value,
            emptyPassword: false,
            passwordDontMatch: false,
        });
    };

    onNext = () => {
        const { password, confirmPassword } = this.state;

        let emptyPassword = false;
        let passwordDontMatch = false;

        if (password === '') {
            emptyPassword = true;
        }

        if (password !== confirmPassword) {
            passwordDontMatch = true;
        }

        if (emptyPassword || passwordDontMatch) {
            this.setState({
                emptyPassword,
                passwordDontMatch,
            });
        } else {
            this.props.onNext(password);
        }
    };

    render() {
        const {
            password, confirmPassword, emptyPassword, passwordDontMatch,
        } = this.state;
        const { username } = this.props;

        return (
            <HelloContainer>
                <HelloContainerLeftCol>
                    <SlallImgText imgCyb={ cybRed }>
                        <TextIlineBlock marginBottom={ 10 }>
                            Okay. What do you need now,&nbsp;
                            <Text fontSize='16px' lineHeight={ 1.88 } color='#fff'>
                                {username}
                            </Text>
                            ? More security! I’ll encrypt your mnemonic phrase, but you need to create a
                            password.
                        </TextIlineBlock>
                        <TextIlineBlock>
                            Remember, there is no way to restore it, so keep it also safe.
                        </TextIlineBlock>
                    </SlallImgText>
                </HelloContainerLeftCol>
                <HelloContainerRightCol bntGroup={ <BntGroup /> }>
                    <HelloContainerRightColContent>
                        <Card
                            display='flex'
                            flexDirection='column'
                            alignItems='center'
                            boxShadow='0 0 1px #fff'
                            maxWidth='80%'
                            paddingX='8vh'
                            paddingY='8vh'
                            minWidth={ 500 }
                            maxHeight={ 500 }
                            height='100%'
                        >
                            <Pane width='100%' flexGrow={ 1 } marginBottom='6%'>
                                <Pane width='100%' marginBottom='6%'>
                                    <Text
                                        marginBottom='3%'
                                        display='inline-block'
                                        fontSize='1.12rem'
                                        color='#fff'
                                    >
                                        Password
                                    </Text>
                                    <Pane position='relative'>
                                        <TextInput
                                            type='password'
                                            width='100%'
                                            backgroundColor='transparent'
                                            color='#fff'
                                            height='6vh'
                                            maxHeight={ 42 }
                                            paddingX={ 10 }
                                            value={ password }
                                            onChange={ e => this.onPasswordChange(e) }
                                        />
                                    </Pane>
                                </Pane>
                                <Pane width='100%'>
                                    <Text
                                        marginBottom='3%'
                                        display='inline-block'
                                        fontSize='1.12rem'
                                        color='#fff'
                                    >
                                        Confirm password
                                    </Text>
                                    <Pane position='relative'>
                                        <TextInput
                                            type='password'
                                            width='100%'
                                            backgroundColor='transparent'
                                            color='#fff'
                                            height='6vh'
                                            maxHeight={ 42 }
                                            isInvalid={ passwordDontMatch }
                                            paddingX={ 10 }
                                            value={ confirmPassword }
                                            onChange={ e => this.onPasswordConfirmationChange(e) }
                                        />
                                        {(passwordDontMatch || emptyPassword) && (
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
                                                        {passwordDontMatch ? 'Passwords don\'t match' : 'Empty password'}
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
                            onClick={ e => this.onNext(e) }
                        >
                            Encrypt mnemonic
                        </ButtonEverGreen>
                    </HelloContainerRightColBtn>
                </HelloContainerRightCol>
            </HelloContainer>
        );
    }
}

export default connect(state => ({
    username: state.settings.username,
}), {})(CreatePassword);

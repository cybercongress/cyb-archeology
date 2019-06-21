import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    HelloContainer,
    HelloContainerLeftCol,
    HelloContainerRightCol,
    HelloContainerRightColContent,
    HelloContainerRightColBtn,
    BigImg,
    ButtonEverGreen,
    Button,
    TextInputError,
    Pane,
    TextEv as Text,
    Card,
} from '@cybercongress/ui';
import { changePassword } from '../../redux/wallet';
// import * as actions from '../../redux/settings';

const idrobot = require('../Hello/img/idrobot.png');

class ShieldCyb extends Component {
    state = {
        password: '',
        currentPassword: '',
        confirmPassword: '',
        newPassword: '',
        emptyPassword: false,
        passwordDontMatch: false,
        notification: null,
    };

    setNotification = (message) => {
        this.setState({
            notification: {
                message,
            },
        });
    };

    onPasswordChange = (event) => {
        this.setState({
            currentPassword: event.target.value,
            emptyPassword: false,
            passwordDontMatch: false,
        });
    };

    onPasswordNewPassword = (event) => {
        this.setState({
            newPassword: event.target.value,
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

    savePass = () => {
        const { password } = this.props;
        const { currentPassword, confirmPassword, newPassword } = this.state;
        console.log(currentPassword, confirmPassword, newPassword);

        if (password !== currentPassword) {
            this.setNotification('Incorrect current password');
            return;
        }

        if (newPassword !== confirmPassword) {
            this.setNotification('New passwords do not match');
            return;
        }

        this.props.changePassword(newPassword);
        this.setNotification('Password successfully changed');
    }

    render() {
        const { password } = this.props;
        const { notification } = this.state;
      console.log(password);
      console.log(notification);
      
        return (
            <div>
            <HelloContainer
              customClassContainer='connectionContainer'
              customClassGrig='connectionContainerGrid'
            >
                <HelloContainerLeftCol customClass='connectionContainer-left-col'>
                    <BigImg srcBigImg={ idrobot } />
                </HelloContainerLeftCol>
                <HelloContainerRightCol>
                    <HelloContainerRightColContent>
                    <Card
                      display='flex'
                      flexDirection='column'
                      alignItems='center'
                      boxShadow='0 0 1px #fff'
                      maxWidth={ 500 }
                      paddingX='8vh'
                      paddingY='8vh'
                      minWidth='80%'
                      maxHeight={ 500 }
                      height='80%'
                    >
                        <Pane width='100%' marginBottom='6%'>
                            <Pane width='100%' marginBottom='6%'>
                                <Text
                                  marginBottom='3%'
                                  display='inline-block'
                                  fontSize='1.12rem'
                                  color='#fff'
                                >
                                    Current password
                                </Text>
                                <TextInputError onChange={ e => this.onPasswordChange(e) } />
                            </Pane>
                            <Pane width='100%'>
                                <Text
                                  marginBottom='3%'
                                  display='inline-block'
                                  fontSize='1.12rem'
                                  color='#fff'
                                >
                                    New password
                                </Text>
                                <TextInputError onChange={ e => this.onPasswordNewPassword(e) } />
                            </Pane>
                        </Pane>
                        <Pane width='100%'>
                            <Text
                              marginBottom='3%'
                              display='inline-block'
                              fontSize='1.12rem'
                              color='#fff'
                            >
                                Confirm new password
                            </Text>
                            <TextInputError onChange={ e => this.onPasswordConfirmationChange(e) } />
                        </Pane>
                    </Card>
                    </HelloContainerRightColContent>
                </HelloContainerRightCol>
            </HelloContainer>
            <Pane
          display='flex'
          alignItems='center'
          justifyContent='center'
          width='100%'
          position='absolute'
          bottom={ 0 }
          paddingY={ 20 }
          backgroundColor='#000000'
          zIndex={ 2 }
        >
            <Pane
              flexGrow={ 1 }
              maxWidth={ 1000 }
              display='flex'
              alignItems='center'
              justifyContent='center'
              flexDirection='row'
              paddingX='3vw'
            >
                <Button paddingX={ 30 } fontSize='16px' className='btn' onClick={ e => this.savePass(e) }>
                    Save Password
                </Button>
            </Pane>
        </Pane>
            </div>
        );
    }
}

export default connect(state => ({
    password: state.wallet.password,
}), { changePassword })(ShieldCyb);

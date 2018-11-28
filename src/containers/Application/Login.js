import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import { Message } from '@cybercongress/ui';
import Block, { BlockRow } from '../../components/Settings/Block';
import { SettingLabel, SettingRow } from '../../components/Settings/Settings';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { createPassword, login, isLoginExist } from '../../redux/wallet';
import Titile from '../../components/Titile/Titile';
import LoginContainer from '../../components/LoginContainer/LoginContainer';

class Login extends Component {

    login = () => {
        const password = this.password.value;

        this.props.setPassword(password);
    };

    createPassword = () => {
        const password1 = this.password1.value;
        const password2 = this.password2.value;

        if (password1 === password2) {
            this.props.createPassword(password1);
        }
    };

    render() {
        const { incorrectPassword } = this.props;
        const isUserExist = isLoginExist();
        const label = isUserExist ? 'Login' : 'Create account';

        return (
            <LoginContainer>
                <div>
                    <Titile inline>/ {label}</Titile>
                    <Block style={ { width: 400 } }>
                        {!isUserExist ? (
                            <div>
                                <BlockRow key='create1'>
                                    <SettingRow>
                                        <SettingLabel>password</SettingLabel>
                                        <Input type='password' inputRef={ node => this.password1 = node } />
                                    </SettingRow>
                                </BlockRow>
                                <BlockRow key='create2'>
                                    <SettingRow>
                                        <SettingLabel>confirm password</SettingLabel>
                                        <Input type='password' inputRef={ node => this.password2 = node } />
                                    </SettingRow>
                                </BlockRow>
                                <BlockRow>
                                    <div style={ {
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    } }
                                    >
                                        <Button onClick={ this.createPassword } color='green'>Create</Button>
                                    </div>
                                </BlockRow>
                            </div>
                        ) : (
                            <div>
                                {incorrectPassword && (
                                    <BlockRow>
                                        <Message type='error'>incorrect password</Message>
                                    </BlockRow>
                                )}
                                <BlockRow>
                                    <SettingLabel style={{ width: 90 }}>password</SettingLabel>
                                    <Input style={{ width: 150 }} type='password' inputRef={ node => this.password = node } />
                                    <Button style={{ marginLeft: 25 }} onClick={ this.login } color='green'>Login</Button>
                                </BlockRow>
                            </div>
                        )}
                    </Block>
                </div>
            </LoginContainer>
        );
    }
}

export default connect(state => ({
    password: state.wallet.password,
    incorrectPassword: state.wallet.incorrectPassword,
}), { setPassword: login, createPassword, isLoginExist })(Login);

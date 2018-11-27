import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import { Message } from '@cybercongress/ui';
import Block, { BlockRow } from '../../components/Settings/Block';
import { SettingLabel, SettingRow } from '../../components/Settings/Settings';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { createPassword, login } from '../../redux/wallet';

class RequirePassword extends Component {

    state = {
        createPassword: false,
    };

    login = () => {
        const password = this.password.value;

        this.props.setPassword(password);
    };

    setPassord = () => {
        this.setState({ createPassword: true });
    };

    cancel = () => {
        this.setState({ createPassword: false });
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
        const { createPassword } = this.state;

        return (
            <Block style={ { width: 400 } }>
                {createPassword ? (
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
                                <Button onClick={ this.cancel }>cancel</Button>
                                <Button onClick={ this.createPassword } color='green'>create</Button>
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
                            <SettingRow key='login'>
                                <SettingLabel>password</SettingLabel>
                                <Input type='password' inputRef={ node => this.password = node } />
                            </SettingRow>
                        </BlockRow>
                        <BlockRow>
                            <div style={ {
                                display: 'flex',
                                justifyContent: 'space-between',
                            } }
                            >
                                <Button onClick={ this.setPassord }>set passord</Button>
                                <Button onClick={ this.login } color='green'>login</Button>
                            </div>
                        </BlockRow>
                    </div>
                )}
            </Block>
        );
    }
}

export default connect(state => ({
    password: state.wallet.password,
    incorrectPassword: state.wallet.incorrectPassword,
}), { setPassword: login, createPassword })(RequirePassword);

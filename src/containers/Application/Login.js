import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import { 
    // Message, Block, BlockRow, Button,
    Block, BlockRow,
    Message, Input, Button, Title, LoginContainer,
    Control,
} from '@cybercongress/ui';
// import Block, { BlockRow } from '../../components/Settings/Block';
// import { SettingLabel, SettingRow } from '../../components/Settings/Settings';
// import Input from '../../components/Input/Input';
// import Button from '../../components/Button/Button';
import { createPassword, login, isLoginExist } from '../../redux/wallet';
// import Titile from '../../components/Titile/Titile';
// import LoginContainer from '../../components/LoginContainer/LoginContainer';

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

    componentDidMount() {
        if (this.password) {
            this.password.focus();
        }
    }

    render() {
        const { incorrectPassword } = this.props;
        const isUserExist = isLoginExist();
        const label = isUserExist ? 'Login' : 'Create account';

        return (
            <LoginContainer>
                <div>
                    <Title inline>/ {label}</Title>
                    <Block style={ { width: 400 } }>
                        {!isUserExist ? (
                            <div>
                                <BlockRow key='create1'>
                                    {/* <SettingRow>
                                        <SettingLabel>password</SettingLabel>
                                        <Input type='password' inputRef={ node => this.password1 = node } />
                                    </SettingRow> */}
                                    <Control noMargin textWidth={100} title='password'>
                                        <Input type='password' inputRef={ node => this.password1 = node } />
                                    </Control>
                                </BlockRow>
                                <BlockRow key='create2'>
                                    {/* <SettingRow>
                                        <SettingLabel>confirm password</SettingLabel>
                                        <Input type='password' inputRef={ node => this.password2 = node } />
                                    </SettingRow>*/}
                                    <Control noMargin textWidth={100} title='confirm password'>
                                        <Input type='password' inputRef={ node => this.password2 = node } />
                                    </Control>
                                </BlockRow> 
                                    
                                <BlockRow>
                                    <div style={ {
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    } }
                                    >
                                         <Button sizeSm onClick={ this.createPassword } color='green'>Create</Button>
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
                                    <form onSubmit={this.login} style={{display: 'flex', alignItems: 'center'}}>
                                    <Control style={{marginBottom: 0, justifyContent:'flex-start' }} title='password'>
                                        <Input style={{ width: 150 }} type='password' inputRef={ node => this.password = node } />
                                        <Button sizeSm style={{ marginLeft: 15, minWidth: 80, textTransform: 'none' }} onClick={ this.login } color='green'>Login</Button>
                                    </Control>
                                        {/* <SettingLabel style={{ width: 90 }}>password</SettingLabel> */}
                                        {/* <Input style={{ width: 150 }} type='password' inputRef={ node => this.password = node } />
                                        <Button sizeSm style={{ marginLeft: 25, minWidth: 80, textTransform: 'none' }} onClick={ this.login } color='green'>Login</Button> */}
                                    </form>
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

import React from 'react';
const ethers = require('ethers');
import { connect } from 'react-redux';

import bip39 from 'bip39';
const jswallet = require("ethereumjs-wallet");
var hdkey = require('ethereumjs-wallet/hdkey')
var passworder = require('browser-passworder')

import { startBrowsing } from './../../redux/intro';
import { Section, Logo } from './../../components/Intro/Intro';
import { Button, Input } from '@cybercongress/ui';
import { create as createCyberdAccount, recover } from '../../cyber/crypto';

const Hello = ({ onNext }) => (
    <Section>
        <Logo />
        <p>Hi! 🤟
I’m CYB - a friendly robot, and I want to show you the new internet. 🙀
    </p>
        <Button onClick={onNext}>Let’s go</Button>
    </Section>
);

const ImportOrCreate = ({ onCreate, onImport }) => (
    <Section>
        <Logo />
        <p>
            But firstly, let me help🤓 you to get ready for the adventure.🚀 If you are a new user I will show you how to complete all configurations. If you’ve used Cyb before you can easely import account, settings and bookmarks and start browsing!🖖
        </p>
        <div>
            <Button onClick={onImport}>I’ve used cyb before</Button>
            <Button onClick={onCreate}>I’m new user</Button>
        </div>
    </Section>
);

let mnemonicInput;
const Import = ({ onBack, onNext }) => (
    <Section>
        <Logo />
        <p>
        Account import. If your seed phrase is incorrect you should create new account
        </p>
        <textarea ref={ node => { mnemonicInput = node; }} rows="4" cols="50"/>
        <div>
            <Button onClick={onBack}>back</Button>
            <Button onClick={() => onNext(mnemonicInput.value)}>Next Step</Button>
        </div>
    </Section>
);

const AccountCreated = ({ onNext, eth, cyber }) => (
    <Section>
        <div>
            <p>This is your new account</p>
            <div>
                <div>
                {eth.balance}
                 ETH
                </div>
                <div>{eth.address}</div>
            </div>
            <div>
                <div>
                    {cyber.balance}
                    GCYB
                </div>
                <div>
                    {cyber.address}
                </div>
            </div>
        </div>
        <div>
            <Logo />
            <p>
            Don’t forget to back up seed phrase and private key
            </p>
            <div>
                <Button onClick={onNext}>Back up mnemonic</Button>
            </div>
        </div>
    </Section>
);

const AccountImported = ({ onNext, onBack, eth, cyber }) => (
    <Section>
        <div>
            <p>Check your imported account</p>
            <div>
                <div>{eth.balance} ETH</div>
                <div>{eth.address}</div>
            </div>
            <div>
                <div>{cyber.balance} GCYB</div>
                <div>{cyber.address}</div>
            </div>
        </div>
        <div>
            <Logo />
            <p>
            If it’s not your account you can go back and import another
            </p>
            <div>
                <Button onClick={onBack}>Back</Button>
                <Button onClick={onNext}>Next Step</Button>
            </div>
        </div>
    </Section>
);

class BackupMnemonic extends React.Component {
    state = { isCopied: false }

    copy = () => {
        // TODO: copy to clipboard
        this.setState({ isCopied: true });
    }

    render() {
        const { mnemonic, onNext } = this.props;
        const { isCopied } = this.state;

        return (
            <Section>
                <div>
                    <Logo />
                </div>
                <div>
                    <textarea rows='4' cols='50'>
                        { mnemonic }
                    </textarea>
                    <div>
                        <Button onClick={ this.copy }>Copy</Button>
                    </div>
                    <div>
                        <Button disabled={ !isCopied } onClick={ onNext }>Next Step</Button>
                    </div>
                </div>
            </Section>
        );
    }
}

class CreatePassword extends React.Component {
    next = () => {
        const { onNext } = this.props;
        const password = this.password.value;
        const confirmPassword = this.confirmPassword.value;

        if (password === confirmPassword) {
            onNext(password);
        }
    }

    render() {
        return (
            <Section>
                <div>
                    <Logo />
                </div>
                <div>
                    <div>
                        <p>Now let’s create a password for your account</p>
                        <div>
                            Password
                            <Input inputRef={ node => this.password = node } />
                        </div>
                        <div>
                            Confirm password
                            <Input inputRef={ node => this.confirmPassword = node } />
                        </div>
                    </div>
                    <div>
                        <Button onClick={ this.next }>Create password</Button>
                    </div>
                </div>
            </Section>
        );
    }
}

const Settings = ({ onNext }) => (
    <Section>
        <div>
            <p>Add instruction </p>
        </div>
        <div>
            <p>Ok, the final step - web3 providers. You can choose default settings or enter custom endpoints.</p>
            <input type='file' />
            <div>
                settings
            </div>
            <div>
                <Button onClick={ onNext } >Next Step</Button>
            </div>
        </div>
    </Section>
)

const Congratulation = ({ onNext }) => (
    <Section>
        <Logo />
        <p>Well, now you are ready to enjoy your web3 experience! 🤟</p>
        <Button onClick={ onNext } >Start browsing</Button>
    </Section>
);

let loginPassord = null;
const Login = ({ error, onLogin }) => (
    <Section>
        <p>/Login</p>
        <div>
            <Input inputRef={ node => loginPassord = node } />
        </div>
        <div>
            {error}
        </div>
        <div>
            <Button onClick={() => onLogin(loginPassord.value) }>login</Button>
        </div>
    </Section>
)

class Intro extends React.Component {
    state = {
        step: 'hello',
        entropy: '',
        mnemonic: '',
        ethAccount: null,
        cyberAccount: null,
        password: '',
        loginError: '',
        // address: '',
        // privateKey: '',
        // passphrase: '',
        // mnemonic: '',
        // error: ''
    }

    componentDidMount() {
        const accountExist = !!localStorage.getItem('secret');

        if (accountExist) {
            this.setState({ step: 'login' });
            // this.props.startBrowsing(this.state);
        } else {
            this.setState({ step: 'hello' });
        }
    }

    goToImportOrCreate = () => {
        this.setState({ step: 'inportOrCreate' });
    }

    goToCreate = () => {
        const mnemonic = bip39.generateMnemonic();

        const entropy = bip39.mnemonicToEntropy(mnemonic);

        const seed = bip39.mnemonicToSeed(mnemonic, '');
        const rootKey = hdkey.fromMasterSeed(seed);

        const ethKey = rootKey.derivePath("m/44'/60'/0'/0/0");
        const ethAddress = ethKey.getWallet().getAddressString();
        const ethPrivateKey = ethKey.getWallet().getPrivateKey().toString('hex');
        const account = createCyberdAccount(entropy);

        this.setState({
            step: 'accountCreated',
            entropy,
            mnemonic,
            ethAccount: { address: ethAddress, balance: 0, privateKey: ethPrivateKey },
            cyberAccount: { address: account.address, balance: 0, privateKey: account.privateKey },
        });
    }

    goToImport = () => {
        this.setState({ step: 'import' });
    }

    saveSeedAndNext = (mnemonic) => {
        const entropy = bip39.mnemonicToEntropy(mnemonic);

        const seed = bip39.mnemonicToSeed(mnemonic, '');
        const rootKey = hdkey.fromMasterSeed(seed);

        const ethKey = rootKey.derivePath("m/44'/60'/0'/0/0");
        const ethAddress = ethKey.getWallet().getAddressString();
        const ethPrivateKey = ethKey.getWallet().getPrivateKey().toString('hex');
        const account = recover(entropy);

        // TODO: calculate balance
        this.setState({
            step: 'accountCreated',
            entropy,
            mnemonic,
            ethAccount: { address: ethAddress, balance: 0, privateKey: ethPrivateKey },
            cyberAccount: { address: account.address, balance: 0, privateKey: account.privateKey },
        });

        this.setState({ step: 'accountImported' });
    }

    goToBackupMnemonic = () => {
        // this.refs.text.value = mnemonic;

        this.setState({ step: 'backupMnemonic' });
    }

    goToCreatePassword = () => {
        this.setState({ step: 'createPassword' });
    }

    goToSettings = (password) => {
        this.setState({ password, step: 'settings' });
    }

    goToCongratulation = () => {
        this.setState({ step: 'congratulation' });
    }

    startBrowsing = () => {
        // this.setState({ step: 'hello' });
        const { entropy, password } = this.state;
        const secrets = { entropy };

        passworder.encrypt(password, secrets)
            .then(blob => {
                localStorage.setItem('secret', blob);
                this.props.startBrowsing(this.state);
            });
    }

    login = password => {
        const blob = localStorage.getItem('secret');

        passworder.decrypt(password, blob)
            .then(decryptResult => {
                const { entropy } = decryptResult;
                const mnemonic = bip39.entropyToMnemonic(entropy);

                const seed = bip39.mnemonicToSeed(mnemonic, '');
                const rootKey = hdkey.fromMasterSeed(seed);

                const ethKey = rootKey.derivePath("m/44'/60'/0'/0/0");
                const ethAddress = ethKey.getWallet().getAddressString();
                const ethPrivateKey = ethKey.getWallet().getPrivateKey().toString('hex');

                const account = recover(entropy);

                // TODO: calculate balance
                const newState = {
                    password,
                    entropy,
                    mnemonic,
                    ethAccount: { address: ethAddress, balance: 0, privateKey: ethPrivateKey },
                    cyberAccount: { address: account.address, balance: 0, privateKey: account.privateKey },
                };

                this.setState({
                    loginError: '',
                    ...newState
                }, () => {
                    this.props.startBrowsing(this.state);
                })
            }).catch(e => {
                debugger
                this.setState({ loginError: 'incorrect password' });
            })
    }

    // exportMnemonic = () => {
    //     // const secret = localStorage.getItem('secret');
    //     // const mnemonic = secret;
    //     // this.setState({ mnemonic });

    //     const blob = localStorage.getItem('secret');
    //     const password = this.refs.password.value;

    //     passworder.decrypt(password, blob)
    //         .then(decryptResult => {
    //             const { entropy } = decryptResult;
    //             const mnemonic = bip39.entropyToMnemonic(entropy);
    //             this.setState({ mnemonic, error: '' });
    //         }).catch(e => {
    //             this.setState({ error: 'incorrect password' });
    //         })

    // }

    // loadFromLS = () => {
    //     const blob = localStorage.getItem('secret');
    //     const password = this.refs.password.value;

    //     passworder.decrypt(password, blob)
    //     .then((decryptResult) => {

    //         // const entropy = secret;
    //         const { entropy } = decryptResult;
    //         const mnemonic = bip39.entropyToMnemonic(entropy);
    //         const seed = bip39.mnemonicToSeed(mnemonic, '');
    //         const rootKey = hdkey.fromMasterSeed(seed);

    //         const hardenedKey = rootKey.derivePath("m/44'/60'/0'/0/0");
    //         const address = hardenedKey.getWallet().getAddressString();
    //         const privateKey = hardenedKey.getWallet().getPrivateKey().toString('hex');
    //         this.setState({ address, privateKey, error: '' });            
    //     }).catch(e => {
    //         this.setState({ error: 'incorrect password' });
    //     })

    // }

    // createAccount = async () => {
    //     const mnemonic = this.refs.text.value;
    //     const password = this.refs.password.value;
    //     const entropy = bip39.mnemonicToEntropy(mnemonic);

    //     const seed = bip39.mnemonicToSeed(mnemonic, '');
    //     const rootKey = hdkey.fromMasterSeed(seed);

    //     const ethKey = rootKey.derivePath("m/44'/60'/0'/0/0");
    //     const ethAddress = ethKey.getWallet().getAddressString();
    //     const ethPrivateKey = ethKey.getWallet().getPrivateKey().toString('hex');


    //     const secrets = { entropy };

    //     passworder.encrypt(password, secrets)
    //         .then(blob => {
    //             localStorage.setItem('secret', blob);
    //         });

    //     this.setState({ address: ethAddress, privateKey: ethPrivateKey });
    // }

    generate = () => {
        const mnemonic = bip39.generateMnemonic();
        this.refs.text.value = mnemonic;

        // var secrets = { coolStuff: 'all', ssn: 'livin large' }
        // var password = 'hunter55'

        // passworder.encrypt(password, secrets)
        // .then(function(blob) {
        //     debugger
        //   // return passworder.decrypt(password, blob)
        // })
        // .then(function(result) {
        //   // assert.deepEqual(result, secrets)
        // })
    }

    render() {
        const { step, ethAccount, cyberAccount, mnemonic, loginError } = this.state;

        if (step === 'hello') {
            return (
                <Hello onNext={this.goToImportOrCreate} />
            );
        }

        if (step === 'inportOrCreate') {
            return (
                <ImportOrCreate onCreate={this.goToCreate} onImport={this.goToImport} />
            );
        }

        if (step === 'import') {
            return (
                <Import onBack={this.goToImportOrCreate} onNext={this.saveSeedAndNext} />
            );
        }


        if (step === 'accountCreated') {
            return (
                <AccountCreated
                  onNext={ this.goToBackupMnemonic }
                  eth={ ethAccount }
                  cyber={ cyberAccount }
                />
            );
        }

        if (step === 'accountImported') {
            return (
                <AccountImported
                  onBack={ this.goToImportOrCreate }
                  onNext={ this.goToCreatePassword }
                  eth={ ethAccount }
                  cyber={ cyberAccount }
                />
            );
        }


        if (step === 'backupMnemonic') {
            return (
                <BackupMnemonic mnemonic={mnemonic} onNext={ this.goToCreatePassword } />
            );
        }

        if (step === 'createPassword') {
            return (
                <CreatePassword onNext={ this.goToSettings } />
            );
        }

        if (step === 'settings') {
            return (
                <Settings onNext={ this.goToCongratulation } />
            );
        }

        if (step === 'congratulation') {
            return (
                <Congratulation onNext={this.startBrowsing} />
            );
        }

        if (step === 'login') {
            return (
                <Login error={ loginError } onLogin={this.login} />
            );
        }

        return null;

        // return (
        //     <div>
        //         <br/>
        //         <div>create:</div>
        //         <div>
        //             <div>
        //                 <div>Mnemonic:</div>
        //                 <textarea rows='4' cols='45' name='text' ref='text'>
                            
        //                 </textarea>
        //             </div>
        //             <div>
        //                 <div>Password:</div>
        //                 <input ref='password' />
        //             </div>
        //             <Button onClick={this.createAccount}>create</Button>
        //             <Button onClick={this.generate}>new</Button>
        //         </div>
        //         <div>
        //             <Button onClick={this.loadFromLS}>load from LS</Button>
        //         </div>
        //         <div>
        //             <div>
        //                 account:
        //             </div>
        //             <div>
        //                 {this.state.address}
        //             </div>
        //             <div>
        //                 {this.state.privateKey}
        //             </div>
        //         </div>
        //         <div>
        //             {this.state.passphrase}
        //         </div>
        //         <div>
        //             <Button onClick={this.exportMnemonic}>export</Button>
        //             <div>
        //                 {this.state.mnemonic}
        //             </div>
        //         </div>
        //         <div>
        //             {this.state.error}
        //         </div>
        //     </div>
        // );
    }
}

export default connect(
    null,
    { startBrowsing },
)(Intro);

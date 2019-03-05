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


const Import = ({ onBack, onNext }) => (
    <Section>
        <Logo />
        <p>
        Account import. If your seed phrase is incorrect you should create new account
        </p>
        <textarea rows="4" cols="50"/>
        <div>
            <Button onClick={onBack}>back</Button>
            <Button onClick={onNext}>Next Step</Button>
        </div>
    </Section>
);

const AccountCreated = ({ onNext }) => (
    <Section>
        <div>
            <p>This is your new account</p>
            <div>
                <div>0 ETH</div>
                <div>0x92dF5e8886dA04fe4EB648d46e1Eeaaaa92256E5</div>
            </div>
            <div>
                <div>0 GCYB</div>
                <div>cyber1f9yjqmxh6prsmgpcaqj8lmjnxg644n5074zznm</div>
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

const AccountImported = ({ onNext, onBack }) => (
    <Section>
        <div>
            <p>Check your imported account</p>
            <div>
                <div>1.44 ETH</div>
                <div>0x92dF5e8886dA04fe4EB648d46e1Eeaaaa92256E5</div>
            </div>
            <div>
                <div>146 GCYB</div>
                <div>cyber1f9yjqmxh6prsmgpcaqj8lmjnxg644n5074zznm</div>
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


const BackupMnemonic = ({ onNext }) => (
    <Section>
        <div>
            <Logo />
        </div>
        <div>
            <textarea rows="4" cols="50">
            elevator fit clay lottery pill usual drum flag post pill lecture country hotel logic album
            </textarea>
            <div>
                <Button>Copy</Button>
            </div>
            <div>
                <Button onClick={onNext}>Next Step</Button>
            </div>
        </div>
    </Section>
);

const CreatePassword = ({ onNext }) => (
    <Section>
        <div>
            <Logo/>
        </div>
        <div>
            <div>
                <p>Now let’s create a password for your account</p>
                <div>
                    Password
                    <Input />
                </div>
                <div>
                    Confirm password
                    <Input />
                </div>
            </div>
            <div>
                <Button onClick={ onNext }>Create password</Button>
            </div>
        </div>
    </Section>
);

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
)

class Intro extends React.Component {
    state = { step: 'hello', address: '', privateKey: '', passphrase: '', mnemonic: '', error: '' }

    goToImportOrCreate = () => {
        this.setState({ step: 'inportOrCreate' });
    }

    goToCreate = () => {
        this.setState({ step: 'accountCreated' });
    }

    goToImport = () => {
        this.setState({ step: 'import' });
    }

    saveSeedAndNext = (seed) => {
        this.setState({ step: 'accountImported' });
    }

    goToBackupMnemonic = () => {
        this.setState({ step: 'backupMnemonic' });
    }

    goToCreatePassword = () => {
        this.setState({ step: 'createPassword' });
    }

    goToSettings = () => {
        this.setState({ step: 'settings' });
    }

    goToCongratulation = () => {
        this.setState({ step: 'congratulation' });
    }

    startBrowsing = () => {
        // this.setState({ step: 'hello' });
        this.props.startBrowsing();
    }

    exportMnemonic = () => {
        // const secret = localStorage.getItem('secret');
        // const mnemonic = secret;
        // this.setState({ mnemonic });

        const blob = localStorage.getItem('secret');
        const password = this.refs.password.value;

        passworder.decrypt(password, blob)
            .then(decryptResult => {
                const { entropy } = decryptResult;
                const mnemonic = bip39.entropyToMnemonic(entropy);
                this.setState({ mnemonic, error: '' });
            }).catch(e => {
                this.setState({ error: 'incorrect password' });
            })

    }

    loadFromLS = () => {
        const blob = localStorage.getItem('secret');
        const password = this.refs.password.value;

        passworder.decrypt(password, blob)
        .then((decryptResult) => {

            // const entropy = secret;
            const { entropy } = decryptResult;
            const mnemonic = bip39.entropyToMnemonic(entropy);
            const seed = bip39.mnemonicToSeed(mnemonic, '');
            const rootKey = hdkey.fromMasterSeed(seed);

            const hardenedKey = rootKey.derivePath("m/44'/60'/0'/0/0");
            const address = hardenedKey.getWallet().getAddressString();
            const privateKey = hardenedKey.getWallet().getPrivateKey().toString('hex');
            this.setState({ address, privateKey, error: '' });            
        }).catch(e => {
            this.setState({ error: 'incorrect password' });
        })
        
        // const password = this.refs.password.value;


        // const secret = bip39.mnemonicToSeedHex(mnemonic, password);

        // localStorage.setItem('secret', mnemonic);

// const privateKey = "5f83be83fdd3c38bdc3f383896260604f42053fd4d6591af0cf946b841bbb4b1";

        // const wallet = jswallet.fromPrivateKey(Buffer.from(privateKey, "hex"));
        // const passphrase = wallet.toV3("password");

        // const hardenedKey = rootKey.derivePath("m/44'/60'/0'/0");
        // const index = 0;
        // const childKey = hardenedKey.deriveChild(index);
        // const wallet = childKey.getWallet();
        // const address = wallet.getAddress();
        // const privateKey = wallet.getPrivateKey();
        // debugger
        
         
    }
    createAccount = async () => {
        const mnemonic = this.refs.text.value;
        const password = this.refs.password.value;
        // const seed = bip39.mnemonicToEntropy(mnemonic);

        // debugger
        // debugger


        // const HDNode = hdkey.fromExtendedKey('xprv9s21ZrQH143K2hmKFuFBWzGZDQks4WBKp9Sh4U36kFoinuSMhuuWSKuYSHuWuovpBaAfx1gXYPjsM7UusWgrGA1jAvWsDPPpZbFpqwgDHjd');

        // HDNode.derivePath();
        // const HDNode = hdkey.fromMasterSeed('017f21be606763150836aeaf1b1526dfe4a6671560e3141fa36539e9f22044e4547c1d16d3c8c7e6b6c1c605f7550d4ff346f49aa5ad5099178b0961b37398f8');
        // const HDNode = hdkey.fromMasterSeed('razor connect stand unaware escape casino mansion prepare code because artefact hole');
        // const mnemonic = "antique assume recycle glance agent habit penalty forum behave danger crop weekend";
        const entropy =  bip39.mnemonicToEntropy(mnemonic);

        const seed = bip39.mnemonicToSeed(mnemonic, '');
        const rootKey = hdkey.fromMasterSeed(seed);

        const hardenedKey = rootKey.derivePath("m/44'/60'/0'/0/0");
        const address = hardenedKey.getWallet().getAddressString();
        const privateKey = hardenedKey.getWallet().getPrivateKey().toString('hex');


        // const secret = bip39.mnemonicToSeedHex(mnemonic, password);

        var secrets = { entropy };
        // var password = 'hunter55'

        passworder.encrypt(password, secrets)
        .then(function(blob) {
            localStorage.setItem('secret', blob);
            // debugger
          // return passworder.decrypt(password, blob)
        })
        // .then(function(result) {
        //   // assert.deepEqual(result, secrets)
        // })

        

// const privateKey = "5f83be83fdd3c38bdc3f383896260604f42053fd4d6591af0cf946b841bbb4b1";

        // const wallet = jswallet.fromPrivateKey(Buffer.from(privateKey, "hex"));
        // const passphrase = wallet.toV3("password");

        // const hardenedKey = rootKey.derivePath("m/44'/60'/0'/0");
        // const index = 0;
        // const childKey = hardenedKey.deriveChild(index);
        // const wallet = childKey.getWallet();
        // const address = wallet.getAddress();
        // const privateKey = wallet.getPrivateKey();
        // debugger
        
        this.setState({ address, privateKey });
    }

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
        const { step } = this.state;

        // if (step === 'hello') {
        //     return (
        //         <Hello onNext={this.goToImportOrCreate} />
        //     );
        // }

        // if (step === 'inportOrCreate') {
        //     return (
        //         <ImportOrCreate onCreate={this.goToCreate} onImport={this.goToImport} />
        //     );
        // }

        // if (step === 'import') {
        //     return (
        //         <Import onBack={this.goToImportOrCreate} onNext={this.saveSeedAndNext} />
        //     );
        // }


        // if (step === 'accountCreated') {
        //     return (
        //         <AccountCreated onNext={this.goToBackupMnemonic} />
        //     );
        // }

        // if (step === 'accountImported') {
        //     return (
        //         <AccountImported
        //           onBack={ this.goToImportOrCreate }
        //           onNext={ this.goToCreatePassword }
        //         />
        //     );
        // }


        // if (step === 'backupMnemonic') {
        //     return (
        //         <BackupMnemonic onNext={ this.goToCreatePassword } />
        //     );
        // }

        // if (step === 'createPassword') {
        //     return (
        //         <CreatePassword onNext={ this.goToSettings } />
        //     );
        // }

        // if (step === 'settings') {
        //     return (
        //         <Settings onNext={ this.goToCongratulation } />
        //     );
        // }

        // if (step === 'congratulation') {
        //     return (
        //         <Congratulation onNext={this.startBrowsing} />
        //     );
        // }

        // return null;

        return (
            <div>
                <br/>
                <div>create:</div>
                <div>
                    <div>
                        <div>Mnemonic:</div>
                        <textarea rows='4' cols='45' name='text' ref='text'>
                            
                        </textarea>
                    </div>
                    <div>
                        <div>Password:</div>
                        <input ref='password' />
                    </div>
                    <Button onClick={this.createAccount}>create</Button>
                    <Button onClick={this.generate}>new</Button>
                </div>
                <div>
                    <Button onClick={this.loadFromLS}>load from LS</Button>
                </div>
                <div>
                    <div>
                        account:
                    </div>
                    <div>
                        {this.state.address}
                    </div>
                    <div>
                        {this.state.privateKey}
                    </div>
                </div>
                <div>
                    {this.state.passphrase}
                </div>
                <div>
                    <Button onClick={this.exportMnemonic}>export</Button>
                    <div>
                        {this.state.mnemonic}
                    </div>
                </div>
                <div>
                    {this.state.error}
                </div>
            </div>
        );
    }
}

export default connect(
    null,
    { startBrowsing },
)(Intro);

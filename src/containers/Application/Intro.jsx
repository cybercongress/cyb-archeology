import React from 'react';
import { connect } from 'react-redux';
import bip39 from 'bip39';
import Login from './Login';
import { startBrowsing } from '../../redux/intro';
import { create, recover } from '../../cyber/crypto';
import ShowMeTheMatrix from '../Hello/ShowMeTheMatrix';
import AccountImported from '../Hello/AccountImported';
import ShowMyIdentity from '../Hello/ShowMyIdentity';
import ImportOrCreate from '../Hello/ImportOrCreate';
import AccountCreated from '../Hello/AccountCreated';
import BackupMnemonic from '../Hello/BackupMnemonic';
import CreatePassword from '../Hello/CreatePassword';
import ImportSettings from '../Hello/ImportSettings';
import Congratulation from '../Hello/Congratulation';
import ImportAccount from '../Hello/ImportAccount';
import StayAsleep from '../Hello/StayAsleep';
import LastChance from '../Hello/LastChance';
import WakeUp from '../Hello/WakeUp';
import Hello from '../Hello/Hello';
import Connections from '../Hello/Connections';
import { getBalanceByAddress } from '../../redux/wallet';

const hdkey = require('ethereumjs-wallet/hdkey');
const passworder = require('browser-passworder');

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
    };

    componentDidMount() {
        const secret = localStorage.getItem('secret');
        const accountExist = !!secret;

        if (accountExist && secret !== 'stayAsleep') {
            this.setState({ step: 'login' });
            // this.props.startBrowsing(this.state);
        } else if (secret === 'stayAsleep') {
            this.setState({ step: 'stayAsleep' });
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
        const account = recover(mnemonic);

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
        const account = recover(mnemonic);

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
        this.setState({ password, step: 'congratulation' });
    }

    goToCongratulation = () => {
        this.setState({ step: 'congratulation' });
    }

    goToWhatTruth = () => {
        this.setState({ step: 'whatTruth' });
    }

    goToLastChance = () => {
        this.setState({ step: 'lastChance' });
    }

    goToStayAsleep = () => {
        localStorage.setItem('secret', 'stayAsleep');

        this.setState({ step: 'stayAsleep' });
    }

    goToWakeUp = () => {
        this.setState({ step: 'wakeUp' });
    }

    goToShowMyIdentity = () => {
        this.setState({ step: 'showMyIdentity' });
    }

    goToConnections = () => {
        this.setState({ step: 'connections' });
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

    login = (password) => {
        const blob = localStorage.getItem('secret');

        passworder.decrypt(password, blob)
            .then((decryptResult) => {
                const { entropy } = decryptResult;
                const mnemonic = bip39.entropyToMnemonic(entropy);
                const account = recover(entropy);

                const newState = {
                    password,
                    entropy,
                    mnemonic,
                    cyberAccount: {
                        address: account.address, balance: 0, privateKey: account.privateKey
                    },
                };

                this.setState({
                    loginError: '',
                    ...newState,
                }, () => {
                    this.props.startBrowsing(this.state);
                });
            }).catch((e) => {
                this.setState({ loginError: 'incorrect password' });
            });
    };

    generate = () => {
        const mnemonic = bip39.generateMnemonic();
        this.refs.text.value = mnemonic;
    };

    render() {
        const { step, ethAccount, cyberAccount, mnemonic, loginError } = this.state;

        if (step === 'hello') {
            return (
                <Hello onNext={ this.goToImportOrCreate } />
            );
        }

        if (step === 'inportOrCreate') {
            return (
                <ImportOrCreate onImport={ this.goToImport } onWhatTruth={ this.goToWhatTruth } />
            );
        }

        if (step === 'import') {
            return (
                <ImportAccount onBack={ this.goToImportOrCreate } onNext={ this.saveSeedAndNext } />
            );
        }

        if (step === 'whatTruth') {
            return (
                <ShowMeTheMatrix onNext={ this.goToLastChance } />
            );
        }

        if (step === 'lastChance') {
            return (
                <LastChance onStayAsleep={ this.goToStayAsleep } onWakeUp={ this.goToWakeUp } />
            );
        }

        if (step === 'stayAsleep') {
            return (
                <StayAsleep />
            );
        }

        if (step === 'wakeUp') {
            return (
                <WakeUp onNext={ this.goToShowMyIdentity } />
            );
        }

        if (step === 'showMyIdentity') {
            return (
                <ShowMyIdentity onNext={ this.goToCreate } />
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

        // if (step === 'settings') {
        //     return (
        //         <ImportSettings onNext={ this.goToConnections } />
        //     );
        // }

        // if (step === 'connections') {
        //     return (
        //         <Connections onNext={ this.goToCongratulation } />
        //     );
        // }

        if (step === 'congratulation') {
            return (
                <Congratulation onNext={this.startBrowsing} />
            );
        }

        if (step === 'login') {
            return (
                <Login error={ loginError } onLogin={ this.login } />
            );
        }

        return null;
    }
}

export default connect(
    null,
    {
        startBrowsing,
        // getBalanceByAddress,
    },
)(Intro);

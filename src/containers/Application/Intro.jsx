import React from 'react';

import { connect } from 'react-redux';

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
    state = { step: 'hello' }

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

    render() {
        const { step } = this.state;

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
                <AccountCreated onNext={this.goToBackupMnemonic} />
            );
        }

        if (step === 'accountImported') {
            return (
                <AccountImported
                  onBack={ this.goToImportOrCreate }
                  onNext={ this.goToCreatePassword }
                />
            );
        }


        if (step === 'backupMnemonic') {
            return (
                <BackupMnemonic onNext={ this.goToCreatePassword } />
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

        return null;
    }
}

export default connect(
    null,
    { startBrowsing },
)(Intro);

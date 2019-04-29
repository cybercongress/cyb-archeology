import React from 'react';
import {
    HelloContainerLeftCol, HelloContainer, HelloContainerRightCol,
    HelloContainerRightColContent, TextIlineBlock, HelloContainerRightColBtn,
    ButtonEverGreen, SlallImgText, BntGroup, Pane, Textarea, IconButton,
} from '@cybercongress/ui';

const cybEye = require('./img/eye.jpg');

class ImportAccount extends React.Component {
    state = {
        mnemonic: '',
    };

    onMnemonicChange = (event) => {
        this.setState({ mnemonic: event.target.value });
    };

    render() {
        const { mnemonic } = this.state;
        const { onBack, onNext } = this.props;

        return (
            <HelloContainer>
                <HelloContainerLeftCol>
                    <SlallImgText imgCyb={ cybEye }>
                        <TextIlineBlock>
                            We need to import your account. Just paste or type mnemonic phrase in
                            the text field
                        </TextIlineBlock>
                    </SlallImgText>
                </HelloContainerLeftCol>
                <HelloContainerRightCol bntGroup={ <BntGroup /> }>
                    <HelloContainerRightColContent>
                        <Pane
                            position='relative'
                            display='flex'
                            justifyContent='center'
                            height='90%'
                            maxHeight={ 500 }
                            maxWidth={500}
                            width='100%'
                        >
                            <Textarea
                                height='100%'
                                paddingX={ 20 }
                                paddingY={ 20 }
                                fontSize='18px'
                                placeholder='Add trees...'
                                width='100%'
                                backgroundColor='#000'
                                color='#fff'
                                boxShadow='0 0 1px #fff'
                                style={ { wordSpacing: 20, resize: 'none' } }
                                value={ mnemonic }
                                onChange={ e => this.onMnemonicChange(e) }
                            />
                            <Pane bottom='1%' zIndex={ 2 } left='0' position='absolute'>
                                <IconButton appearance='minimal' icon='duplicate' />
                            </Pane>
                        </Pane>
                    </HelloContainerRightColContent>
                    <HelloContainerRightColBtn paddingX='5%'>
                        <ButtonEverGreen
                            custonClass='btn-white'
                            onClick={ onBack }
                        >
                            Back
                        </ButtonEverGreen>
                        <ButtonEverGreen
                            onClick={ () => onNext(mnemonic) }
                        >
                            Show account
                        </ButtonEverGreen>
                    </HelloContainerRightColBtn>
                </HelloContainerRightCol>
            </HelloContainer>
        );
    }
}

export default ImportAccount;

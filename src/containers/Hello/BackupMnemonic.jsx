import React from 'react';
import {
    HelloContainerLeftCol, HelloContainer, HelloContainerRightCol,
    HelloContainerRightColContent, TextIlineBlock, HelloContainerRightColBtn,
    ButtonEverGreen, SlallImgText, BntGroup, Pane, Textarea, IconButton, TextEv as Text,
} from '@cybercongress/ui';
import connect from 'react-redux/es/connect/connect';

const cybEye2 = require('./img/cybEye2.png');

class BackupMnemonic extends React.Component {
    copyToClipboard = (mnemonic) => {
        const textField = document.createElement('textarea');

        textField.innerText = mnemonic;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
    };

    render() {
        const { mnemonic, onNext, username } = this.props;

        return (
            <HelloContainer>
                <HelloContainerLeftCol>
                    <SlallImgText imgCyb={ cybEye2 }>
                        <TextIlineBlock marginBottom={ 10 }>
                            This is your mnemonic phrase. Keep it safe, do not store this phrase on computer
                            or mobile phone! If you lose it - your funds will gone forever.
                        </TextIlineBlock>
                        <TextIlineBlock marginBottom={ 10 }>
                            You can write this phrase down to a paper, split to several parts and dig them
                            into the ground.
                        </TextIlineBlock>
                        <TextIlineBlock marginBottom={ 10 }>
                            I didn't say it would be easy,
                            <Text fontSize='16px' color='#fff'>
                                {username}
                            </Text>
                            . I just said it would be the truth.
                        </TextIlineBlock>
                    </SlallImgText>
                </HelloContainerLeftCol>
                <HelloContainerRightCol bntGroup={ <BntGroup /> }>
                    <HelloContainerRightColContent>
                        <Pane position='relative' display='flex' justifyContent='center' height='90%' maxHeight={ 500 } maxWidth={500} width='100%'>
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
                            />
                            <Pane bottom='1%' zIndex={ 2 } left='0' position='absolute'>
                                <IconButton
                                    appearance='minimal'
                                    icon='duplicate'
                                    onClick={ e => this.copyToClipboard(mnemonic) }
                                />
                            </Pane>
                        </Pane>
                    </HelloContainerRightColContent>
                    <HelloContainerRightColBtn center>
                        <ButtonEverGreen
                            onClick={ onNext }
                        >
                            I swear, I save
                        </ButtonEverGreen>
                    </HelloContainerRightColBtn>
                </HelloContainerRightCol>
            </HelloContainer>
        );
    }
}

export default connect(state => ({
    username: state.settings.username,
}), {})(BackupMnemonic);

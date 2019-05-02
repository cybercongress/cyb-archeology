import React from 'react';
import {
    HelloContainerLeftCol, HelloContainer, HelloContainerRightCol,
    HelloContainerRightColContent, TextIlineBlock, HelloContainerRightColBtn,
    ButtonEverGreen, SlallImgText, BntGroup, Pane, FilePicker, IconButton, Card,
} from '@cybercongress/ui';
import connect from 'react-redux/es/connect/connect';
import { importSettings } from '../../redux/settings';

const cybRed = require('./img/cyb-red.png');

class ImportSettings extends React.Component {
    state = {
        buttonText: 'Start from scratch',

        needImport: false,
        loadedJson: null,
    };

    onFilePickerChange = (files) => {
        const reader = new FileReader();

        reader.readAsText(files[0], 'UTF-8');
        reader.onload = (evt) => {
            console.log(evt.target.result);

            const loadedJson = JSON.parse(evt.target.result);

            this.setState({
                buttonText: 'Apply state',
                needImport: true,
                loadedJson,
            });
        };

        reader.onerror = (evt) => {
            console.log('error', evt);
        };
    };

    onClearFilePicker = () => {
        this.render();
    };

    onNext = () => {
        const { needImport, loadedJson } = this.state;

        if (needImport) {
            this.props.importSettings(loadedJson);
        }

        this.props.onNext();
    };

    render() {
        const { buttonText } = this.state;

        return (
            <HelloContainer>
                <HelloContainerLeftCol>
                    <SlallImgText imgCyb={ cybRed }>
                        <TextIlineBlock marginBottom={ 10 }>
                            You can skip this step if you are the first time outside the matrix.
                        </TextIlineBlock>
                        <TextIlineBlock>
                            If you have backup of your state, you can import it.
                        </TextIlineBlock>
                    </SlallImgText>
                </HelloContainerLeftCol>
                <HelloContainerRightCol bntGroup={ <BntGroup /> }>
                    <HelloContainerRightColContent>
                        <Card
                            display='flex'
                            flexDirection='column'
                            alignItems='center'
                            boxShadow='0 0 1px #fff'
                            maxWidth='80%'
                            paddingX={ 90 }
                            paddingY={ 90 }
                            minWidth={ 500 }
                            maxHeight={ 500 }
                            height='100%'
                        >
                            <Pane width='100%' display='flex' alignItems='center'>
                                <FilePicker
                                  marginRight={ 10 }
                                  width='100%'
                                  onChange={ file => this.onFilePickerChange(file) }
                                  accept='application/json'
                                />
                                <IconButton
                                    paddingX={ 5 }
                                    paddingY={ 5 }
                                    appearance='minimal'
                                    icon='cross'
                                    iconSize={ 18 }
                                    onClick={ this.onClearFilePicker }
                                />
                            </Pane>
                        </Card>
                    </HelloContainerRightColContent>
                    <HelloContainerRightColBtn center>
                        <ButtonEverGreen
                            onClick={ this.onNext }
                        >
                            {buttonText}
                        </ButtonEverGreen>
                    </HelloContainerRightColBtn>
                </HelloContainerRightCol>
            </HelloContainer>
        );
    }
}

export default connect(state => ({}), {
    importSettings,
})(ImportSettings);

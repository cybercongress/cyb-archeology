import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as actions from '../../redux/settings';
import {
    HelloContainer,
    HelloContainerLeftCol,
    HelloContainerRightCol,
    HelloContainerRightColContent,
    BigImg,
    Pane,
    IconButton,
    Textarea,
} from '@cybercongress/ui';

const idrobot = require('../Hello/img/idrobot.png');

// const KeysCyb = () => (
//     <HelloContainer>
//         <HelloContainerLeftCol>
//             <BigImg srcBigImg={ idrobot } />
//         </HelloContainerLeftCol>
//         <HelloContainerRightCol>
//             <HelloContainerRightColContent>
//                 <TextAreaImportMnemonic />
//             </HelloContainerRightColContent>
//         </HelloContainerRightCol>
//     </HelloContainer>
// );

// export default KeysCyb;

class KeysCyb extends React.Component {
    copyToClipboard = (mnemonic) => {
        const textField = document.createElement('textarea');

        textField.innerText = mnemonic;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
    };

    render() {
        const { mnemonic } = this.props;
 
        return (
            <HelloContainer height='calc(100% - 60px)' marginTop={ 60 }>
                <HelloContainerLeftCol>
                    <BigImg srcBigImg={ idrobot } />
                </HelloContainerLeftCol>
                <HelloContainerRightCol>
                    <HelloContainerRightColContent>
                        <Pane
                          position='relative'
                          display='flex'
                          justifyContent='center'
                          height='90%'
                          maxHeight={ 500 }
                          maxWidth={ 500 }
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
                </HelloContainerRightCol>
            </HelloContainer>
        );
    }
}


export default KeysCyb;

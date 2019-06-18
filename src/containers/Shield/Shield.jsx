import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    HelloContainer,
    HelloContainerLeftCol,
    HelloContainerRightCol,
    HelloContainerRightColContent,
    HelloContainerRightColBtn,
    BigImg,
    ButtonEverGreen,
    Button,
    TextInputError,
    Pane,
    TextEv as Text,
    Card,
} from '@cybercongress/ui';
import { changePassword } from '../../redux/wallet';
// import * as actions from '../../redux/settings';

const idrobot = require('../Hello/img/idrobot.png');

class ShieldCyb extends Component {

    render() {
        const { password } = this.props;
      console.log(password);

      
        return (
            <div>
            <HelloContainer
              customClassContainer='connectionContainer'
              customClassGrig='connectionContainerGrid'
            >
                <HelloContainerLeftCol customClass='connectionContainer-left-col'>
                    <BigImg srcBigImg={ idrobot } />
                </HelloContainerLeftCol>
                <HelloContainerRightCol>
                    <HelloContainerRightColContent>
                    <Card
                      display='flex'
                      flexDirection='column'
                      alignItems='center'
                      boxShadow='0 0 1px #fff'
                      maxWidth={ 500 }
                      paddingX='8vh'
                      paddingY='8vh'
                      minWidth='80%'
                      maxHeight={ 500 }
                      height='80%'
                    >
                        <Pane width='100%' marginBottom='6%'>
                            <Pane width='100%' marginBottom='6%'>
                                <Text
                                  marginBottom='3%'
                                  display='inline-block'
                                  fontSize='1.12rem'
                                  color='#fff'
                                >
                                    Current password
                                </Text>
                                <TextInputError />
                            </Pane>
                            <Pane width='100%'>
                                <Text
                                  marginBottom='3%'
                                  display='inline-block'
                                  fontSize='1.12rem'
                                  color='#fff'
                                >
                                    New password
                                </Text>
                                <TextInputError />
                            </Pane>
                        </Pane>
                        <Pane width='100%'>
                            <Text
                              marginBottom='3%'
                              display='inline-block'
                              fontSize='1.12rem'
                              color='#fff'
                            >
                                Confirm new password
                            </Text>
                            <TextInputError />
                        </Pane>
                    </Card>
                    </HelloContainerRightColContent>
                </HelloContainerRightCol>
            </HelloContainer>
            <Pane
          display='flex'
          alignItems='center'
          justifyContent='center'
          width='100%'
          position='absolute'
          bottom={ 0 }
          paddingY={ 20 }
          backgroundColor='#000000'
          zIndex={ 2 }
        >
            <Pane
              flexGrow={ 1 }
              maxWidth={ 1000 }
              display='flex'
              alignItems='center'
              justifyContent='center'
              flexDirection='row'
              paddingX='3vw'
            >
                <Button paddingX={ 30 } fontSize='16px' className='btn'>
                    Save Password
                </Button>
            </Pane>
        </Pane>
            </div>
        );
    }
}

export default connect(state => ({
    password: state.wallet.password,
}), { changePassword })(ShieldCyb);

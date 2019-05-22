import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import * as actions from '../../redux/settings';
import {
    HelloContainer,
    HelloContainerLeftCol,
    HelloContainerRightCol,
    HelloContainerRightColContent,
    HelloContainerRightColBtn,
    BigImg,
    ButtonEverGreen,
    TextInputError,
    Pane,
    TextEv as Text,
    Card,
} from '@cybercongress/ui';

const idrobot = require('../Hello/img/idrobot.png');

const ShieldCyb = () => (
    <HelloContainer height='calc(100% - 60px)' marginTop={ 60 }>
        <HelloContainerLeftCol>
            <BigImg srcBigImg={ idrobot } />
        </HelloContainerLeftCol>
        <HelloContainerRightCol>
            <HelloContainerRightColContent>
                <Card
                  display='flex'
                  flexDirection='column'
                  alignItems='center'
                  boxShadow='0 0 1px #fff'
                  maxWidth='80%'
                  paddingX='8vh'
                  paddingY='8vh'
                  minWidth={ 500 }
                  maxHeight={ 500 }
                  height='100%'
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
                            <TextInputError boxShadow='0 0 5px #36d6ae' />
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
                            <TextInputError boxShadow='0 0 5px #36d6ae' />
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
                        <TextInputError boxShadow='0 0 5px #36d6ae' />
                    </Pane>
                </Card>
            </HelloContainerRightColContent>
            <HelloContainerRightColBtn center>
                <ButtonEverGreen>Save Password</ButtonEverGreen>
            </HelloContainerRightColBtn>
        </HelloContainerRightCol>
    </HelloContainer>
);

export default ShieldCyb;

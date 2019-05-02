import React from 'react';
import {
    Avatar,
    Card,
    Pane,
    PaneBalance,
    Pill,
    TextEv as Text,
} from '@cybercongress/ui';

const AccountCard = ({ username, eth, cyber }) => (
    <Card
        display='flex'
        flexDirection='column'
        alignItems='center'
        boxShadow='0 0 1px #fff'
        maxWidth='80%'
        paddingX={ 60 }
        paddingY='10%'
        maxHeight={ 500 }
    >
        <Pane
            display='flex'
            alignItems='center'
            justifyContent='center'
            flexDirection='column'
            marginBottom='25%'
        >
            <Pane maxHeight={ 90 } height='10vh'>
                <Avatar style={ { maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' } } />
            </Pane>
            <Text display='inline-block' marginTop='10%' fontSize='22px' color='#fff'>
                { username }
            </Text>
        </Pane>
        <Pane display='flex' flexDirection='row' marginBottom='15%'>
            <Pane>
                <Pill
                    height={ 10 }
                    width={ 10 }
                    borderRadius='50%'
                    color='yellow'
                    paddingX={ 0 }
                    isSolid
                    marginRight={ 15 }
                />
            </Pane>
            <PaneBalance position='relative'>
                <Text display='inline-block' marginBottom='5%' color='#fff' fontSize={ 30 }>
                    { eth.balance } ETH
                </Text>
                <Text display='inline-block' color='#fff'>
                    { eth.address }
                </Text>
            </PaneBalance>
        </Pane>
        <Pane display='flex' flexDirection='row'>
            <Pane>
                <Pill
                    height={ 10 }
                    width={ 10 }
                    borderRadius='50%'
                    color='blue'
                    paddingX={ 0 }
                    isSolid
                    marginRight={ 15 }
                />
            </Pane>
            <PaneBalance position='relative'>
                <Text display='inline-block' marginBottom='5%' color='#fff' fontSize={ 30 }>
                    { cyber.balance } GCYB
                </Text>
                <Text display='inline-block' color='#fff'>
                    { cyber.address }
                </Text>
            </PaneBalance>
        </Pane>
    </Card>
);

export default AccountCard;

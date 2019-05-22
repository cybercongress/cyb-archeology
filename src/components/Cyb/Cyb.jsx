import React from 'react';
import { Pane, TextEv as Text } from '@cybercongress/ui';

import './cyb.css';


export const Container = ({ children, ...props }) => (
    <Pane
        //  display='flex' alignItems='stretch' height='100%' flexDirection='row'
      height='100%'
        // paddingX='1em'
      display='grid'
      gridTemplateColumns='repeat(auto-fill, minmax(250px, 1fr))'
      justifyItems='center'
      gridGap='1em'
      gridRowGap='2em'
      width='100%'
        // marginX='-1em'
    >
        {children}
    </Pane>
);

export const CardCyb = ({ title, img }) => (
    <Pane
      maxWidth={ 320 }
      height={ 320 }
      backgroundColor='#000'
      borderRadius={ 5 }
      boxShadow='0 0 4px 0 #36d6ae'
      display='flex'
      justifyContent='center'
      className='CardCyb'
      flexGrow={ 1 }
    >
        <img src={ img } />
        <Text color='#4ed6ae' position='absolute' bottom='15%' fontSize='16px'>
            {title}
        </Text>
    </Pane>
);

import React from 'react';
import {
    Pane, TextEv as Text, Pill, Avatar,
} from '@cybercongress/ui';

import './cyb.css';

export const Container = ({ children, ...props }) => (
    <Pane
      display='flex'
      alignItems='stretch'
        //  height='100%'
      flexDirection='column'
        //   height='100%'
        //     // paddingX='1em'
        //   display='grid'
        //   gridTemplateColumns='repeat(auto-fill, minmax(250px, 1fr))'
        //   justifyItems='center'
        //   gridGap='1em'
        //   gridRowGap='2em'
      width='100%'
        // marginX='-1em'
    >
        {children}
    </Pane>
);

export const CardCyb = ({
    title, img, hash, disabled, address, version, ipfsStatus,
}) => (
    <Pane
        //   maxWidth={ 320 }
        //   height={ 320 }
      width='100%'
      paddingY={ 20 }
      paddingLeft={ 70 }
      paddingRight={ 25 }
      backgroundColor='#000'
      borderRadius={ 5 }
      boxShadow='0 0 2px 0 #36d6ae'
      display='flex'
        //   justifyContent='center'
      alignItems='center'
      className='CardCyb'
      flexGrow={ 1 }
      marginY={ 5 }
      position='relative'
      cursor={ disabled ? '' : 'pointer' }
    >
        {/* <img src={ img } /> */}
        {hash && (
            <Pane position='absolute' left='1.6em' display='flex' alignItems='center' height='100%'>
                <Avatar style={ { height: 40, width: 40 } } hash={ hash } />
            </Pane>
        )}
        <Text flexGrow={ 1 } color={ disabled ? '#7b7b7b' : '#fff' } fontSize='1em'>
            {title}
        </Text>
        <Pane>
            <Text color={ disabled ? '#7b7b7b' : '#36d6ae' } fontSize='0.7em'>
                {address}
            </Text>
            <Text color='#7b7b7b' fontSize='0.8em'>
                {version}
            </Text>

            {ipfsStatus && (
                <Pill
                  height={ 8 }
                  width={ 8 }
                  borderRadius='50%'
                  paddingX={ 0 }
                  isSolid
                    // marginLeft={ 20 }
                    // marginRight={ 25 }
                  color={
                        ipfsStatus == 'local' ? 'green' : ipfsStatus == 'fail' ? 'red' : 'yellow'
                    }
                />
            )}
        </Pane>
    </Pane>
);

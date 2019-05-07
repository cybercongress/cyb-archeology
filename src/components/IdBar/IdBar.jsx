import React from 'react';
import './IdBar.css';
import {
    Pane, TextEv as Text, Tooltip, Button,
} from '@cybercongress/ui';
import CybLink from '../CybLink';

const IdBarComponent = ({ children }) => <div className='id_bar'>{children}</div>;

export const NotificationLink = ({ notificationLinkCounter }) => (
    <CybLink dura='txq.cyb' className='id_bar__txq'>
        <span>{notificationLinkCounter !== 0 ? notificationLinkCounter : ''}</span>
    </CybLink>
);

export const SettingsLink = () => (
    <CybLink dura='settings.cyb' className='id_bar__settings'>
        Settings
    </CybLink>
);

export const WalletLink = () => (
    <CybLink dura='wallet.cyb' className='id_bar__wallet'>
        Wallet
    </CybLink>
);

const Identity = ({
    title, description, dura, btnClass,
}) => (
    <CybLink dura={ dura }>
        <Tooltip
          position='bottom'
          content={ (
              <Pane
                paddingX={ 10 }
                paddingY={ 10 }
                display='flex'
                flexDirection='column'
                alignItems='center'
                width={ 200 }
                borderRadius={ 5 }
              >
                  <Pane
                    marginBottom={ 7 }
                    width='100%'
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                  >
                      <Text fontWeight='bold' color='#fff'>
                          {title}
                      </Text>
                  </Pane>
                  <Pane>
                      <Text color='#fff'>{description}</Text>
                  </Pane>
              </Pane>
) }
        >
            <Button className={ `${btnClass} btn-group` } />
        </Tooltip>
    </CybLink>
);

const UserCard = ({ ...props }) => (
    <Pane { ...props } width='100%' flexShrink={ 0 } display='flex' justifyContent='center'>
        <Pane
          display='flex'
          alignItems='center'
          justifyContent='space-evenly'
          width='inherit'
          paddingX={ 20 }
        >
            <Identity
              dura='rr.cyb'
              title='Root'
              description='Base for growth'
              btnClass='btn-group-root'
            />
            <Identity
              dura='wallet.cyb'
              title='Body'
              description='Created identity'
              btnClass='btn-group-body'
            />
            <Identity
              title='Oracle'
              description='Advanced communication'
              btnClass='btn-group-oracul'
              dura='settings.cyb'
            />
        </Pane>
    </Pane>
);

export const WaleetAppMenu = ({ ethBalance, cybBalance, ...props }) => (
    <Pane { ...props } flexDirection='column' alignItems='flex-start' display='flex' flexShrink={ 0 }>
        <Pane marginBottom={ 20 } display='flex' alignItems='center'>
            <Pane marginRight={ 13 }>
                <Text color='#fff' fontSize='24px'>
                    {ethBalance}
                    {' '}
ETH
                </Text>
            </Pane>
        </Pane>

        <Tooltip
          position='left'
          content={ (
              <Pane paddingY={ 16 } paddingX={ 16 }>
                  <Text lineHeight={ 1.33 } fontSize='12px' color='#fff'>
                      {cybBalance}
                      {' '}
explanation of number scales
                  </Text>
              </Pane>
) }
        >
            <Pane display='flex' alignItems='center'>
                <Pane marginRight={ 13 }>
                    <Text color='#fff' fontSize='24px'>
                        {cybBalance}
                        {' '}
GCYB
                    </Text>
                </Pane>
            </Pane>
        </Tooltip>
    </Pane>
);

const ItemsTimeline = ({ item, index, ...props }) => (
    <Pane
      display='flex'
      paddingY={ 10 }
      alignItems='center'
      className='bookmarks__item activeTL'
      key={ item.rootDura }
      style={ { direction: 'ltr' } }
    >
        <Pane
          display='flex'
          width='100%'
          paddingLeft={ 20 }
          paddingRight={ 20 }
          justifyContent='flex-start'
          alignItems='center'
          overflow='hidden'
        >
            <Pane alignItems='flex-start' width='inherit' flexDirection='column' display='flex'>
                <Pane alignItems='center' width='inherit' display='flex'>
                    {item.address ? (
                        <Pane width='inherit' alignItems='center' display='flex'>
                            <CybLink
                              { ...props }
                              style={ { textOverflow: 'ellipsis', overflow: 'hidden' } }
                              dura={ item.dura }
                            >
                                {item.address}
                            </CybLink>
                        </Pane>
                    ) : (
                        <Pane alignItems='center' display='flex'>
                            <CybLink { ...props } dura={ item.dura }>
                                {item.dura}
                            </CybLink>
                        </Pane>
                    )}
                </Pane>
            </Pane>
        </Pane>
    </Pane>
);

export const BookmarksTimeline = ({ items, ...props }) => (
    <div style={ { direction: 'rtl' } } className='bookmarks'>
        {items.map((item, index) => (
            <ItemsTimeline { ...props } key={ index } item={ item } />
        ))}
    </div>
);

export const CurrentUser = (props) => {
    const {
        defaultEthAccount,
        open,
        toggle,
        favoriteClick,
        ethBalance,
        cybBalance,
        menuItems,
    } = props;

    return (
        <div className='user_popup__container'>
            {defaultEthAccount ? (
                <Pane display='flex' alignItems='center'>
                    <Text marginX={ 10 } color='#fff' fontSize='1em'>
                        User
                    </Text>
                    <img
                      alt='user'
                      className='id_bar__user'
                      onClick={ toggle }
                      src={ `https://robohash.org/${defaultEthAccount}` }
                    />
                </Pane>
            ) : (
                <CybLink dura='wallet.cyb'>
                    <div className='id_bar__user id_bar__user__default ' onClick={ toggle } />
                </CybLink>
            )}
            {defaultEthAccount && (
                <div className={ `user_popup ${open ? 'user_popup__open' : ''}` }>
                    <WaleetAppMenu
                      marginBottom={ 46 }
                      ethBalance={ ethBalance }
                      cybBalance={ cybBalance }
                    />
                    <UserCard className='opacityItems' />
                    <BookmarksTimeline items={ menuItems } />
                    <Pane
                      width='100%'
                      paddingBottom={ 30 }
                      paddingTop={ 10 }
                      display='flex'
                      justifyContent='center'
                      alignItems='center'
                      className='opacityItemsBefore'
                      flexDirection='column'
                    />
                </div>
            )}
        </div>
    );
};

export default IdBarComponent;

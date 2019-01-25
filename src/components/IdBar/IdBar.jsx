import React from 'react';
import './IdBar.css';
import cx from 'classnames';
import CybLink from '../CybLink';

const IdBarComponent = ({ children, loggedIn }) => {
    const className = cx('id-bar', {
        'id-bar__logged-in': loggedIn,
        'id-bar__logged-out': !loggedIn,
    });

    return (
        <div className={ className }>
            {children}
        </div>
    );
};

export const SettingsLink = () => (
    <CybLink dura='settings.cyb' className='id-bar__settings'>Settings</CybLink>
);

export const WalletLink = () => (
    <CybLink dura='wallet.cyb' className='id-bar__wallet'>Wallet</CybLink>
);

export const CurrentUser = (props) => {
    const {
        defaultEthAccount,
        open,
        toggle,
        favoriteClick,
        ethBalance,
        cybBalance,
    } = props;

    return (
        <div className='user-popup__container'>
            {defaultEthAccount ? (
                <img
                  alt='user'
                  className='id-bar__user'
                  onClick={ toggle }
                  src={ `https://robohash.org/${defaultEthAccount}` }
                />
            ) : (
                <CybLink dura='wallet.cyb'>
                    <div
                      className='id-bar__user id-bar__user--default '
                      onClick={ toggle }
                    />
                </CybLink>
            )}
            {defaultEthAccount && (
                <div className={ `user-popup ${open ? 'user-popup--open' : ''}` }>
                    <div>
                        Username
                    </div>
                    <div className='id-bar-img-container'>
                        <img
                          alt='user'
                          className='id-bar__user id-bar__user--big'
                          src={ `https://robohash.org/${defaultEthAccount}` }
                        />
                    </div>
                    <div>
                        <span className='tokenName'>
                            {ethBalance}
                            {' '}
                            ETH
                        </span>
                    </div>
                    <hr className='separator' />
                    <div>
                        <span className='tokenName'>
                            {cybBalance}
                            {' '}
                            CYB
                        </span>
                    </div>
                    <div className='id-bar-link-container'>
                        <WalletLink />
                        <CybLink dura='history.cyb' className='id-bar__history'>history</CybLink>
                        <a
                          className='id-bar__favorite'
                          href='/'
                          onClick={ favoriteClick }
                        >
                        favorite
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IdBarComponent;

import React from 'react';
import CybLink from '../CybLink';
import './AppMenu.css';

const Logo = props => (
    <CybLink { ...props } className='logo'>logo</CybLink>
);

export const LogoLink = ({ onClick }) => (
    <div className='menu-logo'>
        <Logo dura='' onClick={ onClick } />
    </div>
);

export const AppStoreLink = () => (
    <CybLink dura='apps.cyb' className='app-store-link'>
        App Store
    </CybLink>
);

const Items = ({ item, deleteAppFromMenu }) => (
    <span className='bookmarks__item' key={ item.rootDura }>
        <CybLink dura={ item.rootDura }>
            {item.name}
        </CybLink>
        <button
          type='button'
          className='bookmarks__remove-btn'
          onClick={ () => deleteAppFromMenu(item.rootDura) }
        >
        &#128465;
        </button>
    </span>
);

export const Bookmarks = ({ items, deleteMenuItem }) => (
    <div className='bookmarks'>
        {items.map(item => (
            <Items
              key={ item.rootDura }
              item={ item }
              deleteAppFromMenu={ deleteMenuItem }
            />
        ))}
    </div>
);

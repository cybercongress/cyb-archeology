import React from 'react';
import CybLink from '../CybLink';
import Logo from '../Logo/Logo';
import './AppMenu.css';


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


export const ReportLinkContainer = ({ children }) => (
    <div className='ReportLinkContainer'>
        {children}
    </div>
);

const MenuContainer = ({ children, openMenu }) => (
    <div className={ `menuContainer ${!openMenu ? 'menuContainer--hide' : ''}` }>
        {children}
    </div>
);


export const AddMenuItem = ({ children }) => (
    <span className='AddMenuItem'>
        {children}
    </span>
);

export const AddMenuItemApprove = ({ onClick }) => (
    <button
      type='button'
      onClick={ onClick }
      className='AddMenuItem__approve'
    >
    &#10006;
    </button>
);

export const AddMenuItemReject = ({ onClick }) => (
    <button
      type='button'
      onClick={ onClick }
      className='AddMenuItem__reject'
    >
    &#10004;
    </button>
);

export default MenuContainer;

import React, {Component} from 'react';
import CybLink from "../../components/CybLink";
import Logo from './../Logo/Logo';

import './AppMenu.css';


export const LogoLink = () => (
	<div className='menu-logo'>
		<Logo dura=''  />
	</div>
)

export const AppStoreLink = () => (
	<CybLink dura='apps.cyb' className='app-store-link'>
		App Store
	</CybLink>
);

const Items = ({ item, deleteAppFromMenu }) => (
	<span className='bookmarks__item' key={item.rootDura}>
        <CybLink dura={item.rootDura}>
            {item.name}
        </CybLink>
        <div className='bookmarks__remove-btn' onClick={() => deleteAppFromMenu(item.rootDura)}>&#128465;</div>
    </span>
)

export const Bookmarks = ({ items, deleteMenuItem }) => (
	<div className='bookmarks'>
		{items.map(item => (
			<Items key={item.rootDura}
			  item={item}
			  deleteAppFromMenu={deleteMenuItem}
			/>
		))}
	</div>
);


const MenuContainer = ({ children, openMenu }) => (
	<div className={`menuContainer ${!openMenu ? 'menuContainer--hide' : ''}`}>
		{children}
	</div>
);


export const AddMenuItem = ({ children }) => (
	<span className='AddMenuItem'>
		{children}
	</span>
);

export const AddMenuItemApprove = ({ onClick }) => (
	<button onClick={onClick} className='AddMenuItem__approve'>&#10006;</button>
);

export const AddMenuItemReject = ({ onClick }) => (
	<button onClick={onClick} className='AddMenuItem__reject'>&#10004;</button>
);

export default MenuContainer;

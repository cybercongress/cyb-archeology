import React from 'react';

import './Navigation.css';


const Navigation = ({ children, isHome }) => (
	<div className={`navigation ${isHome ? 'navigation--hide-lr' : ''}`}>
		{children}
	</div>
)


export const NavigationLeft = ({ children }) => (
	<div className='navigation__left'>
		{children}
	</div>
);

export const NavigationRight = ({ children }) => (
	<div className='navigation__right'>
		{children}
	</div>
);

export const NavigationCenter = ({ children }) => (
	<div className='navigation__center'>
		{children}
	</div>
);

export const MenuButton = (props) => (
	<button {...props} className='MenuButton'>
		<span className='MenuButton_line1' />
		<span className='MenuButton_line2' />
		<span className='MenuButton_line3' />
	</button>
);

export default Navigation;
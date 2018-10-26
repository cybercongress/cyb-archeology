import React from 'react';

import './AccountCard.css';

const AccountCard = (props) => (
	<div {...props} className='account-card'/>
);

export const AccountCardLeft = (props) => (
	<div {...props} className='account-card__left'/>
);

export const AccountCardRight = (props) => (
	<div {...props} className='account-card__right'/>
);


export const AccountCardContent = (props) => (
	<div {...props} className='account-card__content'/>
);

export const AccountCardContentItem = (props) => (
	<div {...props} className='account-card__content-item'/>
);

export const MainIndecator = (props) => (
	<div {...props} className='account-card__main-indecator'>main</div>
);

export const SelectButton = (props) => (
	<button {...props} className='account-card__select-btn' />
);

export const CreateButtonContainer = (props) => (
	<div {...props} className='account-card__create-button-container'/>
);


export default AccountCard;
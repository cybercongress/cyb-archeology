import React from 'react';

import './SearchInput.css';
import style from './FavoriteButton.less';

const SearchInput = ({ inputRef, ...props }) => (
    <input { ...props } ref={ inputRef } className='SearchInput' />
);


export const BackButton = props => (
    <button { ...props } className='BackButton' />
);

export const ForwardButton = props => (
    <button { ...props } className='ForwardButton' />
);

export const NavigationContainer = ({ children }) => (
    <div className='NavigationContainer'>
        {children}
    </div>
);


export const FavoriteButtonContainer = ({ children }) => (
    <div className={style.container}>
        {children}
    </div>
);

export const FavoriteButton = ({ isFavorited, ...props }) => {
    const className = `${style.button} ${isFavorited ? style.buttonFavorite : ''}`;
    return (
        <div className={ className } {...props}>

        </div>
    );
}

export default SearchInput;

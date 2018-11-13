import React from 'react';

import './SearchInput.css';

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

export default SearchInput;

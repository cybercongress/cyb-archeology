import React from 'react';

import './SearchInput.css';

const SearchInput = ({ inputRef, ...props }) => (
	<input {...props} ref={inputRef} className='SearchInput'/>
);


export default SearchInput;
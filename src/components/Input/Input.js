import React from 'react';

import './Input.css';

const Input = ({ inputRef, ...props }) => (
	<input ref={inputRef} {...props} className='input' />
)

export default Input;
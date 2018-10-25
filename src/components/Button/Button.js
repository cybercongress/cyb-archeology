import React from 'react';

import CybLink from '../CybLink';

import './Button.css';

const Button = ({ dura, ...props }) => {
	if (dura) {
		return (
			<CybLink {...props} dura={dura} className='button' />
		);
	}

	return (
		<button {...props} className='button' />
	);
}

export default Button;
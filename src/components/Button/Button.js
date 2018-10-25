import React from 'react';

import CybLink from '../CybLink';

import './Button.css';

const Button = ({ dura, color, ...props }) => {
	let css = 'button';
	if (color === 'green') css += ' button--green';
	if (color === 'turquoise') css += ' button--turquoise';


	if (dura) {
		return (
			<CybLink {...props} dura={dura} className={css} />
		);
	}

	return (
		<button {...props} className={css} />
	);
}

export default Button;
import React from 'react';

import './Indecator.css';

const Indecator = ({ status, children  }) => {
	const style = {
		background: '#fff'
	}

	if (status) {
		style['background'] = status === 'fail' ? '#d0021b' : status === 'local' ? '#7ed321' : '#f8e71c';
	}
	return (
		<span style={style} className='indecator' >{children}</span>
	);
}

export const StatusContainer = ({ children }) => (
	<div className='StatusContainer'>
		{children}
	</div>
);

export default Indecator;
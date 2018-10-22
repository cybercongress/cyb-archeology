import React from 'react';

import './Indecator.css';

const Indecator = ({ status }) => {
	const style = {
		background: '#fff'
	}

	if (status) {
		style['background'] = status === 'fail' ? 'red' : status === 'local' ? 'green' : 'yellow';
	}
	return (
		<span style={style} className='indecator' >{status || 'pending'}</span>
	);
}

export default Indecator;
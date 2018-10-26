import React from 'react';

const Vitalick = ({ style }) => (
	<img 
	  src={require('./buterin-02.svg')}
	  alt='vitalick'
	  style={{ width: 237, ...style }}
	/>
);

export default Vitalick;
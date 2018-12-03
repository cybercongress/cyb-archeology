import React from 'react';

import './RootRegistry.css';

const RootRegistry = props => (
	<div className='RootRegistry__container'>
	    <div { ...props } className='RootRegistry' />
    </div>
);

export const Table = props => (
    <table { ...props } className='rr__table' />
);

export default RootRegistry;

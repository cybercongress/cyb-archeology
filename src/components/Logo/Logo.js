import React from 'react';

import CybLink from '../CybLink';

import './Logo.css';

const Logo = (props) => (
	<CybLink {...props} className='logo' onClick={props.onClick} >logo</CybLink>
)


export default Logo;
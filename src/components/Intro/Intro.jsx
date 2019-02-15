import React from 'react';

import style from './Intro.less';

export const Logo = () => (
	<img src={require('./logo.svg')} width={100}/>
)

export const Section = ({ children }) => (
	<div  className={style.section}>
		<div className={style.sectionInner}>
			{children}
		</div>
	</div>
);

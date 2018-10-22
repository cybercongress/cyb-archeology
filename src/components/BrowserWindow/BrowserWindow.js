import React from 'react';

import './BrowserWindow.css';

const BrowserWindow = ({ loading, refFn, ...props }) => (
	<webview 
	  {...props}
	  ref={refFn}
	  className={`browser__webview ${loading ? 'browser__webview--loading' : ''}`}
	/>
);

export const BrowserContainer = ({ children }) => (
	<div className='browser'>
		{children}
	</div>
);

export const Loading = ({ loading }) => (
	<div className={`browser__loading ${loading ? 'browser__loading--show' : ''}`}>
		<div className='browser__loading-inner'>
			loading ...
		</div>
	</div>
);

export default BrowserWindow;
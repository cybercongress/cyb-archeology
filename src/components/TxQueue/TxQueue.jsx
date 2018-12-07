import React from 'react';

import styles from './TxQueue.less';

export const Hash = ({ children }) => (
	<span className={styles.hash}>
		{children}
	</span>
);

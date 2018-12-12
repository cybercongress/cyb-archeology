import React from 'react';

import styles from './table.less';

const Table = props => (
    <table { ...props } className={ styles.table } />
);

export default Table;

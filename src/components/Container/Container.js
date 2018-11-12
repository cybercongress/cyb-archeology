import React from 'react';

const styles = require('./Container.less');

const Container = ({ children }) => (
    <div className={ styles.container }>
        {children}
    </div>
);

export default Container;

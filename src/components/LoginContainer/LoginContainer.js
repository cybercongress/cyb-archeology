import React from 'react';

const styles = require('./LoginContainer.less');

const LoginContainer = ({ ...props }) => (
    <div { ...props } className={styles.LoginContainer} />
);

export default LoginContainer;

import React from 'react';

import CybLink from '../CybLink';

import './Button.css';

const Button = ({
    dura, color, fullWidth, ...props
}) => {
    let css = 'button';

    if (color === 'green') { css += ' button--green'; }
    if (color === 'yellow') { css += ' button--yellow'; }
    if (color === 'turquoise') { css += ' button--turquoise'; }
    if (color === 'red') { css += ' button--red'; }
    if (fullWidth === true) { css += ' button--full-width'; }


    if (dura) {
        return (
            <CybLink { ...props } dura={ dura } className={ css } />
        );
    }

    return (
        <button { ...props } className={ css } />
    );
};

export default Button;

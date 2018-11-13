import React from 'react';

import './Titile.css';

const Titile = ({ inline, ...props }) => {
    let css = 'title';

    if (inline) {
        css += ' title-inline';
    }

    return <h2 { ...props } className={ css } />;
};


export default Titile;

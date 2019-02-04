import React from 'react';
//import { Link as LinkRouter } from 'react-router';
import CybLink from '../CybLink';
import './Home.css';

export const Item = ({ children, dura, ...props }) => (
    props.disabled ? (
        <span className='item' { ...props }>{children}</span>
    ) : (
        <CybLink dura={ dura } className='item' { ...props }>
            {children}
        </CybLink>
    )
);
// const Link = (props) => {
//     if (/^https?:\/\//.test(props.to)) {
//         return <a href={ props.to } { ...props } />;
//     }
//     return <LinkRouter { ...props } />;
// };




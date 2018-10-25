import React from 'react';
import './settings.css';

export const Container = ({children, isInline}) => {
    const className = isInline ? 'container__inline' : '';

    return <div className={className}>
        {children}
    </div>
};

const Block = ({children, ...props}) => {
    return <div {...props} className='block'>
        {children}
    </div>
};

export const BlockRow = ({children}) => {
    return <div className='block__row'>
        {children}
    </div>
};

export const RowItem = ({children, ...props}) => (
    <div className='block__row__item' {...props} >
        {children}
    </div>
);

export default Block

import React from 'react';
import './settings.css';

export const Container = ({ children, isInline }) => {
    const className = isInline ? 'container__inline' : '';

    return (
        <div className={ className }>
            {children}
        </div>
    );
};

const Block = ({ children, noMargin,  ...props }) => (
    <div { ...props } className={`block ${noMargin ? 'block--no-margin' : ''}`}>
        {children}
    </div>
);

export const BlockRow = ({ children }) => (
    <div className='block__row'>
        {children}
    </div>
);

export const Row = ({ children }) => (
    <div className='row'>
        {children}
    </div>
);

export const RowItem = ({ children, ...props }) => (
    <div className='block__row__item' { ...props }>
        {children}
    </div>
);

export default Block;

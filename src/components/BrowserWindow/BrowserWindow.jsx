import React from 'react';

import './BrowserWindow.css';
import Block, { BlockRow } from '../Settings/Block';

const BrowserWindow = ({ loading, refFn, ...props }) => (
    <webview
      { ...props }
      ref={ refFn }
      className={ `browser__webview ${loading ? 'browser__webview--loading' : ''}` }
    />
);

export const BrowserContainer = ({ children }) => (
    <div className='browser'>
        {children}
    </div>
);

export const Loading = ({ loading }) => (
    <div className={ `browser__loading ${loading ? 'browser__loading--show' : ''}` }>
        <Block>
            <BlockRow>
                <h2>Loading...</h2>
            </BlockRow>
        </Block>
    </div>
);

export default BrowserWindow;

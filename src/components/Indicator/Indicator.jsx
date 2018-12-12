import React from 'react';

import Tooltip from 'rc-tooltip';

import 'rc-tooltip/assets/bootstrap.css';

import './Indicator.css';

const Indicator = ({ status, children, tooltipContent }) => {
    const style = {
        background: '#e8a823',
    };

    if (status === 'local') {
        style.background = '#3fb990';
    }

    if (status === 'fail') {
        style.background = '#d32f2f';
    }

    return (
        <Tooltip
          placement='topLeft'
          trigger={ ['hover'] }
          overlay={ tooltipContent }
        >
            <span style={ style } className='indicator'>{children}</span>
        </Tooltip>
    );
};

export const SettingsIndicator = ({ status }) => {
    const style = {
        background: '#fff',
    };

    if (status) {
        style.background = status === 'fail' ? '#d32f2f' : status === 'local' ? '#3fb990' : '#e8a823';
    }

    let placeholder;

    switch (status) {
    case 'local': {
        placeholder = 'Local';
        break;
    }
    case 'remote': {
        placeholder = 'Remote';
        break;
    }
    case 'fail': {
        placeholder = 'No connection';
        break;
    }
    default: {
        placeholder = 'Unknown';
    }
    }

    return (
        <span style={ style } className='settings-indicator'>{placeholder}</span>
    );
};

export const StatusContainer = ({ children }) => (
    <div className='StatusContainer'>
        {children}
    </div>
);

export default Indicator;

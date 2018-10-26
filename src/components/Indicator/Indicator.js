import React from 'react';

import './Indicator.css';

const Indicator = ({status, children}) => {

    const style = {
        background: '#fff'
    };

    if (status) {
        style['background'] = status === 'fail' ? '#d0021b' : status === 'local' ? '#7ed321' : '#f8e71c';
    }

    return (
        <span style={style} className='indicator'>{children}</span>
    )
};

export const SettingsIndicator = ({status}) => {
    const style = {
        background: '#fff'
    };

    if (status) {
        style['background'] = status === 'fail' ? '#d0021b' : status === 'local' ? '#7ed321' : '#f8e71c';
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
            placeholder = 'Unknown'
        }
    }

    return (
        <span style={style} className='settings-indicator'>{placeholder}</span>
    )
};

export const StatusContainer = ({children}) => (
    <div className='StatusContainer'>
        {children}
    </div>
);

export default Indicator;

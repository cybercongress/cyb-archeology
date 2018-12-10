import React from 'react';
import cx from 'classnames';

import './App.css';

export const AppHeader = ({ isHome, children, isMenuOpen }) => (
    <div
      className={ cx('app__header', {
        'app__header--open': isHome,
        'app__header--open-menu': isMenuOpen,
      }) }
    >
        <div className='app__header-container'>
            {children}
        </div>
    </div>
);

export const AppContent = ({ children }) => (
    <div className='app__content'>
        {children}
    </div>
);

const App = ({ children, openMenu }) => (
    <div className={ `app ${openMenu ? 'app--open-menu' : ''}` }>
        {children}
    </div>
);


export default App;

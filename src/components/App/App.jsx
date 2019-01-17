import React from 'react';
import cx from 'classnames';

import styles from './App.less';

const App = ({ children, openMenu }) => (
    <div className={ styles.app }>
        {children}
    </div>
);

// TODO: remove inner div fix navigation component
export const AppHeader = ({ isHome, children, isMenuOpen }) => (
    <div
      className={ cx(styles.appHeader, {
        [styles.appHeaderIsHome]: isHome,
      }) }
    >
        <div className={ styles.appHeaderInner }>
            {children}
        </div>
    </div>
);

export const AppContent = ({ children }) => (
    <div className={ styles.appContent }>
        {children}
    </div>
);

export const AppSideBar = ({ children, onCloseSidebar, openMenu }) => (
    <div className={ cx(styles.sideBar, { [styles.sideBarHide]: !openMenu }) }>
        <button
          type='button'
          onClick={ onCloseSidebar }
          className={ styles.closeButton }
        >
        close
        </button>
        {children}
    </div>
);


export default App;

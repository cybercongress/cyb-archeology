import React from 'react';
import {
    hashHistory, IndexRoute, Route, Router,
} from 'react-router';
import Application from './containers/Application/Application';
import RootRegistry from './RootRegistry';
import Settings from './Settings';
import Wallet from './containers/Wallet';
import NotFound from './NotFound';
import Browser from './Browser';
import Home from './containers/Home';
import AppStore from './containers/AppStore/AppStore';
import TransactionView from './containers/TransactionView/TransactionView';
import History from './containers/History/History';

const AppRouter = () => (
    <Router history={ hashHistory }>
        <Route path='/' component={ Application }>
            <Route path='/rootregistry' component={ RootRegistry } />
            <Route path='/settings' component={ Settings } />
            <Route path='/wallet' component={ Wallet } />
            <Route path='/eth/:txHash' component={ TransactionView } />
            <Route path='/appstore' component={ AppStore } />
            <Route path='/history' component={ History } />
            <Route path='/notfound' component={ NotFound } />
            <Route path='/browser' component={ Browser } />
            <IndexRoute component={ Home } />
            <Route path='*' exact component={ NotFound } />
        </Route>
    </Router>
);

export default AppRouter;

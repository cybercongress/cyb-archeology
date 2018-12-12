import React from 'react';
import {
    hashHistory, IndexRoute, Route, Router,
} from 'react-router';
import Application from './containers/Application/Application';
import RootRegistry from './containers/RootRegistry/RootRegistry';
import Settings from './containers/Settings/Settings';
import Wallet from './containers/Wallet';
import NotFound from './containers/NotFound/NotFound';
import Browser from './containers/Browser/Browser';
import Home from './containers/Home';
import TransactionView from './containers/TransactionView/TransactionView';
import History from './containers/History/History';
import TxQueue from './containers/TxQueue/TxQueue';

const AppRouter = () => (
    <Router history={ hashHistory }>
        <Route path='/' component={ Application }>
            <Route path='/rootregistry' component={ RootRegistry } />
            <Route path='/settings' component={ Settings } />
            <Route path='/wallet' component={ Wallet } />
            <Route path='/eth/:txHash' component={ TransactionView } />
            <Route path='/history' component={ History } />
            <Route path='/txq' component={ TxQueue } />
            <Route path='/notfound' component={ NotFound } />
            <Route path='/browser' component={ Browser } />
            <IndexRoute component={ Home } />
            <Route path='*' exact component={ NotFound } />
        </Route>
    </Router>
);

export default AppRouter;

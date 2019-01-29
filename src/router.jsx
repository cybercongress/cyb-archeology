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
import HelpHome from './containers/Help/HelpHome';
import Create from './containers/Help/Create';
import Deploy from './containers/Help/Deploy';
import Open from './containers/Help/Open';
import Ipfs from './containers/Help/Ipfs';
import HelpEth from './containers/Help/HelpEth';
import Favourites from './containers/Help/Favourites';
import Switch from './containers/Help/Switch';
import HelpLink from './containers/Help/HelpLink';
import HelpApp from './containers/Help/HelpApp';

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

            <Route path='/help' component={ HelpApp }>
                <Route path='/help/create' component={ Create } />
                <Route path='/help/deploy' component={ Deploy } />
                <Route path='/help/open' component={ Open } />
                <Route path='/help/ipfs' component={ Ipfs } />
                <Route path='/help/eth' component={ HelpEth } />
                <Route path='/help/favourites' component={ Favourites } />
                <Route path='/help/switch' component={ Switch } />
                <Route path='/help/link' component={ HelpLink } />

                <IndexRoute component={ HelpHome } />
            </Route>

            <IndexRoute component={ Home } />
            <Route path='*' exact component={ NotFound } />
        </Route>
    </Router>
);

export default AppRouter;

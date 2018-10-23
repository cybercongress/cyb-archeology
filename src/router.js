import React from "react";
import {hashHistory, IndexRoute, Route, Router} from "react-router";
import Application from "./Application";
import RootRegistry from "./RootRegistry";
import Settings from "./Settings";
import Wallet from "./containers/Wallet";
import NotFound from "./NotFound";
import Browser from "./Browser";
import Home from "./Home";
import AppStore from './containers/AppStore';

const AppRouter = () => (<Router history={hashHistory}>
    <Route path='/' component={Application}>
        <Route path='/rootregistry' component={RootRegistry}/>
        <Route path='/settings' component={Settings}/>
        <Route path='/wallet' component={Wallet}/>
        <Route path='/appstore' component={AppStore}/>
        <Route path='/notfound' component={NotFound}/>
        <Route path='/browser' component={Browser}/>
        <IndexRoute component={Home}/>
        <Route path='*' exact={true} component={NotFound}/>
    </Route>
</Router>);

export default AppRouter;

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {store, appStart} from './redux/store';
import AppRouter from "./router";

const styles = require("./index.css");

appStart(store).then(() => {
    ReactDOM.render(
	    <Provider store={store}>
	        <AppRouter/>
	    </Provider>
	    , document.getElementById('root'));
});

if (module.hot) {
	module.hot.accept();
}

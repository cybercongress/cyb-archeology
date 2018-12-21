import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store, appStart } from './redux/store';
import AppRouter from './router';

import './index.css';
import '@cybercongress/ui/lib/styles.css';

appStart(store).then(() => {
    ReactDOM.render(
        <Provider store={ store }>
            <AppRouter />
        </Provider>,
	     document.getElementById('root'),
    );
});

if (module.hot) {
    module.hot.accept();
}


import { updateStatusTransactions } from './redux/wallet';
import { setBadgeTextInc } from './components/IdBar/IdBar';

setInterval(() => {
	//const defaultAccount = store.getState().wallet.defaultAccount;
	const defaultAccount = localStorage.getItem('defaultEthAccount') || '';
	console.log('updateStatusTransactions', 'defaultAccount', defaultAccount);
	if (defaultAccount) {
		updateStatusTransactions(defaultAccount);
		setBadgeTextInc();
	}
}, 5000);
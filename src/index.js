import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store, appStart } from './redux/store';
import AppRouter from './router';
import { checkPendingStatusTransactions, updateStatusTransactions } from './redux/wallet';

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


// store.dispatch(checkPendingStatusTransactions());

// setInterval(() => {
//     store.dispatch(updateStatusTransactions());
// }, 60000);

import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import getRoutes from './routes';

const store = configureStore();

ReactDOM.render(
    <Provider store={ store }>
        <Router history={ browserHistory }>{ getRoutes(store) }</Router>
    </Provider>,
    document.getElementById('App')
);

import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension';

import reducers from './reducers';

import './index.css';
import Posts from './containers/posts';

const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(thunk)
));

ReactDOM.render((
    <Provider store={store}>
        <Posts/>
    </Provider>
), document.getElementById('root'));

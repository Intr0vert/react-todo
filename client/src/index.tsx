import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import rootRedicer from './ducs';
import App from './App';
import thunk from 'redux-thunk';

const store = createStore(rootRedicer, applyMiddleware(thunk));

store.subscribe(() => render());

render();

function render() {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>
        , document.getElementById('root'));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
// serviceWorker.unregister();

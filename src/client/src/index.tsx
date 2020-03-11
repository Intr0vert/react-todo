import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {counter} from './reduser/reducers';
import App from './App';

const store = createStore(counter);

store.subscribe(() => render());

render();

function render() {
    ReactDOM.render(
        <Provider store={store}>
            <>
                <h1>Counts: {store.getState()}</h1>
                <App />
            </>
        </Provider>
        , document.getElementById('root'));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
// serviceWorker.unregister();

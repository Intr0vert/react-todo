import React, {useState} from 'react';
import {createStore} from 'redux';

function counter(state = 10, action: any) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

let store = createStore(counter);

store.subscribe(() => console.log(store.getState()))

export default function App() {
  let [counter, counterChange] = useState(store.getState());

  function buttonhandler(type: string) {
    store.dispatch({type});
    counterChange(() => store.getState());
  }

  return (
    <>
      <h1>{counter}</h1>
      <button
        onClick={() => buttonhandler('INCREMENT')}>Increment</button>
      <button
        onClick={() => buttonhandler('DECREMENT')}>Decrement</button>
    </>
  );
}


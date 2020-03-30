import { combineReducers } from 'redux';
import todos from './todos';
import addTodo  from './form';
import { reducer as formReducer } from "redux-form";
const rootReducer = combineReducers({
    todos,
    // addTodo,
    form: formReducer,
});
export default rootReducer;

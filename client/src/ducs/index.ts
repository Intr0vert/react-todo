import { combineReducers } from 'redux';
import todos from './todos';
import form from './form';

const rootReducer = combineReducers({
    todos,
    form
});
export default rootReducer;

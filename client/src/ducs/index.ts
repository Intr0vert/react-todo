import {combineReducers} from 'redux';
import preloaderReducer, 
    {
        FetchStarted,
        DataReceived,
        DataError
    } from './preloader';
import todoReducer, {
        AddTodo,
        UpdateCheckbox,
        UpdateTodo,
    } from './todo';

const rootReducer = combineReducers({todoReducer, preloaderReducer});
export default rootReducer;

const rootAction = {
    AddTodo,
    UpdateCheckbox,
    UpdateTodo,
    FetchStarted,
    DataReceived,
    DataError
};

export {rootAction};
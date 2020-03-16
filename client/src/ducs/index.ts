import {combineReducers} from 'redux';
import preloaderReducer from './preloader';
import todoReducer from './todo';

const rootReducer = combineReducers({todoReducer, preloaderReducer});
export default rootReducer;

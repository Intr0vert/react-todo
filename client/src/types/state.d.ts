import { TodoAction } from './todo';
import { FetchStatus } from './preloader';

export interface IState {
    todoReducer: TodoAction;
    preloaderReducer: FetchStatus;
}
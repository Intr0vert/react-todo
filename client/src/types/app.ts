// import { FormState } from './types/preloader';
import { Dispatch } from 'redux';
import { TodoState } from '../types/todos';

export interface IAppProps {
    dispatch: Dispatch;
    // preloader: FormState;
    todos: TodoState,
}
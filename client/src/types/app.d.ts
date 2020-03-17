import { FormState } from './types/preloader';
import { Todo } from './types/todo';
import { Dispatch } from 'redux';

export interface IApp {
    dispatch: Dispatch;
    preloader: FormState;
    todos: any;
    props?: any;
}
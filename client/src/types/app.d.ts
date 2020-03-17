import { FormState } from './types/preloader';
import { Todo } from './types/todo';
import { Dispatch } from 'redux';
import { Props } from 'react';

export interface IAppProps {
    dispatch: Dispatch;
    preloader: FormState;
    todos: Array<Todo>;
}
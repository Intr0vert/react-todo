import { Action } from 'redux';

import { 
    ADD_TODO,
    DELETE_TODO,
    CHANGE_CHECKBOX,
    FETCH_STARTED,
    DATA_RECEIVED,
    DATA_ERROR,
    SORT_CHANGE,
} from '../ducs/todos';

export interface Todo {
    _id: string;
    title: string;
    description?: string;
    isDone: boolean;
}

export interface TodoState {
    data: Todo[];
    isLoading: boolean;
    error: string|null;
    showAll: boolean;
}

export interface FetchAction {
    isLoading: boolean,
    error: string|null,
}

export interface AbstractAction<TType, TPayload> extends Action<TType> {
    payload: TPayload;
}

export interface CheckboxChange {
    _id: string,
    isDone: boolean;
}

export type AddTodoAction = AbstractAction<typeof ADD_TODO, Todo[]>;
export type DeleteTodoAction = AbstractAction<typeof DELETE_TODO, string>;
export type ChangeCheckboxTodoAction = AbstractAction<typeof CHANGE_CHECKBOX, CheckboxChange>;
export type FetchStartedTodoAction = AbstractAction<typeof FETCH_STARTED, FetchAction>;
export type DataReceiveTodoAction = AbstractAction<typeof DATA_RECEIVED, FetchAction>;
export type DataErrorTodoAction = AbstractAction<typeof DATA_ERROR, FetchAction>;
export type SortChangeTodoAction = AbstractAction<typeof SORT_CHANGE, null>;

export type TodoAction = AddTodoAction | 
    DeleteTodoAction | 
    ChangeCheckboxTodoAction |
    FetchStartedTodoAction |
    DataErrorTodoAction |
    DataReceiveTodoAction |
    SortChangeTodoAction;
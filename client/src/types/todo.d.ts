import { Action } from 'redux'
import {
    ADD_TODO,
    UPDATE_TODO,
    UPDATE_CHECKBOX
} from '../ducs/todo';

export interface AbstractAction<TType, TPayload> extends Action<TType> {
    payload: TPayload;
}

export interface Todo {
    _id: string;
    title: string;
    description: string;
    isDone: boolean;
}

type AddAction = AbstractAction<typeof ADD_TODO, Todo>;
type UpdateAction = AbstractAction<typeof UPDATE_TODO, number>;
type UpdateCheckboxAction = AbstractAction<typeof UPDATE_CHECKBOX, string, boolean>;

export type TodoAction = AddAction | UpdateAction | UpdateCheckboxAction;

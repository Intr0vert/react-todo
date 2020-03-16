import { Action } from 'redux'

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

import { State } from '../types/state';
import { AddTodoAction, Todo, TodoAction } from '../types/todos';

export const FETCH_STARTED = "FETCH_STARTED";
export const DATA_RECEIVED = "DATA_RECEIVED";
export const DATA_ERROR = "DATA_ERROR";
export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const CHANGE_CHECKBOX = "CHANGE_CHECKBOX";

const FetchStarted = (): any => ({
    type: FETCH_STARTED,
    payload: {
        isLoading: true,
        error: null,
    }
});

const DataReceived = (): any => ({
    type: DATA_RECEIVED,
    payload: {
        isLoading: false,
        error: null,
    }
});

const DataError = (error: string): any => ({
    type: DATA_ERROR,
    payload: {
        isLoading: false,
        error
    }
});

const AddTodo = (todo: Todo): AddTodoAction => ({
    type: ADD_TODO,
    payload: todo
});

const initialState = {
    todos: {
        data: [],
        isLoading: false,
        error: false,
        showAll: true,
    }
}

export default function todos(state: State = initialState, action: TodoAction) {
    switch(action.type) {
        case FETCH_STARTED:
            return {
                todos: {
                    data: state.todos.data,
                    isLoading: action.payload.isLoading,
                    error: state.todos.error,
                    showAll: state.todos.showAll,
                }
            };
        case DATA_RECEIVED:
            return {
                todos: {
                    data: state.todos.data,
                    isLoading: action.payload.isLoading,
                    error: state.todos.error,
                    showAll: state.todos.showAll,
                }
            };
        case DATA_ERROR:
            return {
                todos: {
                    data: state.todos.data,
                    isLoading: action.payload.isLoading,
                    error: state.todos.error,
                    showAll: state.todos.showAll,
                }
            };
        case ADD_TODO:
            return {
                todos: {
                    data: [...state.todos.data, action.payload],
                    isLoading: state.todos.isLoading,
                    error: state.todos.error,
                    showAll: state.todos.showAll,
                }
            }
        default:
            return state;
    }
}

export {
    AddTodo,
    FetchStarted,
    DataReceived,
    DataError
}
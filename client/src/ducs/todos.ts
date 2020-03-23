import { TodoState } from '../types/todos';
import {
    AddTodoAction, 
    Todo, 
    TodoAction, 
    SortChangeTodoAction
} from '../types/todos';

export const FETCH_STARTED = "FETCH_STARTED";
export const DATA_RECEIVED = "DATA_RECEIVED";
export const DATA_ERROR = "DATA_ERROR";
export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const CHANGE_CHECKBOX = "CHANGE_CHECKBOX";
export const SORT_CHANGE = "SORT_CHANGE";

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

const SortChange = (): SortChangeTodoAction => ({
    type: SORT_CHANGE,
    payload: null
});

const initialState = {
    data: [],
    isLoading: false,
    error: false,
    showAll: true,
}

export default function todos(state: TodoState = initialState, action: TodoAction) {
    switch(action.type) {
        case SORT_CHANGE: 
            return {
                data: state.data,
                isLoading: state.isLoading,
                error: state.error,
                showAll: !state.showAll,
            };
        case FETCH_STARTED:
            return {
                data: state.data,
                isLoading: action.payload.isLoading,
                error: state.error,
                showAll: state.showAll,
            };
        case DATA_RECEIVED:
            return {
                data: state.data,
                isLoading: action.payload.isLoading,
                error: state.error,
                showAll: state.showAll,
            };
        case DATA_ERROR:
            return {
                data: state.data,
                isLoading: action.payload.isLoading,
                error: state.error,
                showAll: state.showAll,
            };
        case ADD_TODO:
            console.log(action);
            return {
                data: [...state.data, action.payload],
                isLoading: state.isLoading,
                error: state.error,
                showAll: state.showAll,
            }
        default:
            return state;
    }
}

export {
    AddTodo,
    FetchStarted,
    DataReceived,
    DataError,
    SortChange
}
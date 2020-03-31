import { TodoState, UpdateTodosAction } from '../types/todos';
import {
  AddTodoAction,
  Todo,
  TodoAction,
  SortChangeTodoAction,
  DeleteTodoAction,
  FetchStartedTodoAction,
  DataReceiveTodoAction,
  DataErrorTodoAction,
  ChangeCheckboxTodoAction,
} from "../types/todos";

export const FETCH_STARTED = "FETCH_STARTED";
export const DATA_RECEIVED = "DATA_RECEIVED";
export const DATA_ERROR = "DATA_ERROR";
export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const CHANGE_CHECKBOX = "CHANGE_CHECKBOX";
export const SORT_CHANGE = "SORT_CHANGE";
export const UPDATE_TODO = "UPDATE_TODO";

const FetchStarted = (): FetchStartedTodoAction => ({
    type: FETCH_STARTED,
    payload: {
        isLoading: true,
        error: null,
    }
});

const DataReceived = (): DataReceiveTodoAction => ({
    type: DATA_RECEIVED,
    payload: {
        isLoading: false,
        error: null,
    }
});

const DataError = (error: string): DataErrorTodoAction => ({
    type: DATA_ERROR,
    payload: {
        isLoading: false,
        error
    }
});

const AddTodo = (...todos: Todo[]): AddTodoAction => ({
    type: ADD_TODO,
    payload: todos
});

const DeleteTodo = (_id: string): DeleteTodoAction => ({
    type: DELETE_TODO,
    payload: _id
});

const UpdateCheckbox = (_id: string, isDone: boolean): ChangeCheckboxTodoAction => ({
    type: CHANGE_CHECKBOX,
    payload: {
        _id,
        isDone
    }
});

const SortChange = (): SortChangeTodoAction => ({
    type: SORT_CHANGE,
    payload: null
});

const UpdateTodos = (...todos: Todo[]): UpdateTodosAction => ({
    type: UPDATE_TODO,
    payload: todos
});

const initialState = {
    data: [],
    isLoading: false,
    error: null,
    showAll: true,
}

export default function todos(state: TodoState = initialState, action: TodoAction) {
    switch(action.type) {
        case SORT_CHANGE: 
            return {
                ...state,
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
                error: null,
                showAll: state.showAll,
            };
        case DATA_ERROR:
            return {
                data: state.data,
                isLoading: action.payload.isLoading,
                error: action.payload.error,
                showAll: state.showAll,
            }; 
        case ADD_TODO:
            return {
                data: [...state.data, ...action.payload],
                isLoading: state.isLoading,
                error: state.error,
                showAll: state.showAll,
            }
        case UPDATE_TODO:
            return {
                data: [...action.payload],
                isLoading: state.isLoading,
                error: state.error,
                showAll: state.showAll,
            }
        case DELETE_TODO:
            return {
                data: [...state.data.filter((el) => el._id !== action.payload)],
                isLoading: state.isLoading,
                error: state.error,
                showAll: state.showAll
            };
        case CHANGE_CHECKBOX:
            return {
                data: [...state.data.map(el => el._id === action.payload._id ?
                    { ...el, isDone: action.payload.isDone } : el)],
                isLoading: state.isLoading,
                error: state.error,
                showAll: state.showAll
            };
        default:
            return state;
    }
}

export {
    AddTodo,
    DeleteTodo,
    UpdateCheckbox,
    FetchStarted,
    DataReceived,
    DataError,
    SortChange,
    UpdateTodos,
}
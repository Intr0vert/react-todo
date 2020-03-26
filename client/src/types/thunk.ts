import { DELETE_TODO, ADD_TODO, DATA_RECEIVED, DATA_ERROR, FETCH_STARTED, CHANGE_CHECKBOX, SORT_CHANGE } from "../ducs/todos";
import { TodoState } from "./todos";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";

type GetDataType = 
    typeof DATA_RECEIVED |
    typeof DATA_ERROR |
    typeof FETCH_STARTED;

export type CheckboxHandlerAction = typeof CHANGE_CHECKBOX | GetDataType;

export type GetTodoDataAction = typeof ADD_TODO | GetDataType;


export type DeleteTaskAction = typeof DELETE_TODO | GetDataType;
    
export type AddTaskAction = typeof ADD_TODO | GetDataType;

export type SortAction = typeof SORT_CHANGE;

export type ThunkRootAction = 
    CheckboxHandlerAction |
    GetTodoDataAction |
    DeleteTaskAction |
    AddTaskAction |
    SortAction;

export type CommonThunkDispatch<T = ThunkRootAction> = 
    ThunkDispatch<TodoState, unknown, Action<T>>;
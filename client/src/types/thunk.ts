import { DELETE_TODO, ADD_TODO, DATA_RECEIVED, DATA_ERROR, FETCH_STARTED, CHANGE_CHECKBOX, SORT_CHANGE } from "../ducs/todos";
import { TodoState } from "./todos";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { CHANGE_TITLE, CHANGE_DESCRIPTION, CHANGE_FIELDS_ERROR } from "../ducs/form";

type GetDataType = 
    typeof DATA_RECEIVED |
    typeof DATA_ERROR |
    typeof FETCH_STARTED;

export type CheckboxHandlerThunk = typeof CHANGE_CHECKBOX | GetDataType;

export type GetTodoDataThunk = typeof ADD_TODO | GetDataType;

export type DeleteTaskThunk = typeof DELETE_TODO | GetDataType;
    
export type AddTaskThunk = typeof ADD_TODO | GetDataType;

export type SortThunk = typeof SORT_CHANGE;

export type ChangeTitleThunk = typeof CHANGE_TITLE;

export type ChangeDescriptionThunk = typeof CHANGE_DESCRIPTION;

export type ChangeFieldsErrorThunk = typeof CHANGE_FIELDS_ERROR;

export type ThunkRootAction = 
    CheckboxHandlerThunk |
    GetTodoDataThunk |
    DeleteTaskThunk |
    AddTaskThunk |
    SortThunk |
    ChangeTitleThunk |
    ChangeDescriptionThunk |
    ChangeFieldsErrorThunk;

export type CommonThunkDispatch<T = ThunkRootAction> = 
    ThunkDispatch<TodoState, unknown, Action<T>>;
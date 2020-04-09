import {
  DELETE_TODO,
  ADD_TODO,
  DATA_RECEIVED,
  DATA_ERROR,
  FETCH_STARTED,
  CHANGE_CHECKBOX,
  SORT_CHANGE,
  UPDATE_TODO,
} from '../ducs/todos';
import { TodoState } from './todos';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

type GetDataType =
  | typeof DATA_RECEIVED
  | typeof DATA_ERROR
  | typeof FETCH_STARTED;

export type CheckboxHandlerThunk = typeof CHANGE_CHECKBOX | GetDataType;

export type GetTodoDataThunk = typeof ADD_TODO | GetDataType;

export type UpdateTodosDataThunk = typeof UPDATE_TODO | GetDataType;

export type DeleteTaskThunk = typeof DELETE_TODO | GetDataType;

export type AddTaskThunk = typeof ADD_TODO | GetDataType;

export type SortThunk = typeof SORT_CHANGE;

export type ThunkRootAction =
  | CheckboxHandlerThunk
  | GetTodoDataThunk
  | DeleteTaskThunk
  | AddTaskThunk
  | SortThunk;

export type CommonThunkDispatch<T = ThunkRootAction> = ThunkDispatch<
  TodoState,
  string,
  Action<T>
>;

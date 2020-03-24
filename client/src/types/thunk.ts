import { DELETE_TODO, ADD_TODO, DATA_RECEIVED, DATA_ERROR, FETCH_STARTED, CHANGE_CHECKBOX } from "../ducs/todos";

export type CheckboxHandlerAction = typeof CHANGE_CHECKBOX;

export type GetTodoDataAction =
    typeof ADD_TODO |
    typeof DATA_RECEIVED |
    typeof DATA_ERROR |
    typeof FETCH_STARTED;

export type DeleteTaskAction = typeof DELETE_TODO;

export type AddTaskAction = 
    typeof ADD_TODO |
    typeof DATA_RECEIVED |
    typeof DATA_ERROR |
    typeof FETCH_STARTED;

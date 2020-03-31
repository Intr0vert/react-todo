import {
    AddTodo,
    FetchStarted,
    DataReceived,
    DataError,
    UpdateCheckbox,
    DeleteTodo,
} from '../ducs/todos';
import {
    DeleteTaskThunk,
    GetTodoDataThunk,
    CheckboxHandlerThunk,
    AddTaskThunk,
    CommonThunkDispatch
} from '../types/thunk';
import fetchWrapper from './fetchWrapper';

export const checkboxHandler = function (_id: string, isDone: boolean) {
    return async (dispatch: CommonThunkDispatch<CheckboxHandlerThunk>) => {
        dispatch(FetchStarted());

        await fetchWrapper(dispatch, `http://localhost:8080/task/${_id}`, {
            method: 'PUT',
            body: JSON.stringify({isDone}),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        dispatch(UpdateCheckbox(_id, isDone));
        dispatch(DataReceived());
    }
}

export const getTodoData = () => {
    return async (dispatch: CommonThunkDispatch<GetTodoDataThunk>) => {
        dispatch(FetchStarted());
        const response: any = await fetchWrapper(dispatch, 'http://localhost:8080/tasks')
        dispatch(AddTodo(...await response.json()));
        dispatch(DataReceived());
    }
}

export const deleteTask = function (_id: string) {
    return async (dispatch: CommonThunkDispatch<DeleteTaskThunk>) => {
        dispatch(FetchStarted());
        
        await fetchWrapper(dispatch, `http://localhost:8080/task/${_id}`, {
            method: 'DELETE',
        })
        dispatch(DeleteTodo(_id));
        dispatch(DataReceived());
    }
}

export const addTask = function(
        title: string,
        description: string
    ) {
    return async (dispatch: CommonThunkDispatch<AddTaskThunk>) => {
        dispatch(FetchStarted());

        const response: any = await fetchWrapper(dispatch, `http://localhost:8080/task`, {
            method: 'POST',
            body: JSON.stringify({
                title,
                description,
                isDone: false
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        dispatch(
            AddTodo({
                _id: await response.json(),
                title,
                description,
                isDone: false
        }));
        dispatch(DataReceived());
    }
}
import {
    AddTodo,
    FetchStarted,
    DataReceived,
    DataError,
    UpdateCheckbox,
    DeleteTodo,
} from '../ducs/todos';
import { Todo } from '../types/todos';
import {
    DeleteTaskThunk,
    GetTodoDataThunk,
    CheckboxHandlerThunk,
    AddTaskThunk,
    CommonThunkDispatch
} from '../types/thunk';

export const checkboxHandler = function (_id: string, isDone: boolean) {
    return (dispatch: CommonThunkDispatch<CheckboxHandlerThunk>) => {
        dispatch(FetchStarted());

        return fetch(`http://localhost:8080/task/${_id}`, {
            method: 'PUT',
            body: JSON.stringify({isDone}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response: Response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            dispatch(UpdateCheckbox(_id, isDone));
        })
        .then(()=>{
            dispatch(DataReceived());
        })
        .catch((err) => {
            dispatch(DataError(err.toString()));
        });
    }
}

export const getTodoData = () => {
    return (dispatch: CommonThunkDispatch<GetTodoDataThunk>) => {
        dispatch(FetchStarted());
        return fetch('http://localhost:8080/tasks')
            .then((response: Response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                return response.json();
            })
            .then((todos: Array<Todo>) => {
                dispatch(AddTodo(...todos));
            })
            .then(()=>{
                // обертка над промисами чтобы было задержка
                dispatch(DataReceived());
            })
            .catch((err) => {
                dispatch(DataError(err.toString()));
            });
    }
}

export const deleteTask = function (_id: string) {
    return (dispatch: CommonThunkDispatch<DeleteTaskThunk>) => {
        dispatch(FetchStarted());
        
        return fetch(`http://localhost:8080/task/${_id}`, {
            method: 'DELETE',
        })
        .then((response: Response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            dispatch(DeleteTodo(_id));
        })
        .then(() => {
            dispatch(DataReceived());
        })
        .catch((err) => {
            dispatch(DataError(err.toString()));
        });
    }
}

export const addTask = function(
        title: string,
        description: string
    ) {
    return (dispatch: CommonThunkDispatch<AddTaskThunk>) => {
        return fetch(`http://localhost:8080/task`, {
            method: 'POST',
            body: JSON.stringify({
                title,
                description,
                isDone: false
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response: Response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            dispatch(FetchStarted());
            return response.json();
        })
        .then((_id)=>{
            dispatch(
                AddTodo({
                    _id,
                    title,
                    description,
                    isDone: false
            }));
        })
        .then(()=>{
            dispatch(DataReceived());
        })
        .catch((err)=> {
            dispatch(DataError(err.toString()));
        });
    }
}
import { Dispatch } from 'redux';
import {
    AddTodo,
    FetchStarted,
    DataReceived,
    DataError,
    UpdateCheckbox,
    DeleteTodo,
} from '../ducs/todos';
// import { getTodoDataThunk } from '../types/thunk';
import { Todo } from '../types/todos';

export const checkboxHandler = function(_id: string, isDone: boolean): any {
    return (dispatch: Dispatch):Promise<void> => {
        return fetch(`http://localhost:8080/task/${_id}`, {
            method: 'PUT',
            body: JSON.stringify({isDone}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(() => {
            dispatch(UpdateCheckbox(_id, isDone));
        });
    }
}

export const getTodoData = (): any => {
    return (dispatch: Dispatch):Promise<void> => {
        dispatch(FetchStarted());
        return fetch('http://localhost:8080/tasks')
            .then((response: Response) => response.json())
            .then((todos: Array<Todo>) => {
                dispatch(AddTodo(...todos));
            })
            .then(()=>{
                // обертка над промисами чтобы было задержка
                setTimeout(()=>dispatch(DataReceived()), 1000);
            })
            .catch((err)=>{
                dispatch(DataError(err));
            });
    }
}

export const deleteTask = function(_id: string) : any {
    return (dispatch: Dispatch):Promise<void> => {
            return fetch(`http://localhost:8080/task/${_id}`, {
            method: 'DELETE',
        })
        .then(() => {
            dispatch(DeleteTodo(_id));
        });
    }
}

export const addTask = function(
        title: string,
        description: string
    ) : any {
    return (dispatch: Dispatch):Promise<void> => {
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
        .then((task) => {
            dispatch(FetchStarted());
            return task.json();
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
        .catch(()=> {
            dispatch(DataError('Problem with adding tasks'));
        });
    }
}
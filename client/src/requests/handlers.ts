import { Dispatch } from 'redux';
import {
    FetchStarted,
    DataReceived,
    DataError
} from '../ducs/preloader';
import {
    AddTodo,
    UpdateCheckbox,
    UpdateTodo,
} from '../ducs/todo';
import { AppThunk } from '../types/thunk';

export const checkboxHandler = function(_id: string, isDone: boolean): Function {
    return (dispatch: Dispatch):Promise<any> => {
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

export const getTodoData = (): AppThunk => {
    return (dispatch: Dispatch):Promise<void> => {
        dispatch(FetchStarted());
        return fetch('http://localhost:8080/tasks')
            .then((response: any) => response.json())
            .then((todos: Array<any>) => {
                // for of
                for (let todo in todos) {
                    dispatch(AddTodo(todos[todo]));
                }
            })
            .then(()=>{
                // обертка над промисами чтобы было задержка
                setTimeout(()=>dispatch(DataReceived()), 0);
            })
            .catch((err)=>{
                dispatch(DataError(err));
            });
    }
}

export const deleteTask = function(_id: string) : Function {
    return (dispatch: Dispatch):Promise<void> => {
            return fetch(`http://localhost:8080/task/${_id}`, {
            method: 'DELETE',
        })
        .then(() => {
            dispatch(UpdateTodo(_id));
        });
    }
}

export const addTask = function(
        title: string,
        description: string
    ) : Function {
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
            // ???
            // Добавить прелоадер
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
        });
    }
}
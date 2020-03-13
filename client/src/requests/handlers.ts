import {rootAction} from '../ducs/index';

export const checkboxHandler = function(id: number, isDone: boolean): Function {
    return (dispatch: Function, state: Function):Promise<any> => {
        return fetch(`http://localhost:8080/task/${id}`, {
            method: 'PUT',
            body: JSON.stringify({isDone: !isDone}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(() => {
            dispatch(rootAction.UpdateCheckbox(id, !isDone));
        });
    }
}

export const getTodoData = (): Function => {
    return (dispatch: Function, state: Function):Promise<any> => {
        dispatch(rootAction.FetchStarted());
        return fetch('http://localhost:8080/tasks')
            .then((response: any) => response.json())
            .then((todos: Array<any>) => {
                for (let todo in todos) {
                    dispatch(rootAction.AddTodo(todos[todo]));
                }
            })
            .then(()=>{
                setTimeout(()=>dispatch(rootAction.DataReceived()), 0);
            })
            .catch((err)=>{
                dispatch(rootAction.DataError(err));
            });
    }
}

export const deleteTask = function(id: number) : Function {
    return (dispatch: Function, state: Function):Promise<any> => {
            return fetch(`http://localhost:8080/task/${id}`, {
            method: 'DELETE',
        })
        .then(() => {
            dispatch(rootAction.UpdateTodo(id));
        });
    }
}

export const addTask = function(
        title: string,
        description: string,
        isDone: boolean
    ) : Function {
    return (dispatch: Function, state: Function):Promise<any> => {
        return fetch(`http://localhost:8080/task`, {
            method: 'POST',
            body: JSON.stringify({
                title,
                description,
                isDone
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((task) => {
            return task.json();
        })
        .then((id)=>{
            dispatch(
                rootAction.AddTodo({
                    id,
                    title,
                    description,
                    isDone
            }));
        });
    }
}
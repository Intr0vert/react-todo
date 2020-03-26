import {
    AddTodo,
    FetchStarted,
    DataReceived,
    DataError,
    UpdateCheckbox,
    DeleteTodo,
} from '../ducs/todos';
import { Todo } from '../types/todos';
// import { State } from '../types/state';
import {
    DeleteTaskAction,
    GetTodoDataAction,
    CheckboxHandlerAction,
    AddTaskAction,
    CommonThunkDispatch
} from '../types/thunk';

export const checkboxHandler = function (_id: string, isDone: boolean) {
    return (dispatch: CommonThunkDispatch<CheckboxHandlerAction>) => {
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

export const getTodoData = () => {
    return (dispatch: CommonThunkDispatch<GetTodoDataAction>) => {
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

export const deleteTask = function (_id: string) {
    return (dispatch: CommonThunkDispatch<DeleteTaskAction>) => {
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
    ) {
    return (dispatch: CommonThunkDispatch<AddTaskAction>) => {
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
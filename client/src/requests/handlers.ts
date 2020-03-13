export const checkboxHandler = function (this: any, id: number, isDone: boolean) {
    fetch(`http://localhost:8080/task/${id}`, {
        method: 'PUT',
        body: JSON.stringify({isDone: !isDone}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(() => {
        this.props.dispatch(this.props.rootAction.UpdateTodo(id, !isDone));
    });
}

export const getTodoData = function (this: any): Function {
    return (dispatch: Function, state: Function):Promise<any> => {
        dispatch(this.props.rootAction.FetchStarted());
        return fetch('http://localhost:8080/tasks')
            .then((response: any) => response.json())
            .then((todos: Array<any>) => {
                for (let todo in todos) {
                    dispatch(this.props.rootAction.AddTodo(todos[todo]));
                }
            })
            .then(()=>{
                setTimeout(()=>dispatch(this.props.rootAction.DataReceived()), 0);
            })
            .catch((err)=>{
                dispatch(this.props.rootAction.DataError(err));
            });
    }
}
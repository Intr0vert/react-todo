import React, { Component } from 'react';
import { connect } from 'react-redux';
import { rootAction } from './ducs';
import TodoEl from './components/TodoEl';
import AddTask from './components/AddTask';
import Preloader from './components/Preloader/Preloader';

class App extends Component<any, App> {
    checkboxHandler = (id: number, isDone: boolean) => {
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

    asyncFunction = (): Function => {
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
                        setTimeout(()=>dispatch(rootAction.DataReceived()), 2000);
                    })
                    .catch((err)=>{
                        dispatch(rootAction.DataError(err));
                    });

        }
    }

    componentDidMount() {
        this.props.dispatch(this.asyncFunction());
    }

    renderLists() {
        return (
            this.props.todos.map((el: any, i: number) => 
                <TodoEl key={i} todo={el} 
                checkboxHandler={this.checkboxHandler}/>)
        )
    }

    render(): any {
        return (
            <div className="todo--wrapper">
                <h1>TODO: </h1>
                {this.props.preloader.error && <h2 className="todo--error">ERROR</h2>}
                {this.props.preloader.fetchDone && !this.props.preloader.error ?
                    this.renderLists() :
                    !this.props.preloader.error ?
                    <Preloader/> :
                    <></>}
                <AddTask/>
            </div>
        )
    }
}

export default connect(
    (state: any)=>{
        return {
            todos: state.todoReducer,
            preloader: state.preloaderReducer,
        }
    },
    (dispatch:any)=>({
        dispatch,
        rootAction
    })
    )(App);
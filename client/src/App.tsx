import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AddTodo } from './ducs';
import TodoEl from './components/TodoEl';
import AddTask from './components/AddTask';

class App extends Component<any, App> {
    changeCheckboxById = (id:number) => {
        fetch(`http://localhost:8080/task/${id}`, {
            method: 'PUT',
            body: JSON.stringify({isDone:true})
        })
        .then((msg)=>console.log(msg))
        .then(()=>{
            this.asyncFunction();
        });
    }

    checkboxHandler = (id:number) => {
        this.changeCheckboxById(id);
        // this.asyncFunction();
    }

    asyncFunction = (): Function => {
        return (dispatch: Function):Promise<any> => {
        return fetch('http://localhost:8080/tasks')
                .then((response: any) => response.json())
                .then((todos: Array<any>) => {
                    for (let todo in todos) {
                        dispatch(AddTodo(todos[todo]));
                    }
                });
        }
    }

    componentDidMount() {
        this.props.dispatch(this.asyncFunction());
    }

    render(): any {
        return (
            <div className="todo--wrapper">
                <h1>TODO: </h1>
                {this.props.todos.map((el: any, i: number) => 
                    <TodoEl key={i} todo={el} 
                    checkboxHandler={this.checkboxHandler}/>)}
                <AddTask/>
            </div>
        )
    }
}

function mapStateToProps(state: any) {
    return {
        todos: state
    }
}

function mapDispatchToProps(dispatch:any) {
    return {
        dispatch,
        AddTodo
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
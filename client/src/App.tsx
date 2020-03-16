import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    AddTodo,
    UpdateCheckbox,
    UpdateTodo,
 } from './ducs/todo';
import {
    FetchStarted,
    DataReceived,
    DataError
} from './ducs/preloader';
import AddTask from './components/AddTask/AddTask';
import {getTodoData} from './requests/handlers';
import TaskList from './components/TaskList/TaskList';

class App extends Component<any> {
    componentDidMount() {
        this.props.dispatch(getTodoData());
    }

    render(): any {
        return (
            <div className="todo--wrapper">
                <h1>TODO: </h1>
                <TaskList preloader={this.props.preloader} todos={this.props.todos}/>
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
        actions: {
            AddTodo,
            UpdateCheckbox,
            UpdateTodo,
            FetchStarted,
            DataReceived,
            DataError
        }
    })
    )(App);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
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
import { getTodoData } from './requests/handlers';
import TaskList from './components/TaskList/TaskList';
import { IState } from './types/state';
import { IAppProps } from './types/app';

class App extends Component<IAppProps, IState> {
    componentDidMount() {
        this.props.dispatch(getTodoData());
    }

    render(): JSX.Element {
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
    (state: IState)=>{
        return {
            todos: state.todoReducer,
            preloader: state.preloaderReducer,
        }
    },
    (dispatch: Dispatch)=> ({
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
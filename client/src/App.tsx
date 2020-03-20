import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { 
    AddTodo,
    // UpdateCheckbox,
    // UpdateTodo,
    FetchStarted,
    DataReceived,
    DataError
 } from './ducs/todos';
import {Todo} from './types/todos';
import AddTask from './components/AddTask/AddTask';
import { getTodoData } from './requests/handlers';
import TaskList from './components/TaskList/TaskList';
import { State } from './types/state';
import { IAppProps } from './types/app';
import Sort from './components/Sort/Sort';

class App extends Component<IAppProps, State> {
    todos: Array<Todo>;

    constructor(props: IAppProps) {
        super(props);
        
        this.todos = props.todos.data;
    }

    componentDidMount() {
        this.props.dispatch(getTodoData());
    }

    render(): JSX.Element {
        return (
            <div className="todo--wrapper">
                <Sort/>
                <h1>TODO: </h1>
                <TaskList todos={this.props.todos}/>
                <AddTask/>
            </div>
        )
    }
}

export default connect(
    (state: State)=> {
        return {
            todos: {
                data: [...state.todos.data],
                isLoading: state.todos.isLoading,
                error: state.todos.error,
                showAll: state.todos.showAll,
            }
        }
    },
    (dispatch: Dispatch)=> ({
        dispatch,
        actions: {
            AddTodo,
            // UpdateCheckbox,
            // UpdateTodo,
            FetchStarted,
            DataReceived,
            DataError
        }
    })
)(App);
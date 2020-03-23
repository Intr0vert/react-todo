import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { 
    AddTodo,
    FetchStarted,
    DataReceived,
    DataError,
    SortChange
 } from './ducs/todos';
import { AddTask } from './components/AddTask/AddTask';
import { getTodoData } from './requests/handlers';
import { TaskList } from './components/TaskList/TaskList';
// import { State } from './types/state';
import { TodoState } from './types/todos';
import { AppProps } from './types/app';
import { Sort } from './components/Sort/Sort';

class App extends Component<AppProps, TodoState> {
    componentDidMount() {
        this.props.dispatch(getTodoData());
    }

    render(): JSX.Element {
        return (
            <div className="todo--wrapper">
                <Sort todos={this.props.todos}/>
                <h1>TODO: </h1>
                <TaskList todos={this.props.todos} />
                <AddTask/>
            </div>
        )
    }
}

export default connect(
    (state: TodoState)=> {
        return {
            todos: {
                data: state.data,
                isLoading: state.isLoading,
                error: state.error,
                showAll: state.showAll,
            }
        }
    },
    (dispatch: Dispatch)=> ({
        dispatch,
        actions: {
            AddTodo,
            FetchStarted,
            DataReceived,
            DataError,
            SortChange,
        }
    })
)(App);
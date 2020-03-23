import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { 
    AddTodo,
    // UpdateCheckbox,
    // UpdateTodo,
    FetchStarted,
    DataReceived,
    DataError,
    SortChange
 } from './ducs/todos';
import AddTask from './components/AddTask/AddTask';
import { getTodoData } from './requests/handlers';
import TaskList from './components/TaskList/TaskList';
// import { State } from './types/state';
import { TodoState } from './types/todos';
import { IAppProps } from './types/app';
import Sort from './components/Sort/Sort';

class App extends Component<IAppProps, TodoState> {
    componentDidMount() {
        this.props.dispatch(getTodoData());
    }

    render(): JSX.Element {
        return (
            <div className="todo--wrapper">
                <Sort todos={this.props}/>
                <h1>TODO: </h1>
                <TaskList todos={this.props} />
                <AddTask/>
            </div>
        )
    }
}

export default connect(
    (state: TodoState)=> {
        return {
            data: state.data,
            isLoading: state.isLoading,
            error: state.error,
            showAll: state.showAll,
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
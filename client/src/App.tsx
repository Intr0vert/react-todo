import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AddTask } from './components/AddTask/AddTask';
import {
    getTodoData,
    addTask,
    deleteTask,
    checkboxHandler,
} from './requests/handlers';
import { TaskList } from './components/TaskList/TaskList';
import { TodoState, SortChangeTodoAction } from './types/todos';
import { Sort } from './components/Sort/Sort';
import { CommonThunkDispatch } from './types/thunk';
import { SortChange } from './ducs/todos';
import { getSortedTodos } from './selectors/sortedTodos';

interface AppProps extends TodoState {
    addTask: (title: string, description: string) => void;
    deleteTask: (_id: string) => void;
    checkboxHandler: (_id: string, isDone: boolean) => void;
    getTodoData: () => void;
    SortChange: () => SortChangeTodoAction;
}

class App extends Component<AppProps, TodoState> {
    componentDidMount() {
        this.props.getTodoData();
    }

    render(): JSX.Element {
        return (
            <div className="todo--wrapper">
                <Sort changeSort={
                    () => this.props.SortChange()}
                    sort={this.props.showAll}/>
                <h1>TODO: </h1>
                <TaskList deleteTaskFromList={
                    (_id: string) => this.props.deleteTask(_id)}
                    changeCheckbox={
                        (_id: string, isDone: boolean) => 
                            this.props.checkboxHandler(_id, isDone)
                    }
                    todos={this.props} />
                <AddTask addTaskToList={
                    (title: string, description: string) => 
                        this.props.addTask(title, description)
                    } />
            </div>
        )
    }
}

export default connect(
    (state: TodoState) => {
        return {
            data: getSortedTodos(state),
            isLoading: state.isLoading,
            error: state.error,
            showAll: state.showAll,
        }
    },
    (dispatch: CommonThunkDispatch) => ({
        SortChange: () => dispatch(SortChange()),
        addTask: (title: string, description: string) => dispatch(addTask(title, description)),
        deleteTask: (_id: string) => dispatch(deleteTask(_id)),
        checkboxHandler: (_id: string, isDone: boolean) => dispatch(checkboxHandler(_id, isDone)),
        getTodoData: () => dispatch(getTodoData()),
    })
)(App);
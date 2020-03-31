import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddTaskForm from './components/AddTask/AddTask';
import {
    getTodoData,
    addTask,
    deleteTask,
    checkboxHandler,
} from './requests/handlers';
import { TaskList } from './components/TaskList/TaskList';
import { SortChangeTodoAction } from './types/todos';
import { Sort } from './components/Sort/Sort';
import { CommonThunkDispatch } from './types/thunk';
import { SortChange } from './ducs/todos';
import { getSortedTodos } from './selectors/sortedTodos';
import { State } from './types/state';
import { formValueSelector } from 'redux-form';

interface AppProps extends State {
    addTask: (title: string, description: string) => void;
    deleteTask: (_id: string) => void;
    checkboxHandler: (_id: string, isDone: boolean) => void;
    getTodoData: () => void;
    SortChange: () => SortChangeTodoAction;
}

class App extends Component<AppProps, State> {
    checkboxHandler: (_id: string, isDone: boolean) => void;
    sortChange: () => SortChangeTodoAction;
    deleteTask: (_id: string) => void;
    addTask: (title: string, description: string) => void;

    constructor(props: AppProps) {
        super(props);

        this.checkboxHandler = this.props.checkboxHandler.bind(this);
        this.sortChange = this.props.SortChange.bind(this);
        this.deleteTask = this.props.deleteTask.bind(this);
        this.addTask = this.props.addTask.bind(this);
    }

    componentDidMount() {
        this.props.getTodoData();
    }

    render(): JSX.Element {
        return (
            <div className="todo--wrapper">
                <Sort 
                    changeSort={this.sortChange}
                    sort={this.props.todos.showAll}/>
                <h1>TODO: </h1>
                <TaskList 
                    deleteTaskFromList={this.deleteTask}
                    changeCheckbox={this.checkboxHandler}
                    data={this.props.todos.data}
                    error={this.props.todos.error}
                    isLoading={this.props.todos.isLoading} />
                <AddTaskForm 
                    addTaskToList={this.addTask}
                    title={this.props.form.title}
                    description={this.props.form.description}
                    />
            </div>
        )
    }
}

const AddTaskSelector = formValueSelector('add-task');

export default connect(
    (state: State) => {
        return {
            form: {
                title: AddTaskSelector(state, 'title'),
                description: AddTaskSelector(state, 'description'),
            },
            todos: {
                data: getSortedTodos(state),
                isLoading: state.todos.isLoading,
                error: state.todos.error,
                showAll: state.todos.showAll,
            },
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
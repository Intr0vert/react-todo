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
import { ChangeTitle, ChangeFieldsError, ChangeDescription } from './ducs/form';
import { ChangeTitleAction, ChangeDescriptionAction, ChangeFieldsErrorAction } from './types/form';
import { formValueSelector } from 'redux-form';

interface AppProps extends State {
    addTask: (title: string, description: string) => void;
    deleteTask: (_id: string) => void;
    checkboxHandler: (_id: string, isDone: boolean) => void;
    getTodoData: () => void;
    SortChange: () => SortChangeTodoAction;
    ChangeTitle: (title: string) => ChangeTitleAction,
    ChangeDescription: (descrption: string) => ChangeDescriptionAction,
    ChangeFieldsError: (error: string|null) => ChangeFieldsErrorAction,
}

class App extends Component<AppProps, State> {
    checkboxHandler: (_id: string, isDone: boolean) => void;
    sortChange: () => SortChangeTodoAction;
    deleteTask: (_id: string) => void;
    addTask: (title: string, description: string) => void;
    changeTitle: (title: string) => ChangeTitleAction;
    changeDescription: (descrption: string) => ChangeDescriptionAction;
    changeFieldsError: (error: string | null) => ChangeFieldsErrorAction;

    constructor(props: AppProps) {
        super(props);

        this.checkboxHandler = this.props.checkboxHandler.bind(this);
        this.sortChange = this.props.SortChange.bind(this);
        this.deleteTask = this.props.deleteTask.bind(this);
        this.addTask = this.props.addTask.bind(this);
        this.changeTitle = this.props.ChangeTitle.bind(this);
        this.changeDescription = this.props.ChangeDescription.bind(this);
        this.changeFieldsError = this.props.ChangeFieldsError.bind(this);
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
                    error={this.props.form.error}
                    changeTitle={this.changeTitle}
                    changeDescription={this.changeDescription}
                    changeFieldsError={this.changeFieldsError}
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
                error: state.form.error,
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
        ChangeTitle: (title: string) => dispatch(ChangeTitle(title)),
        ChangeDescription: (description: string) => dispatch(ChangeDescription(description)),
        ChangeFieldsError: (error: string|null) => dispatch(ChangeFieldsError(error)),
    })
)(App);
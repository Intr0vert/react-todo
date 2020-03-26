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
import { SortChangeTodoAction } from './types/todos';
import { Sort } from './components/Sort/Sort';
import { CommonThunkDispatch } from './types/thunk';
import { SortChange } from './ducs/todos';
import { getSortedTodos } from './selectors/sortedTodos';
import { State } from './types/state';
import { ChangeTitle, ChangeFieldsError, ChangeDescription } from './ducs/form';
import { ChangeTitleAction, ChangeDescriptionAction, ChangeFieldsErrorAction } from './types/form';

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
    componentDidMount() {
        this.props.getTodoData();
    }

    render(): JSX.Element {
        return (
            <div className="todo--wrapper">
                <Sort changeSort={() => this.props.SortChange()}
                    sort={this.props.todos.showAll}/>
                <h1>TODO: </h1>
                <TaskList deleteTaskFromList={
                    (_id: string) => this.props.deleteTask(_id)}
                    changeCheckbox={
                        (_id: string, isDone: boolean) => 
                            this.props.checkboxHandler(_id, isDone)
                    }
                    todos={this.props.todos} />
                <AddTask addTaskToList={
                    (title: string, description: string) => 
                        this.props.addTask(title, description)
                    }
                    form={this.props.form}
                    changeTitle={(title: string) => this.props.ChangeTitle(title)}
                    changeDescription={(descrption: string) => this.props.ChangeDescription(descrption)}
                    changeFieldsError={(error: string|null) => this.props.ChangeFieldsError(error)}
                    />
            </div>
        )
    }
}

export default connect(
    (state: State) => {
        return {
            todos: {
                data: getSortedTodos(state),
                isLoading: state.todos.isLoading,
                error: state.todos.error,
                showAll: state.todos.showAll,
            },
            form: {
                title: state.form.title,
                description: state.form.description,
                error: state.form.error,
            }
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
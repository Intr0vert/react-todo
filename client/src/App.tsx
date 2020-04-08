import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddTaskForm from './components/AddTask/AddTask';
import {
    getTodoData,
    addTask,
    deleteTask,
    checkboxHandler,
} from './requests/handlers';
import { TodoEl } from './components/TaskList/TodoEl';
import { SortChangeTodoAction, Todo } from './types/todos';
import { Sort } from './components/Sort/Sort';
import { CommonThunkDispatch } from './types/thunk';
import { SortChange } from './ducs/todos';
import { getSortedTodos } from './selectors/sortedTodos';
import { State } from './types/state';
import { formValueSelector } from 'redux-form';
import {
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@material-ui/core';

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
            <Paper className="todo--wrapper">
                <h1>Todo list</h1>
                {this.props.todos.error && <h2 className="todo--error">{this.props.todos.error}</h2>}
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell align="right">Description</TableCell>
                                <TableCell align="right">Done</TableCell>
                                <TableCell align="right">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.todos.data.map((el: Todo) => (
                                <TodoEl 
                                    key={el._id}
                                    todo={el}
                                    changeCheckbox={this.props.checkboxHandler}
                                    deleteTaskFromList={this.props.deleteTask}
                                    />
                                // <TableRow key={el._id}>
                                //     <TableCell>{el.title}</TableCell>
                                    // <TableCell align="right">{
                                    //     el.description ?
                                    //     el.description : ''}
                                    //     </TableCell>
                                //     <TableCell align="right">{el.isDone.toString()}</TableCell>
                                //     <TableCell align="right">Delete/Done</TableCell>
                                // </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* <Sort 
                    changeSort={this.sortChange}
                    sort={this.props.todos.showAll}/>
                <h1>TODO: </h1> */}
                <AddTaskForm 
                    addTaskToList={this.addTask}
                    title={this.props.form.title}
                    description={this.props.form.description}
                    />
            </Paper>
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
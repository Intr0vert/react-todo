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
import Preloader from './components/Preloader/Preloader';
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
  FormControlLabel,
  Switch,
} from '@material-ui/core';
import './components/TaskList/taskstyle.css';
import { AbstractAction } from './types/action';

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

  componentDidMount(): void {
    this.props.getTodoData();
  }

  render(): JSX.Element {
    return (
      <Paper className="todo--wrapper">
        <div className="todo--title">
          <h1>Todo list</h1>
          <FormControlLabel
            control={
              <Switch
                color="primary"
                checked={!this.props.todos.showAll}
                onChange={this.sortChange}
              />
            }
            className="todo--sort"
            label="Only undone"
          />
        </div>
        {this.props.todos.error && (
          <h2 className="todo--error">{this.props.todos.error}</h2>
        )}
        {this.props.todos.isLoading ? (
          <Preloader />
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow className="todo--row">
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
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <AddTaskForm
          addTaskToList={this.addTask}
          title={this.props.form.title}
          description={this.props.form.description}
        />
      </Paper>
    );
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
    };
  },
  (dispatch: CommonThunkDispatch) => ({
    SortChange: (): AbstractAction<'SORT_CHANGE', null> =>
      dispatch(SortChange()),
    addTask: (title: string, description: string | undefined): Promise<void> =>
      dispatch(addTask(title, description)),
    deleteTask: (_id: string): Promise<void> => dispatch(deleteTask(_id)),
    checkboxHandler: (_id: string, isDone: boolean): Promise<void> =>
      dispatch(checkboxHandler(_id, isDone)),
    getTodoData: (): Promise<void> => dispatch(getTodoData()),
  })
)(App);

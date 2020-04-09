import React from 'react';
import { Todo } from '../../types/todos';
import { Button, TableRow, TableCell } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import './taskstyle.css';

interface TodoElProps {
  todo: Todo;
  changeCheckbox: (_id: string, isDone: boolean) => void;
  deleteTaskFromList: (_id: string) => void;
}

export const TodoEl: React.FC<TodoElProps> = (props: TodoElProps) => {
  const { todo, changeCheckbox, deleteTaskFromList } = props;
  return (
    <TableRow className="todo--row">
      <TableCell>
        <p className={'todo--info'}>{todo.title}</p>
      </TableCell>
      <TableCell className={'todo--info'} align="right">
        <p className={'todo--info'}>
          {todo.description ? todo.description : ''}
        </p>
      </TableCell>
      <TableCell className={'todo--info'} align="right">
        <Button
          className="todo--checkbox"
          variant="contained"
          color={todo.isDone ? 'primary' : 'secondary'}
          onClick={(): void => changeCheckbox(todo._id, !todo.isDone)}
        >
          {todo.isDone ? <DoneIcon /> : <CloseIcon />}
        </Button>
      </TableCell>
      <TableCell className={'todo--info'} align="right">
        <Button
          variant="contained"
          color="secondary"
          className="todo--delete"
          aria-label="delete"
          onClick={(): void => deleteTaskFromList(todo._id)}
        >
          <DeleteIcon />
        </Button>
      </TableCell>
    </TableRow>
  );
};

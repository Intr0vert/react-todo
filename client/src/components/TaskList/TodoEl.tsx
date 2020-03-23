import React from 'react';
import {useDispatch} from 'react-redux'; 
import { ITodoElProps } from '../../types/todoEl';
import { deleteTask, checkboxHandler } from "../../requests/handlers";

export const TodoEl: React.FC<ITodoElProps> = (props: ITodoElProps) => {
  const dispatch = useDispatch();
  const todo = props.todo;
  return (
    <div className="todo--el">
      <h4>{todo.title}</h4>
      <p>{todo.description}</p>
      <div
        className={
          todo.isDone
            ? "todo--checkbox todo--done"
            : "todo--checkbox todo--undone"
        }
        onClick={() =>
          dispatch(checkboxHandler(props.todo._id, !props.todo.isDone))
        }
      ></div>
      <div
        className="todo--delete"
        onClick={() => dispatch(deleteTask(props.todo._id))}
      ></div>
    </div>
  );
};
import React from 'react';
import { TodoElProps } from '../../types/todoEl';

export const TodoEl: React.FC<TodoElProps> = (props: TodoElProps) => {
  const todo = props.todo;
  const changeCheckbox = props.changeCheckbox;
  const deleteTaskFromList = props.deleteTaskFromList;
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
          changeCheckbox(props.todo._id, !props.todo.isDone)
        }
      ></div>
      <div
        className="todo--delete"
        onClick={() => deleteTaskFromList(props.todo._id)}
      ></div>
    </div>
  );
};
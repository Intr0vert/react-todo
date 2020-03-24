import React from 'react';
import { Todo } from '../../types/todos';

interface TodoElProps {
  todo: Todo;
  changeCheckbox: (_id: string, isDone: boolean) => void;
  deleteTaskFromList: (_id: string) => void;
}

export const TodoEl: React.FC<TodoElProps> = (props: TodoElProps) => {
  const {todo, changeCheckbox, deleteTaskFromList} = props;
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
          changeCheckbox(todo._id, !todo.isDone)
        }
      ></div>
      <div
        className="todo--delete"
        onClick={() => deleteTaskFromList(todo._id)}
      ></div>
    </div>
  );
};
import React from 'react';
import { createSelector } from "reselect";
import { TodoState, Todo } from "../types/todos";
import TodoEl from '../components/TaskList/TodoEl';

const getTodos = (todos: TodoState) => todos;

export const getTodoEl = createSelector(
    getTodos,
    todos => todos.data.map((el: Todo) => {
        if (!todos.showAll && !el.isDone) {
            return <TodoEl key={el._id} todo={el} />;
        } else if (todos.showAll) {
            return <TodoEl key={el._id} todo={el} />;
        }
        return null;
    }));
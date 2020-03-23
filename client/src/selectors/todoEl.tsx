// got some problems with types

import React from 'react';
import { createSelector } from "reselect";
import { TodoState, Todo } from "../types/todos";
import { TodoEl } from '../components/TaskList/TodoEl';

const getTodos = (todos: TodoState) => todos;

export const getTodoEl = createSelector(
    getTodos,
    todos => todos.data.map((el: Todo) => (
        !todos.showAll && !el.isDone) || todos.showAll ? 
        <TodoEl key={el._id} todo={el} /> : 
        null));
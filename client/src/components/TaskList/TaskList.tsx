import React from 'react';
import Preloader from '../Preloader/Preloader';
import './taskstyle.css';
import { TaskListProps } from "../../types/taskList";
import { getTodoEl } from '../../selectors/todoEl';

export default function TaskList(props: TaskListProps): any {
    const todos = props.todos;
    if (todos.error) {
        return <h2 className="todo--error">{todos.error}</h2>;
    }

    if (!todos.isLoading) {
        return getTodoEl(todos);
    } else {
        return <Preloader />;
    }
}
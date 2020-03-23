import React from 'react';
import Preloader from '../Preloader/Preloader';
import './taskstyle.css';
import { TaskListProps } from "../../types/taskList";
import { TodoEl } from './TodoEl';
import { Todo } from "../../types/todos";

export const TaskList: React.FC<TaskListProps> = (props: TaskListProps) => {
    const todos = props.todos;
    if (todos.error) {
        return <h2 className="todo--error">{todos.error}</h2>;
    } else if (!todos.isLoading) {
        return (<>{
            todos.data.map((el: Todo) => (
                (!todos.showAll && !el.isDone) || todos.showAll ?
                <TodoEl key={el._id} todo={el} /> :
                null))
        }</>);
        // return getTodoEl(todos);
    } else {
        return <Preloader />;
    }
}
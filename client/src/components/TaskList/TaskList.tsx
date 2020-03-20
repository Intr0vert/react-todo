import React from 'react';
import TodoEl from './TodoEl';
import Preloader from '../Preloader/Preloader';
import './taskstyle.css';
import { State } from '../../types/state';
import { Todo } from '../../types/todos';

export default function TaskList(props: State): any {
    const todos = props.todos;
    if (todos.error) {
        return <h2 className="todo--error">{todos.error}</h2>;
    }

    if (!todos.isLoading) {
        return todos.data.map((el: Todo) => <TodoEl key={el._id} todo={el}/>);
    } else {
        return <Preloader />;
    }
}
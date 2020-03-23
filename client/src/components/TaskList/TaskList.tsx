import React from 'react';
import TodoEl from './TodoEl';
import Preloader from '../Preloader/Preloader';
import './taskstyle.css';
// import { State } from '../../types/state';
// import { TodoState } from '../../types/todos';
import { Todo } from '../../types/todos';

export default function TaskList(props: any): any {
    const todos = props.todos;
    if (todos.error) {
        return <h2 className="todo--error">{todos.error}</h2>;
    }

    if (!todos.isLoading) {
        return <>
            {todos.data.map((el: Todo) => {
                if (!todos.showAll && !el.isDone) {
                    return <TodoEl key={el._id} todo={el} />
                } else if (todos.showAll) {
                    return <TodoEl key={el._id} todo={el}/>
                }
                return null;
            })}
        </>
    } else {
        return <Preloader />;
    }
}
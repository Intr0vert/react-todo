import React from 'react';
import Preloader from '../Preloader/Preloader';
import './taskstyle.css';
import { TodoState, Todo } from "../../types/todos";
import { TodoEl } from './TodoEl';

interface TaskListProps {
    todos: TodoState;
    changeCheckbox: (_id: string, isDone: boolean) => void;
    deleteTaskFromList: (_id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = (props: TaskListProps) => {
    const todos = props.todos;
    if (todos.error) {
        return <h2 className="todo--error">{todos.error}</h2>;
    } else if (!todos.isLoading) {
        return (<>{
            todos.data.map((el: Todo) => (
                (!todos.showAll && !el.isDone) || todos.showAll ?
                <TodoEl changeCheckbox={props.changeCheckbox}
                        deleteTaskFromList={props.deleteTaskFromList}
                        key={el._id}
                        todo={el} />
                    : null))
        }</>);
        // return getTodoEl(todos);
    } else {
        return <Preloader />;
    }
}
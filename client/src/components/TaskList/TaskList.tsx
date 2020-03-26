import React from 'react';
import Preloader from '../Preloader/Preloader';
import './taskstyle.css';
import { Todo } from "../../types/todos";
import { TodoEl } from './TodoEl';

interface TaskListTodos {
    data: Todo[];
    isLoading: boolean;
    error: string|null;
}

interface TaskListProps {
    todos: TaskListTodos;
    changeCheckbox: (_id: string, isDone: boolean) => void;
    deleteTaskFromList: (_id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = (props: TaskListProps) => {
    const { todos } = props;

    if (todos.error) {
        return <h2 className="todo--error">{todos.error}</h2>;
    } else if (!todos.isLoading) {
        return (<>{
            todos.data.map((el: Todo)=>(
                <TodoEl changeCheckbox={props.changeCheckbox}
                        deleteTaskFromList={props.deleteTaskFromList}
                        key={el._id}
                        todo={el} />
            ))
        }</>);
    } else {
        return <Preloader />;
    }
}
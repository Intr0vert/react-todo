import React from 'react';
import Preloader from '../Preloader/Preloader';
import './taskstyle.css';
import { Todo } from "../../types/todos";
import { TodoEl } from './TodoEl';

interface TaskListProps {
    data: Todo[];
    isLoading: boolean;
    error: string | null;
    changeCheckbox: (_id: string, isDone: boolean) => void;
    deleteTaskFromList: (_id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = (props: TaskListProps) => {
    const { data, error, isLoading } = props;

    if (error) {
        return <h2 className="todo--error">{error}</h2>;
    } else if (!isLoading) {
        return (<>{
            data.map((el: Todo)=>(
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
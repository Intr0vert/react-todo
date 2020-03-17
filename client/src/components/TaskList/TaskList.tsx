import React from 'react';
import TodoEl from './TodoEl';
import Preloader from '../Preloader/Preloader';
import './taskstyle.css';
import { ITaskListProps } from '../../types/taskList';
import { Todo } from '../../types/todo';

export default function TaskList(props: ITaskListProps): JSX.Element {
    const renderLists = () => {
        return (
            props.todos.map((el: Todo) => <TodoEl key={el._id} todo={el}/>)
        )
    }

    return <>
        {props.preloader.error && 
        <h2 className="todo--error">Somethink went wrong</h2>}

        {props.preloader.fetchDone && !props.preloader.error ?
            renderLists() :
            !props.preloader.error ?
            <Preloader/> :
            <></>}
    </>
}
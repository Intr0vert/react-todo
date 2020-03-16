import React from 'react';
import TodoEl from './TodoEl';
import Preloader from '../Preloader/Preloader';
import './taskstyle.css';

export default function TaskList(props: any) {
    const renderLists = () => {
        return (
            props.todos.map((el: any) => <TodoEl key={el._id} todo={el}/>)
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
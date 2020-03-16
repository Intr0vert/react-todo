import React from 'react';
import {checkboxHandler, deleteTask} from '../../requests/handlers';
import {useDispatch} from 'react-redux';

export default function TodoEl(props:any):any {
    const dispatch = useDispatch();
    return <div className="todo--el">
        <h4>{props.todo.title}</h4>
        <p>{props.todo.description}</p>
        <div className={
            props.todo.isDone ? 
            'todo--checkbox todo--done' :
            'todo--checkbox todo--undone'
            }
            onClick={()=>dispatch(checkboxHandler(
                props.todo._id,
                !props.todo.isDone))}>
        </div>
        <div className="todo--delete"
            onClick={()=>dispatch(deleteTask(props.todo._id))}></div>
    </div>
}
import React from 'react';
// import {checkboxHandler, deleteTask} from '../../requests/handlers';
// import {useDispatch} from 'react-redux';
import { ITodoElProps } from '../../types/todoEl';

export default function TodoEl(props: ITodoElProps): JSX.Element {
    const todo = props.todo;
    // const dispatch = useDispatch();
    return <div className="todo--el">
        <h4>{todo.title}</h4>
        <p>{todo.description}</p>
        <div className={
            todo.isDone ? 
            'todo--checkbox todo--done' :
            'todo--checkbox todo--undone'
            }
            /* onClick={()=>dispatch(checkboxHandler(
                props.todo._id,
                !props.todo.isDone))} */>
        </div>
        <div className="todo--delete"
            /* onClick={()=>dispatch(deleteTask(props.todo._id))} */></div>
    </div>
}
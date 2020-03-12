import React from 'react';

export default function TodoEl(props:any):any {
    return <div className="todo--el">
        <h4>{props.todo.title}</h4>
        <p>{props.todo.description}</p>
        <div className={
            props.todo.isDone ? 
            'todo--checkbox todo--done' :
            'todo--checkbox todo--undone'
            }
            onClick={()=>props.checkboxHandler(props.todo._id)}>
        </div>
    </div>
}
import React, {useState} from 'react';
import './addTask.css';
import { AddTaskProps } from '../../types/addTask';

export const AddTask: React.FC<AddTaskProps> = (props: AddTaskProps) => {
    const addTaskToList = props.addTaskToList;
    const [titleValue, changeTitle] = useState('');
    const [descriptionValue, changeDescription] = useState('');

    return <form className="todo--form">
        <h4>Add task</h4>
        <input type="text" value={titleValue} 
            placeholder="Type title here..."
            onChange={(el)=>changeTitle(el.target.value)}/>
        <input type="text" value={descriptionValue} 
            placeholder="Type description here..."
            onChange={(el)=>changeDescription(el.target.value)}/>
        <button onClick={(e)=>{
            e.preventDefault();
            addTaskToList(titleValue, descriptionValue )}}>Add</button>
    </form>
}
import React, {useState} from 'react';
import {addTask} from '../../requests/handlers';
import './addTask.css';
import {useDispatch} from 'react-redux';

export default function AddTask():any {
    const dispatch = useDispatch();
    const [titleValue, changeTitle] = useState('');
    const [descriptionValue, changeDescription] = useState('');
    const [checkboxValue, changeCheckbox] = useState(false);

    return <form className="todo--form">
        <h4>Add task</h4>
        <input type="text" value={titleValue} 
            placeholder="Type title here..."
            onChange={(el)=>changeTitle(el.target.value)}/>
        <input type="text" value={descriptionValue} 
            placeholder="Type description here..."
            onChange={(el)=>changeDescription(el.target.value)}/>
        <label className="todo--form-checkbox">
            <p>Is done</p>
            <input type="checkbox" checked={checkboxValue}
                onChange={()=>changeCheckbox(!checkboxValue)}/>
        </label>
        <button onClick={(e)=>{
            e.preventDefault();
            dispatch(addTask(
                titleValue,
                descriptionValue,
                checkboxValue))}}>Add</button>
    </form>
}
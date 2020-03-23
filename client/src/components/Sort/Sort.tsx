import React from 'react';
import './sort.css';
import {useDispatch} from 'react-redux';

export default function Sort(props: any): any {
    const todos = props.todos;
    const dispatch = useDispatch();
    return (
        <div className="todo--sort">
            <label htmlFor="sortByAll">
                <p>All</p>
                <input id="sortByAll" name="sortTasks" type="radio" checked={todos.showAll}
                    onChange={() => {
                        dispatch({ type: 'SORT_CHANGE'})}}/>
            </label>
            {/* <label htmlFor="sortByDone">
                <p>Done</p>
                <input id="sortByDone" name="sortTasks" type="radio" value="done" 
                onClick={()=>{}}/>
            </label> */}
            <label htmlFor="sortByUnDone">
                <p>Undone</p>
                <input id="sortByUnDone" name="sortTasks" type="radio"
                    checked={!todos.showAll}
                    onChange={() => {
                        dispatch({ type: 'SORT_CHANGE' }) }}/>
            </label>
        </div>
)}
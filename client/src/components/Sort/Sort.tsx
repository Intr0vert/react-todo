import React from 'react';
import './sort.css';

export default function Sort(): JSX.Element {
    return (
        <div className="todo--sort">
            <label htmlFor="sortByAll">
                <p>All</p>
                <input id="sortByAll" name="sortTasks" type="radio" value="all" 
                onClick={()=>{}}/>
            </label>
            {/* <label htmlFor="sortByDone">
                <p>Done</p>
                <input id="sortByDone" name="sortTasks" type="radio" value="done" 
                onClick={()=>{}}/>
            </label> */}
            <label htmlFor="sortByUnDone">
                <p>Undone</p>
                <input id="sortByUnDone" name="sortTasks" type="radio" value="undone" 
                onClick={()=>{}}/>
            </label>
        </div>
)}
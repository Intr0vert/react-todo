import React from 'react';

export default function AddTask():any {
    return <form className="todo--form">
        <h4>Add task</h4>
        <input type="text" placeholder="Type here..."/>
        <button>Add</button>
    </form>
}
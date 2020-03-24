import React from 'react';
import './sort.css';
import { TodoState } from '../../types/todos';

interface SortProps {
    todos: TodoState;
    changeSort: () => void;
}

export const Sort:React.FC<SortProps> = (props: SortProps) => {
    const todos = props.todos;
    const changeSort = props.changeSort;
    return (
        <div className="todo--sort">
            <label htmlFor="sortByAll">
                <p>All</p>
                <input id="sortByAll" name="sortTasks" type="radio" checked={todos.showAll}
                    onChange={() => changeSort()}/>
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
                    onChange={() => changeSort()}/>
            </label>
        </div>
)}
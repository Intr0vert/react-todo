import React from 'react';
import './sort.css';

interface SortProps {
    sort: boolean;
    changeSort: () => void;
}

export const Sort:React.FC<SortProps> = (props: SortProps) => {
    const { sort, changeSort } = props;

    return (
        <div className="todo--sort">
            <label htmlFor="sortByAll">
                <p>All</p>
                <input id="sortByAll" name="sortTasks" type="radio" checked={sort}
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
                    checked={!sort}
                    onChange={() => changeSort()}/>
            </label>
        </div>
)}
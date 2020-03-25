import React, {useState} from 'react';
import './addTask.css';

interface AddTaskProps {
    addTaskToList: (titleValue: string, descriptionValue: string) => void;
}

export const AddTask: React.FC<AddTaskProps> = (props: AddTaskProps) => {
    const {addTaskToList} = props;
    const [titleValue, changeTitle] = useState('');
    const [descriptionValue, changeDescription] = useState('');
    const [fieldsError, changeFieldsError] = useState('');
    
    const validate = () => {
        if (titleValue.length < 4) {
            changeFieldsError("Title is too short");

            return false;
        }

        if (!titleValue.match(/^[0-9a-zA-Z ]*$/) ||
            !descriptionValue.match(/^[0-9a-zA-Z ]*$/)) {
            changeFieldsError("Fields must have only numbers or latin alphabet");

            return false;
        }

        return true;
    }

    function submitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const isValid = validate();
        
        if (isValid) {
            addTaskToList(titleValue, descriptionValue);

            changeTitle('');
            changeDescription('');
            changeFieldsError('');
        }

        return false;
    }

    return <form className="todo--form"
        onSubmit={(e) => {submitHandler(e)}}>
        {fieldsError ? <h2 className="todo--error">{fieldsError}</h2> : <></>}
        <h4>Add task</h4>
        <input type="text" value={titleValue} 
            placeholder="Type title here..."
            maxLength={32}
            onChange={(el)=>changeTitle(el.target.value)}/>
        <input type="text" value={descriptionValue} 
            placeholder="Type description here..."
            maxLength={180}
            onChange={(el) => changeDescription(el.target.value)}/>
        <button>Add</button>
    </form>
}
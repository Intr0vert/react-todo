import React, {useState, FormEvent} from 'react';
import './addTask.css';

interface AddTaskProps {
    addTaskToList: (titleValue: string, descriptionValue: string)=>any;
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

        changeFieldsError('');
        return true;
    }

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
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
    
    const titleHandler = (value: string) => {
        changeTitle(value);
        validate();
    }

    const descriptionHandler = (value: string) => {
        changeDescription(value);
        validate();
    }

    return <form className="todo--form"
        onSubmit={(e) => {submitHandler(e)}}>
        {fieldsError ? <h2 className="todo--error">{fieldsError}</h2> : <></>}
        <h4>Add task</h4>
        <input type="text" value={titleValue} 
            placeholder="Type title here..."
            maxLength={32}
            onChange={(e) => titleHandler(e.target.value)}/>
        <input type="text" value={descriptionValue} 
            placeholder="Type description here..."
            maxLength={180}
            onChange={(e) => descriptionHandler(e.target.value)}/>
        <button>Add</button>
    </form>
}
import React from 'react';
import './addTask.css';
import { FormState, ChangeTitleAction, ChangeDescriptionAction, ChangeFieldsErrorAction } from '../../types/form';

interface AddTaskProps {
    form: FormState;
    addTaskToList: (titleValue: string, descriptionValue: string) => void;
    changeTitle: (title: string) => ChangeTitleAction;
    changeDescription: (description: string) => ChangeDescriptionAction;
    changeFieldsError: (error: string | null) => ChangeFieldsErrorAction;
}

export const AddTask: React.FC<AddTaskProps> = (props: AddTaskProps) => {
    const {
        addTaskToList,
        changeTitle,
        changeDescription,
        changeFieldsError,
    } = props;
    const {
        title,
        description,
        error
    } = props.form;
    
    const validate = () => {
        if (title.length < 4) {
            changeFieldsError("Title is too short");
            return false;
        }

        if (!title.match(/^[0-9a-zA-Z ]*$/) ||
            !description.match(/^[0-9a-zA-Z ]*$/)) {
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
            addTaskToList(title, description);
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
        {error ? <h2 className="todo--error">{error}</h2> : <></>}
        <h4>Add task</h4>
        <input type="text" value={title} 
            placeholder="Type title here..."
            maxLength={32}
            onChange={(e) => titleHandler(e.target.value)}/>
        <input type="text" value={description} 
            placeholder="Type description here..."
            maxLength={180}
            onChange={(e) => descriptionHandler(e.target.value)}/>
        <button>Add</button>
    </form>
}
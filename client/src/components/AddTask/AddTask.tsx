import React from 'react';
import './addTask.css';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import renderField from './renderField';
import validate from './validate';

interface FormData {
    title: string,
    description: string,
}

interface AddTaskProps extends FormData {
    addTaskToList: (titleValue: string, descriptionValue: string) => void;
}

interface onSubmitTypes {
    title: string,
    description: string,
}

const AddTask: React.FC<InjectedFormProps<FormData, AddTaskProps> & AddTaskProps> = 
    (props) => {
    const {
        addTaskToList,
        title,
        description,
        error,
        handleSubmit,
        reset
    } = props;

    const onSubmit = (values: onSubmitTypes) => {
        const {
            title,
            description
        } = values;

        addTaskToList(title, description);
        reset();
    }


    return <form className="todo--form"
        onSubmit={handleSubmit(onSubmit)}>
        {error ? <h2 className="todo--error">{error}</h2> : <></>}
        <h4>Add task</h4>
        <Field
            name={'title'}
            type="text"
            value={title} 
            placeholder="Type title here..."
            maxLength={32}
            component={renderField}/>
        <Field
            name={'description'}
            type="text"
            value={description} 
            placeholder="Type description here..."
            maxLength={180}
            component={renderField}/>
        <button>Add</button>
    </form>
}

export default reduxForm<FormData, AddTaskProps>({
    form: 'add-task',
    validate
})(AddTask);
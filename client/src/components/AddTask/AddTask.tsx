import React from 'react';
import './addTask.css';
// import { FormState, ChangeTitleAction, ChangeDescriptionAction, ChangeFieldsErrorAction } from '../../types/form';
import { reduxForm, Field, SubmitHandler } from 'redux-form';
import renderField from './renderField';
import validate from './validate';

// interface AddTaskProps extends FormData {
//     error: string|null;
//     addTaskToList: (titleValue: string, descriptionValue: string) => void;
//     changeTitle: (title: string) => ChangeTitleAction;
//     changeDescription: (description: string) => ChangeDescriptionAction;
//     changeFieldsError: (error: string | null) => ChangeFieldsErrorAction;
//     onSubmit: (values: any) => void,
// }

// type AllSampleFormProps = AddTaskProps & InjectedFormProps<FormData, AddTaskProps>;

const AddTask: React.FC<any> = (props: any) => {
    const {
        addTaskToList,
        // changeTitle,
        // changeDescription,
        // changeFieldsError,
        title,
        description,
        error,
    } = props;

    const onSubmit = (values: React.FormEvent) => {
        values.preventDefault();

        if (!Object.keys(validate({
            title,
            description
        })).length) {
            addTaskToList(title, description);
        }
    }

    return <form className="todo--form"
        onSubmit={onSubmit}>
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

export default reduxForm({
    form: 'add-task',
    validate
})(AddTask) as any;
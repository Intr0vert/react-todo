import React, { useCallback } from 'react';
import './addTask.css';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import renderField from './renderField';
import validate from './validate';
import { Button } from '@material-ui/core';

interface FormData {
  title: string;
  description?: string | undefined;
}

interface AddTaskProps extends FormData {
  addTaskToList: (titleValue: string, descriptionValue: string) => void;
}

const AddTask: React.FC<
  InjectedFormProps<FormData, AddTaskProps> & AddTaskProps
> = (props: InjectedFormProps<FormData, AddTaskProps> & AddTaskProps) => {
  const { addTaskToList, title, description, handleSubmit, reset } = props;

  const onSubmit = useCallback(
    (values: FormData) => {
      const { title, description } = values;

      addTaskToList(title, description || '');
      reset();
    },
    [addTaskToList, reset]
  );
  const formSubmit = useCallback(() => handleSubmit(onSubmit), [
    handleSubmit,
    onSubmit,
  ]);

  return (
    <form className="todo--form" onSubmit={formSubmit()}>
      <h4>Add task</h4>
      <Field
        fieldName={'Title'}
        name={'title'}
        type="text"
        value={title}
        placeholder="Type title here..."
        maxLength={32}
        component={renderField}
      />
      <Field
        fieldName={'Description'}
        name={'description'}
        type="text"
        value={description}
        placeholder="Type description here..."
        maxLength={180}
        component={renderField}
      />
      <Button type="submit" color="primary" variant="contained">
        Add
      </Button>
    </form>
  );
};

export default reduxForm<FormData, AddTaskProps>({
  form: 'add-task',
  validate,
})(AddTask);

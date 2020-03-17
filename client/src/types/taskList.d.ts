import { Todo } from './todo';
import { FormState } from './preloader';

export interface ITaskListProps {
    preloader: FormState;
    todos: Array<Todo>
}
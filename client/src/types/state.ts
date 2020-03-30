import { TodoState } from '../types/todos';
import { FormState } from './form';

export interface State {
    todos: TodoState;
    // form: FormState;
    form: any;
}
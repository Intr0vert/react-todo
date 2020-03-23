// import { Todo } from './todos';
import { Todo } from '../types/todos';

export interface TodoElProps {
    todo: Todo;
    changeCheckbox: (_id: string, isDone: boolean) => void;
    deleteTaskFromList: (_id: string) => void;
}
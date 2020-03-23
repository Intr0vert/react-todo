import { TodoState } from './todos';

export interface SortProps {
    todos: TodoState;
    changeSort: ()=> void;
}
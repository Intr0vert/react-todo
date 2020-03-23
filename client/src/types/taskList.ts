import { TodoState } from "../types/todos";

export interface TaskListProps {
    todos: TodoState;
    changeCheckbox: (_id: string, isDone: boolean) => void;
    deleteTaskFromList: (_id: string) => void;
}
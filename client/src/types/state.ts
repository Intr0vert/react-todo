import { TodoState } from '../types/todos';

interface FormState {
  title: string;
  description: string;
}

export interface State {
  todos: TodoState;
  form: FormState;
}

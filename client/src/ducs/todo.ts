import { Todo, TodoAction } from '../types/todo';

export const ADD_TODO = "ADD_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const UPDATE_CHECKBOX = "UPDATE_CHECKBOX";

const AddTodo = (todo: Todo): TodoAction => ({
    type: ADD_TODO,
    payload: todo
});

const UpdateCheckbox = (_id: string, isDone: boolean): TodoAction => ({
    type: UPDATE_CHECKBOX,
    payload: {
        _id,
        isDone
    }
});

const UpdateTodo = (_id: string): TodoAction => ({
    type: UPDATE_TODO,
    payload: _id
});

export default function todoReducer(state: Array<Todo> = [], action: TodoAction) {
    switch (action.type) {
        case ADD_TODO:
            return [...state, action.payload];
        case UPDATE_CHECKBOX:
            return updateCheckbox(state, action.payload);
        case UPDATE_TODO:
            return deleteTodo(state, action.payload);
        default:
            return state;
    }
} 

function updateCheckbox(state: Array<Todo>, action: TodoAction) {
    return state.map((el) => el._id === action._id ? { ...el, isDone: !el.isDone } : el);
}

function deleteTodo(state: Array<Todo>, targetId: string) {
    return state.filter((el) => {
        if (el._id === targetId) {
            return false;
        }
        return el;
    });
}

export {
    AddTodo,
    UpdateCheckbox,
    UpdateTodo,
}
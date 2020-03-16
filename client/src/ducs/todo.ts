export const ADD_TODO = "ADD_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const UPDATE_CHECKBOX = "UPDATE_CHECKBOX";


const AddTodo = (todo: Object): object => ({
    type: ADD_TODO,
    todo
});

const UpdateCheckbox = (id: number, isDone: boolean): object => ({
    type: UPDATE_CHECKBOX,
    id,
    isDone
});

const UpdateTodo = (id: number): object => ({
    type: UPDATE_TODO,
    id
});

export default function todoReducer(state: Array<Object> = [], action: any) {
    switch (action.type) {
        case ADD_TODO:
            return [...state, action.todo];
        case UPDATE_CHECKBOX:
            return updateCheckbox(state, action);
        case UPDATE_TODO:
            return updateTodo(state, action);
        default:
            return state;
    }
} 

function updateCheckbox(state: Array<any>, action: any) {
    return state.map((el) => {
        if (el._id === action.id) {
            el.isDone = !el.isDone;
        }
        return el;
    });
}

function updateTodo(state: Array<any>, action: any) {
    return state.filter((el) => {
        if (el._id === action.id) {
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
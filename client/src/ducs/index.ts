export const ADD_TODO = "ADD_TODO";

export const AddTodo = (todo: Object) : object => ({
    type: ADD_TODO,
    todo
});

export default function reducer(state:Array<Object> = [], action:any) {
    switch(action.type) {
        case ADD_TODO:
            return [...state, action.todo];
        default:
            return state;
    }
}
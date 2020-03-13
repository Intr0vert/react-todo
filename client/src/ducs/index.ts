import {combineReducers} from 'redux';

export const ADD_TODO = "ADD_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const UPDATE_CHECKBOX = "UPDATE_CHECKBOX";
export const FETCH_STARTED = "FETCH_STARTED";
export const DATA_RECEIVED = "DATA_RECEIVED";
export const DATA_ERROR = "DATA_ERROR";

const AddTodo = (todo: Object) : object => ({
    type: ADD_TODO,
    todo
});

const UpdateCheckbox = (id: number, isDone: boolean) : object => ({
    type: UPDATE_CHECKBOX,
    id,
    isDone
});

const UpdateTodo = (id: number) : object => ({
    type: UPDATE_TODO,
    id
});

const FetchStarted = () : object => ({
    type: FETCH_STARTED,
    payload: {
        fetchDone: false,
        error: null,
    }
});

const DataReceived = () : object => ({
    type: DATA_RECEIVED,
    payload: {
        fetchDone: true,
        error: null,
    }
});

const DataError = (error: string) : object => ({
    type: DATA_ERROR,
    payload: {
        fetchDone: true,
        error
    }
});

function todoReducer(state:Array<Object> = [], action:any) {
    switch(action.type) {
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

function preloaderReducer(state:Object = {}, action:any) {
    switch(action.type) {
        case FETCH_STARTED:
            return action.payload;
        case DATA_RECEIVED:
            return action.payload;
        case DATA_ERROR:
            return action.payload;
        default:
            return state;
    }
}

const rootReducer = combineReducers({todoReducer, preloaderReducer});
export default rootReducer;

const rootAction = {
    AddTodo,
    UpdateCheckbox,
    UpdateTodo,
    FetchStarted,
    DataReceived,
    DataError
};

export {rootAction};
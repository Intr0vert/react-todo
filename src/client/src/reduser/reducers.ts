import {INCREMENT, DECREMENT} from './actions';

export function counter(state = 0, action: any) : any {
    switch(action.type) {
        case INCREMENT:
            return state + action.n;
        case DECREMENT:
            return state - action.n;
        default:
            return state;
    }
}
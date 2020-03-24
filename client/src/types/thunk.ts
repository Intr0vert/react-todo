import { ThunkAction } from 'redux-thunk';
// import { AnyAction } from 'redux';
import { State } from './state';
import { Action } from 'redux';

export type AppThunk<ReturnType = void> = ThunkAction<
        ReturnType,
        State,
        unknown,
        any
    >

export type getTodoDataThunk<ReturnType = void> = ThunkAction<
        ReturnType,
        State,
        unknown,
        Action<any>
    >
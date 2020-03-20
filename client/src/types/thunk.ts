import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { State } from './state';

export type AppThunk<ReturnType = void> = AnyAction|ThunkAction<
        ReturnType,
        State,
        unknown,
        any
    >
import { ThunkAction, ThunkMiddleware } from 'redux-thunk';
import { Action, AnyAction } from 'redux';
import { IState } from './state';

export type AppThunk<ReturnType = void> = AnyAction|ThunkAction<
        ReturnType,
        IState,
        void
    >
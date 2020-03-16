import { Action } from 'redux'

export interface AbstractAction<TType, TPayload> extends Action<TType> {
    payload: TPayload;
}

export interface Fetch {
    fetchDone: boolean;
    error: string|null;
}

export type FetchStatus = AbstractAction<typeof FETCH_STARTED | typeof DATA_RECEIVED | typeof DATA_ERROR, Fetch>;
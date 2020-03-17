import { FetchStatus, Fetch } from '../types/preloader';

export const FETCH_STARTED = "FETCH_STARTED";
export const DATA_RECEIVED = "DATA_RECEIVED";
export const DATA_ERROR = "DATA_ERROR";

const FetchStarted = (): FetchStatus => ({
    type: FETCH_STARTED,
    payload: {
        fetchDone: false,
        error: null,
    }
});

const DataReceived = (): FetchStatus => ({
    type: DATA_RECEIVED,
    payload: {
        fetchDone: true,
        error: null,
    }
});

const DataError = (error: string): FetchStatus => ({
    type: DATA_ERROR,
    payload: {
        fetchDone: true,
        error
    }
});

export default function preloaderReducer(state: Fetch = {}, action: FetchStatus) {
    switch (action.type) {
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

export {
    FetchStarted,
    DataReceived,
    DataError
}
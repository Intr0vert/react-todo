import { Action } from 'redux';

export interface AbstractAction<TType, TPayload> extends Action<TType> {
  payload: TPayload;
}

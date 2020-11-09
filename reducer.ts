import { FactsResponse } from './factsService';

export type CatFactsState = {
  status: 'loading' | 'success' | 'error';
  isFetchingMore: boolean;
  facts: FactsResponse;
  error: string | null;
};

export enum Types {
  Request = 'REQUEST',
  Success = 'SUCCESS',
  Error = 'ERROR',
  RequestMore = 'REQUEST_MORE',
  SuccessMore = 'SUCCESS_MORE',
  ErrorMore = 'ERROR_MORE',
}

type Action =
  | { type: Types.Request }
  | { type: Types.Success; payload: { results: FactsResponse } }
  | { type: Types.Error; payload: { error: string } }
  | { type: Types.RequestMore }
  | { type: Types.SuccessMore; payload: { results: FactsResponse } }
  | { type: Types.ErrorMore; payload: { error: string } };

export const catFactsReducer = (
  state: CatFactsState,
  action: Action
): CatFactsState => {
  switch (action.type) {
    case Types.Request:
      return { ...state, status: 'loading' };
    case Types.Success:
      return { ...state, status: 'success', facts: action.payload.results };
    case Types.Error:
      return { ...state, status: 'error', error: action.payload.error };
    case Types.RequestMore:
      return { ...state, isFetchingMore: true };
    case Types.SuccessMore:
      return {
        ...state,
        isFetchingMore: false,
        facts: [...state.facts, ...action.payload.results],
      };
    case Types.ErrorMore:
      return { ...state, isFetchingMore: false, error: action.payload.error };
    default:
      return state;
  }
};

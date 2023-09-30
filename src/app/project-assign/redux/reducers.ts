import { Action, SAVED_TRUE, SAVED_FALSE } from './actions';

export interface AppState {
  savedState: boolean;
}

const initialState: AppState = {
    savedState: true,
};

export const savedReducer = (state = initialState, action: Action): AppState => {
  switch (action.type) {
    case SAVED_TRUE:
      return { ...state, savedState: true };
    case SAVED_FALSE:
      return { ...state, savedState: false };
    default:
      return state;
  }
};

export const SAVED_TRUE = 'SAVED_TRUE';
export const SAVED_FALSE = 'SAVED_FALSE';

export interface SavedTrue {
  type: typeof SAVED_TRUE;
}

export interface SavedFalse {
  type: typeof SAVED_FALSE;
}

export type Action = SavedTrue | SavedFalse;

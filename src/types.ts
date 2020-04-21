import { Action } from "redux";

export interface TempDataRecord {
  data?: unknown;
  validRoutes: string[];
  cleanupAction?: Action;
}

export type TempDataState = Record<string, TempDataRecord>;

export interface TempDataRootState {
  tempData: TempDataState;
}

export type SelectorFunction<T, U> = (data: T) => U;

export enum UpdateMode {
  Replace = 1,
  Append,
  Prepend
}

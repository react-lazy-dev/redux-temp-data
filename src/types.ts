export interface TempDataRecord {
  data: unknown;
  validRoutes: string[];
}

export type TempDataState = Record<string, TempDataRecord>;

export interface TempDataRootState {
  tempData: TempDataState;
}

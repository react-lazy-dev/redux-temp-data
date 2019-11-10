import { TempDataRootState, SelectorFunction } from "./types";

export function getTempRecord(
  state: TempDataRootState,
  name: string
) {
  const tempData = state.tempData[name];

  if (!tempData) {
    return;
  }

  return tempData;
}

export function getTempData<T, U = T>(
  state: TempDataRootState,
  name: string,
  selector?: SelectorFunction<T, U>
): U | undefined {
  const tempData = getTempRecord(state, name);

  if (!tempData) {
    return;
  }

  return selector ? selector(tempData.data as T) : (tempData.data as U);
}

export function getTempValidRoutes(state: TempDataRootState, name: string) {
  const tempData = getTempRecord(state, name);

  if (!tempData) {
    return [];
  }

  return tempData.validRoutes;
}

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

// An overload to get data just with name
export function getTempData<T>(
  state: TempDataRootState,
  name: string
): T | undefined;

// Another overload to get data with name and selector function
export function getTempData<T, U>(
  state: TempDataRootState,
  name: string,
  selector: SelectorFunction<T, U>
): U | undefined;

// The main data selector implementation
export function getTempData<T, U>(
  state: TempDataRootState,
  name: string,
  selector?: SelectorFunction<T, U>
): U | undefined {
  const tempData = getTempRecord(state, name);

  if (tempData === undefined) {
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

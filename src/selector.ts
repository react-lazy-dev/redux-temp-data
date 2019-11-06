import { TempDataRootState, SelectorFunction } from "./types";

// An overload to get data just with name
function getTempData<T>(
  state: TempDataRootState,
  name: string
): T | undefined;

// Another overload to get data with name and selector function
function getTempData<T, U>(
  state: TempDataRootState,
  name: string,
  selector: SelectorFunction<T, U>
): U | undefined;

// The main data selector implementation
function getTempData<T, U>(
  state: TempDataRootState,
  name: string,
  selector?: SelectorFunction<T, U>
): U | undefined {
  const tempData = state.tempData[name];

  if (tempData === undefined) {
    return;
  }

  return selector ? selector(tempData.data as T) : (tempData.data as U);
}

export default getTempData;

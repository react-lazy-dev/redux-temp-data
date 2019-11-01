import { TempDataRootState, SelectorFunction } from "./types";

export function getTempData<T, U = T>(
  state: TempDataRootState,
  name: string,
  selector?: SelectorFunction<T, U>
): U | undefined {
  const tempData = state.tempData[name];

  if (!tempData) {
    return;
  }

  return selector ? selector(tempData.data as T) : (tempData.data as U);
}

export default getTempData;

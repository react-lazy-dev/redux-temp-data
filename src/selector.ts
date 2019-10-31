import { TempDataState } from "./reducer";

export function getTempData<T, I = T>(
  state: TempDataState,
  name: string,
  selector?: (temp: T) => I
): I | undefined {
  const temp = state.tempData[name] as unknown;

  if (temp && selector) {
    return selector(temp as T);
  }

  return temp as I;
}
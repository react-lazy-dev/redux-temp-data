import { useSelector, shallowEqual } from "react-redux";
import { TempDataRootState, SelectorFunction } from "./types";
import { getTempData } from "./selectors";

// An overload to get data just with name
function useTempData<T>(name: string): T | undefined;

// Another overload to get data with name and selector function
function useTempData<T, U>(
  name: string,
  selector: SelectorFunction<T, U>
): U | undefined;

// The main hook implementation
function useTempData<T, U>(
  name: string,
  selector?: SelectorFunction<T, U>
): U | undefined {
  const tempData = useSelector(
    (state: TempDataRootState) => getTempData<T, U>(state, name, selector!),
    shallowEqual
  );

  return tempData;
}

export default useTempData;

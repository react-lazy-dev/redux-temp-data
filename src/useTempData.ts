import { useSelector, shallowEqual } from "react-redux";
import { TempDataState } from "./reducer";
import { getTempData } from "./selector";

function useTempData<T, I = T>(
  name: string,
  selector?: (temp: T) => I
): I | undefined {
  const tempData = useSelector(
    (state: TempDataState) => getTempData<T, I>(state, name, selector),
    shallowEqual
  );

  return tempData;
}

export default useTempData;
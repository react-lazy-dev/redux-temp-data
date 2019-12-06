import { History } from "history";
import { Store } from "redux";
import { TempDataRootState } from "./types";
import { cleanupTempData } from "./actions";

const setupCleanup = (history: History, store: Store<TempDataRootState>) => {
  return history.listen(location => {
    store.dispatch(cleanupTempData(location, store.dispatch));
  });
};

export default setupCleanup;

import { History } from "history";
import { Store, Action, AnyAction } from "redux";
import { TempDataRootState } from "./types";
import { cleanupTempData } from "./actions";

const setupCleanup = (history: History, store: Store<TempDataRootState>) => {
  return history.listen(location => {
    // define async actions list
    const asyncActions: Action[] = [];
    function asyncDispatch<T extends Action = AnyAction>(action: T) {
      asyncActions.push(action);
      return action;
    }

    // dispatch the main action
    store.dispatch(cleanupTempData(location, asyncDispatch));

    // dispatch all async actions
    asyncActions.forEach(asyncAction => store.dispatch(asyncAction));
  });
};

export default setupCleanup;

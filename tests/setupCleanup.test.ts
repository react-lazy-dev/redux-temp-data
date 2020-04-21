import { History } from "history";
import { Store } from "redux";
import setupCleanup from "../src/setupCleanup";
import { TempDataRootState } from "../src/types";
import { CleanupTempDataAction } from "../src/actions";
import actionTypes from "../src/actionTypes";

describe("The setupCleanup tests", () => {
  test("It should subscribe to history change and dispatch the cleanupTempData on history change", () => {
    const historyListen = jest.fn();
    const history = { listen: historyListen };

    const storeDispatch = jest.fn();
    const store = { dispatch: storeDispatch };

    setupCleanup(
      (history as unknown) as History,
      (store as unknown) as Store<TempDataRootState>
    );

    // a new listener must be listen to the history changes
    expect(historyListen).toBeCalled();

    // call the history change event manually
    const location = { pathname: "/test/path" };
    historyListen.mock.calls[0][0](location);

    // a new action must be dispatched to cleanup expired records
    const action: CleanupTempDataAction = storeDispatch.mock.calls[0][0];
    expect(action.type).toBe(actionTypes.cleanup);
  });
});

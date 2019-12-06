import { TempDataState, UpdateMode } from "./types";
import {
  InitTempDataAction,
  UpdateTempDataAction,
  DestroyTempDataAction,
  CleanupTempDataAction
} from "./actions";
import actionTypes from "./actionTypes";
import {
  isBothArray,
  isBothObject,
  getUpdatedArray,
  getUpdatedObject
} from "./helpers";

function reducer(
  state: TempDataState = {},
  action:
    | InitTempDataAction
    | UpdateTempDataAction
    | DestroyTempDataAction
    | CleanupTempDataAction
) {
  switch (action.type) {
    case actionTypes.init: {
      const initAction = action as InitTempDataAction;

      if (state[initAction.name]) {
        throw new Error("The `" + initAction.name + "` record exists.");
      }

      return {
        ...state,
        [initAction.name]: {
          data: initAction.initialData,
          validRoutes: initAction.validRoutes,
          cleanupAction: initAction.cleanupAction
        }
      };
    }

    case actionTypes.update: {
      const updateAction = action as UpdateTempDataAction;

      if (!state[updateAction.name]) {
        throw new Error(
          "The `" +
            updateAction.name +
            "` record does not initialize yet. You have to init a record before updating it."
        );
      }
      const oldState = state[updateAction.name];

      let newData;
      if (updateAction.updateMode !== UpdateMode.Replace) {
        if (isBothArray(oldState.data, updateAction.data)) {
          newData = getUpdatedArray(
            updateAction.updateMode,
            oldState.data as unknown[],
            updateAction.data as unknown[]
          );
        } else if (isBothObject(oldState.data, updateAction.data)) {
          newData = getUpdatedObject(
            updateAction.updateMode,
            oldState.data as object,
            updateAction.data as object
          );
        } else {
          newData = updateAction.data;
        }
      } else {
        newData = updateAction.data;
      }

      return {
        ...state,
        [updateAction.name]: {
          ...oldState,
          data: newData
        }
      };
    }

    case actionTypes.destroy: {
      const destroyAction = action as DestroyTempDataAction;
      const newState = { ...state };
      delete newState[destroyAction.name];
      return newState;
    }

    case actionTypes.cleanup: {
      const cleanupAction = action as CleanupTempDataAction;
      const newState = { ...state };
      const pathname = cleanupAction.location.pathname;
      let isChanged = false;

      for (const name in newState) {
        if (newState[name].validRoutes.length > 0) {
          let isValid = false;

          for (const route of newState[name].validRoutes) {
            if (pathname.match(route)) {
              isValid = true;
              break;
            }
          }

          if (!isValid) {
            if (newState[name].cleanupAction) {
              cleanupAction.dispatch(newState[name].cleanupAction!);
            }
            delete newState[name];
            isChanged = true;
          }
        }
      }

      return isChanged ? newState : state;
    }

    default:
      return state;
  }
}

export default reducer;

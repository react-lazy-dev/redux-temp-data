import { TempDataState } from "./types";
import {
  InitTempDataAction,
  UpdateTempDataAction,
  DestroyTempDataAction,
  CleanupTempDataAction
} from "./actions";
import actionTypes from "./actionTypes";
import { isBothArray, isBothObject } from "./helpers";

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
          validRoutes: initAction.validRoutes
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
      if (updateAction.appendDataIfPossible) {
        if (isBothArray(oldState.data, updateAction.data)) {
          newData = [
            ...(oldState.data as unknown[]),
            ...(updateAction.data as unknown[])
          ];
        } else if (isBothObject(oldState.data, updateAction.data)) {
          newData = { ...(oldState.data as object), ...(updateAction.data as object) };
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
            delete newState[name];
          }
        }
      }

      return newState;
    }

    default:
      return state;
  }
}

export default reducer;

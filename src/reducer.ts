import { TempDataState } from "./types";
import {
  InitTempDataAction,
  UpdateTempDataAction,
  DestroyTempDataAction,
  CleanupTempDataAction
} from "./actions";
import actionTypes from "./actionTypes";

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
        if (
          typeof oldState.data === "object" &&
          typeof updateAction.data === "object"
        ) {
          newData = { ...oldState.data, ...updateAction.data };
        } else if (Array.isArray(oldState.data) && Array.isArray(updateAction.data)) {
          newData = [...oldState.data, ...updateAction.data];
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

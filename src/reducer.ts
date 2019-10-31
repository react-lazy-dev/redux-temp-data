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
  action: InitTempDataAction | UpdateTempDataAction | DestroyTempDataAction | CleanupTempDataAction
) {
  switch (action.type) {
    case actionTypes.init: {
      const initAction = action as InitTempDataAction;
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
      const oldData = state[updateAction.name].data;
      
      let newData;
      if (updateAction.appendDataIfPossible) {
        if (
          typeof oldData === "object" &&
          typeof updateAction.data === "object"
        ) {
          newData = { ...oldData, ...updateAction.data };
        } else if (Array.isArray(oldData) && Array.isArray(updateAction.data)) {
          newData = [...oldData, ...updateAction.data];
        } else {
          newData = updateAction.data;
        }
      } else {
        newData = updateAction.data;
      }

      return {
        ...state,
        [updateAction.name]: {
          ...oldData,
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
      const newState = {...state};
      const pathname = cleanupAction.location.pathname

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

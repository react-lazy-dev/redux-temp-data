import { TempDataState } from "./types";
import {
  InitTempDataAction,
  UpdateTempDataAction,
  DestroyTempDataAction
} from "./actions";
import actionTypes from "./actionTypes";

function reducer(
  state: TempDataState = {},
  action: InitTempDataAction | UpdateTempDataAction | DestroyTempDataAction
) {
  switch (action.type) {
    case actionTypes.init: {
      const initAction = action as InitTempDataAction;
      return {
        ...state,
        [action.name]: {
          data: initAction.initialData,
          validRoutes: initAction.validRoutes
        }
      };
    }

    case actionTypes.update: {
      if (!state[action.name]) {
        throw new Error(
          "The `" +
            action.name +
            "` record does not initialize yet. You have to init a record before updating it."
        );
      }
      const oldData = state[action.name].data;
      const updateAction = action as UpdateTempDataAction;
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
        [action.name]: {
          ...oldData,
          data: newData
        }
      };
    }

    case actionTypes.destroy: {
      const newState = { ...state };
      delete newState[action.name];
      return newState;
    }

    default:
      return state;
  }
}

export default reducer;

import actionTypes from "./actionTypes";
import { Location } from "history";
import { UpdateMode } from "./types";
import { Action, Dispatch } from "redux";

export const initTempData = <T>(
  name: string,
  initialData?: T,
  validRoutes: string[] = [],
  cleanupAction?: Action
) => ({
  type: actionTypes.init,
  name,
  initialData,
  validRoutes,
  cleanupAction
});
export type InitTempDataAction = ReturnType<typeof initTempData>;

export const updateTempData = <T>(
  name: string,
  data: T,
  updateMode = UpdateMode.Replace
) => ({
  type: actionTypes.update,
  name,
  data,
  updateMode
});
export type UpdateTempDataAction = ReturnType<typeof updateTempData>;

export const destroyTempData = (name: string) => ({
  type: actionTypes.destroy,
  name
});
export type DestroyTempDataAction = ReturnType<typeof destroyTempData>;

export const cleanupTempData = (location: Location, dispatch: Dispatch) => ({
  type: actionTypes.cleanup,
  location,
  dispatch
});
export type CleanupTempDataAction = ReturnType<typeof cleanupTempData>;

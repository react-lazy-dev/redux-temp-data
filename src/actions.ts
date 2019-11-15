import actionTypes from "./actionTypes";
import { Location } from "history";

export const initTempData = <T>(
  name: string,
  initialData: T,
  validRoutes: string[] = []
) => ({
  type: actionTypes.init,
  name,
  initialData,
  validRoutes
});
export type InitTempDataAction = ReturnType<typeof initTempData>;

export const updateTempData = <T>(
  name: string,
  data: T,
  appendDataIfPossible = false
) => ({
  type: actionTypes.update,
  name,
  data,
  appendDataIfPossible
});
export type UpdateTempDataAction = ReturnType<typeof updateTempData>;

export const destroyTempData = (name: string) => ({
  type: actionTypes.destroy,
  name
});
export type DestroyTempDataAction = ReturnType<typeof destroyTempData>;

export const cleanupTempData = (location: Location) => ({
  type: actionTypes.cleanup,
  location
});
export type CleanupTempDataAction = ReturnType<typeof cleanupTempData>;

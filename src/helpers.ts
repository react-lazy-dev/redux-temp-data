import { UpdateMode } from "./types";

export function isBothArray(value1: unknown, value2: unknown) {
  return Array.isArray(value1) && Array.isArray(value2);
}

export function isBothObject(value1: unknown, value2: unknown) {
  return isPlainObject(value1) && isPlainObject(value2);
}

export function hasSameArrayOrObjectType(value1: unknown, value2: unknown) {
  return isBothArray(value1, value2) || isBothObject(value1, value2);
}

export function getUpdatedArray(
  updateMode: UpdateMode,
  oldArray: unknown[],
  newArray: unknown[]
) {
  if (updateMode === UpdateMode.Append) {
    return [...oldArray, ...newArray];
  } else if (updateMode === UpdateMode.Prepend) {
    return [...newArray, ...oldArray];
  } else {
    return newArray;
  }
}

export function getUpdatedObject(
  updateMode: UpdateMode,
  oldObject: object,
  newObject: object
) {
  if (updateMode === UpdateMode.Append) {
    return { ...oldObject, ...newObject };
  } else if (updateMode === UpdateMode.Prepend) {
    return { ...newObject, ...oldObject };
  } else {
    return newObject;
  }
}

export function isPlainObject(obj: unknown) {
  return (
    typeof obj === "object" && // separate from primitives
    obj !== null && // is obvious
    obj.constructor === Object && // separate instances (Array, DOM, ...)
    Object.prototype.toString.call(obj) === "[object Object]"
  ); // separate build-in like Math
}

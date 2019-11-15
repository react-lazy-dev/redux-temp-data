export function isBothArray(value1: unknown, value2: unknown) {
  return Array.isArray(value1) && Array.isArray(value2);
}

export function isBothObject(value1: unknown, value2: unknown) {
  return typeof value1 === "object" && typeof value2 === "object";
}

export function hasSameArrayOrObjectType(value1: unknown, value2: unknown) {
  return isBothArray(value1, value2) || isBothObject(value1, value2);
}
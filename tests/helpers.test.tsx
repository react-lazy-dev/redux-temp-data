import {
  isBothArray,
  isBothObject,
  hasSameArrayOrObjectType,
  isPlainObject,
  getUpdatedArray,
  getUpdatedObject
} from "../src/helpers";
import { UpdateMode } from "../src/types";

const array1 = [1, 2, 3];
const array2 = ["John", "Sara", "Doe"];

const object1 = { name: "John Doe", age: 30 };
const object2 = { type: "Square" };

describe("The getUpdatedObject tests", () => {
  test("It should append arguments if updateMode=UpdateMode.Append", () => {
    expect(getUpdatedObject(UpdateMode.Append, object1, object2)).toEqual({
      ...object1,
      ...object2
    });
  });

  test("It should prepend arguments if updateMode=UpdateMode.Prepend", () => {
    expect(getUpdatedObject(UpdateMode.Prepend, object1, object2)).toEqual({
      ...object2,
      ...object1
    });
  });

  test("It should return the second argument if updateMode=UpdateMode.Replace", () => {
    expect(getUpdatedObject(UpdateMode.Replace, object1, object2)).toBe(
      object2
    );
  });
});

describe("The getUpdatedArray tests", () => {
  test("It should append arguments if updateMode=UpdateMode.Append", () => {
    expect(getUpdatedArray(UpdateMode.Append, array1, array2)).toEqual([
      ...array1,
      ...array2
    ]);
  });

  test("It should prepend arguments if updateMode=UpdateMode.Prepend", () => {
    expect(getUpdatedArray(UpdateMode.Prepend, array1, array2)).toEqual([
      ...array2,
      ...array1
    ]);
  });

  test("It should return the second argument if updateMode=UpdateMode.Replace", () => {
    expect(getUpdatedArray(UpdateMode.Replace, array1, array2)).toBe(array2);
  });
});

describe("The other helper function tests", () => {
  test("The isBothArray tests", () => {
    expect(isBothArray(array1, array2)).toBe(true);
    expect(isBothArray(object1, array2)).toBe(false);
    expect(isBothArray(array1, object2)).toBe(false);
    expect(isBothArray(object1, object2)).toBe(false);
  });

  test("The isBothObject tests", () => {
    expect(isBothObject(object1, object2)).toBe(true);
    expect(isBothObject(array1, object2)).toBe(false);
    expect(isBothObject(object1, array2)).toBe(false);
    expect(isBothObject(object1, array2)).toBe(false);
  });

  test("The hasSameArrayOrObjectType tests", () => {
    expect(hasSameArrayOrObjectType(object1, object2)).toBe(true);
    expect(hasSameArrayOrObjectType(array1, array2)).toBe(true);
    expect(hasSameArrayOrObjectType(object1, array2)).toBe(false);
  });

  test("The isPlainObject tests", () => {
    expect(isPlainObject(object1)).toBe(true);
    expect(isPlainObject(array2)).toBe(false);
    expect(isPlainObject("test string")).toBe(false);
    expect(isPlainObject(new Date())).toBe(false);
  });
});

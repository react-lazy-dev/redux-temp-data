import reducer from "../src/reducer";
import { initTempData, updateTempData } from "../src/actions";
import { isBothArray, isBothObject } from "../src/helpers";

const tempDataName1 = "temp-data-name-1";
const tempData1 = {
  sampleKey1: "sampleValue1",
  sampleKey2: "sampleValue2",
  sampleKey3: "sampleValue3"
};

const tempDataName2 = "temp-data-name-2";
const tempData2 = true;

const tempDataName3 = "temp-data-name-3";
const tempData3 = "A sample string";

const tempDataName4 = "temp-data-name-4";
const tempData4 = ["i1", "i2"];

const validRoutes = ["r1", "r2", "r3"];

describe("The initTempData action tests", () => {
  test("It should init the record if it does not exist", () => {
    const nextState = reducer({}, initTempData(tempDataName1, tempData1));
    expect(nextState).toHaveProperty(tempDataName1);
  });

  test("It should raise an error if a record with the same name exists before", () => {
    const state1 = reducer({}, initTempData(tempDataName1, tempData1));
    expect(() => {
      reducer(state1, initTempData(tempDataName1, tempData1));
    }).toThrowError();
  });

  test("It should init multiple records with no issue", () => {
    const state1 = reducer({}, initTempData(tempDataName1, tempData1));
    const state2 = reducer(state1, initTempData(tempDataName2, tempData2));
    const state3 = reducer(state2, initTempData(tempDataName3, tempData3));

    expect(state3).toHaveProperty(tempDataName1);
    expect(state3).toHaveProperty(tempDataName2);
    expect(state3).toHaveProperty(tempDataName3);
  });

  test("It should init record and store data and validRoutes correctly", () => {
    const state = reducer(
      {},
      initTempData(tempDataName1, tempData1, validRoutes)
    );
    expect(state[tempDataName1].data).toBe(tempData1);
    expect(state[tempDataName1].validRoutes).toBe(validRoutes);
  });
});

describe("The updateTempData action tests", () => {
  test("It should raise an error if there is no record with the name", () => {
    expect(() => {
      reducer({}, updateTempData(tempDataName1, tempData2));
    }).toThrowError();
  });

  test("It should update the record data correctly and does not affect the valid routes", () => {
    const state1 = reducer(
      {},
      initTempData(tempDataName1, tempData1, validRoutes)
    );
    const state2 = reducer(state1, updateTempData(tempDataName1, tempData2));
    expect(state2[tempDataName1].data).toBe(tempData2);
    expect(state2[tempDataName1].validRoutes).toBe(validRoutes);
  });

  test("It should replace the record data by default regardless of the data type", () => {
    const finalValues = [tempData1, tempData2, tempData3, tempData4];
    const initialValues = [{ init1: "init 1" }, ["init 2", "init 3"]];
    initialValues.forEach(initValue => {
      finalValues.forEach(finalValue => {
        const state1 = reducer({}, initTempData(tempDataName4, initValue));
        const state2 = reducer(
          state1,
          updateTempData(tempDataName4, finalValue)
        );
        expect(state2[tempDataName4].data).toBe(finalValue);
      });
    });
  });

  test("It should try to append new value if the both previous and data types is object/array and appendDataIfPossible = true", () => {
    const finalValues = [tempData1, tempData2, tempData3, tempData4];
    const initialValues = [
      true,
      "sample string",
      { init1: "init 1" },
      ["init 2", "init 3"]
    ];
    initialValues.forEach(initValue => {
      finalValues.forEach(finalValue => {
        const state1 = reducer({}, initTempData(tempDataName4, initValue));
        const state2 = reducer(
          state1,
          updateTempData(tempDataName4, finalValue, true)
        );

        if (isBothArray(initValue, finalValue)) {
          expect(state2[tempDataName4].data).toEqual([...(initValue as unknown[]), ...(finalValue as unknown[])]);
        } else if( isBothObject(initValue, finalValue) ) {
          expect(state2[tempDataName4].data).toEqual({...(initValue as object), ...(finalValue as object)});
        } else {
          expect(state2[tempDataName4].data).toBe(finalValue);
        }
      });
    });
  });
});

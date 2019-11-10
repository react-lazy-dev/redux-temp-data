import reducer from "../src/reducer";
import { initTempData } from "../src/actions";

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

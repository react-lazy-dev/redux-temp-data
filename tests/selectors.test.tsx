import {
  getTempRecord,
  getTempValidRoutes,
  getTempData
} from "../src/selectors";
import reducer from "../src/reducer";
import { initTempData } from "../src/actions";
import { TempDataRootState } from "../src/types";

const tempDataName = "temp-data-name";
const tempData = {
  sampleKey1: "sampleValue1",
  sampleKey2: {
    innerKey1: true,
    innerKey2: ["a", "b", "c"]
  }
};
const validRoutes = ["/route1", "/route1/pathname", "/route3/test"];

const state: TempDataRootState = {
  tempData: reducer({}, initTempData(tempDataName, tempData, validRoutes))
};

describe("The getTempRecord tests", () => {
  test("It should select the record correctly", () => {
    const record = getTempRecord(state, tempDataName)!;
    expect(record.data).toBe(tempData);
    expect(record.validRoutes).toBe(validRoutes);
  });

  test("It should return undefined if the record doest not exists", () => {
    expect(getTempRecord(state, "invalidName")).toBeUndefined();
  });
});

describe("The getTempValidRoutes tests", () => {
  test("It should return validRoutes properly", () => {
    expect(getTempValidRoutes(state, tempDataName)).toBe(validRoutes);
  });

  test("It should return undefined if the record doest not exist", () => {
    expect(getTempValidRoutes(state, "invalidName")).toBeUndefined();
  });
});

describe("The getTempData tests", () => {
  test("Should return the record data if there is no selector function", () => {
    expect(getTempData(state, tempDataName)).toBe(tempData);
  });

  test("Should return only the selected data in the selector function is passed", () => {
    const selector = (data: typeof tempData) => data.sampleKey2.innerKey2;
    expect(getTempData(state, tempDataName, selector)).toBe(selector(tempData));
  });

  test("Should return undefined if the record does not exist", () => {
    expect(getTempData(state, "invalidName")).toBeUndefined();
  });
});

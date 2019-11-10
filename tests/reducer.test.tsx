import reducer from "../src/reducer";
import { initTempData } from "../src/actions";

const tempDataName = "temp-data-name";
const tempData = {
  sampleKey1: "sampleValue1",
  sampleKey2: "sampleValue2",
  sampleKey3: "sampleValue3"
};
// const validRoutes = ["r1", "r2", "r3"];

describe("The reducer tests", () => {
  test("It should init the record if it does not exist", () => {
    const nextState = reducer({}, initTempData(tempDataName, tempData));
    expect(nextState).toHaveProperty(tempDataName);
  });
});

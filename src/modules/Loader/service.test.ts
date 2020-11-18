import { data } from "@/../data";
import { getData } from "./service";

describe("Currency services tests cases", () => {
  it("Is fetching data work correct", async () => {
    expect(await getData().then((data) => data)).toEqual(data);
  });
});

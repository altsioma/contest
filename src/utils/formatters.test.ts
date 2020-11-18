import { formatDate, formatNumber } from "./formatters";

describe("Formatters tets", () => {
  it("date format with show weekday and day work correctly", () => {
    expect(formatDate(1551916800000, true, true)).toEqual("Thu, Mar 7");
  });

  it("date format with show day only work correctly", () => {
    expect(formatDate(1551916800000, false, true)).toEqual("Mar 7");
  });

  it("date format with wrong input date is empty string", () => {
    expect(formatDate("Wrong value", false, false)).toEqual("");
  });

  it("Number format with show weekday and day work correctly", () => {
    expect(formatNumber(1000, true)).toEqual("1K");
  });

  it("Number format with show day only work correctly", () => {
    expect(formatNumber(1000000, true)).toEqual("1M");
  });

  it("Number format with wrong input date is empty string", () => {
    const number = 15519168;
    expect(formatNumber(number, false)).toEqual(number.toLocaleString());
  });
});

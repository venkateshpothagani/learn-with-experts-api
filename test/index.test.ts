import printMessage from "../index";

describe("First", () => {
  test("Hello", () => {
    expect(printMessage("Hello")).toBe("Hello");
  });
});

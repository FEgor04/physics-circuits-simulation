import { test, expect, describe } from "vitest";
import { transformVirtualToCanvas } from ".";

describe("trasnformation function", () => {
  test("transforms (0, 0) to center of container", () => {
    const virtual = {
      x: 0,
      y: 0,
    };
    const containerParams = {
      width: 1000,
      height: 500,
    };
    const expected = {
      x: containerParams.width / 2,
      y: containerParams.height / 2,
    };
    expect(transformVirtualToCanvas(virtual, containerParams)).toStrictEqual(
      expected,
    );
  });
});

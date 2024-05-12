import { test, expect, describe } from "vitest";
import { CanvasParams, transformVirtualToCanvas } from ".";

describe("trasnformation function", () => {
  test("transforms (0, 0) to center of container", () => {
    const virtual = {
      x: 0,
      y: 0,
    };
    const containerParams: CanvasParams = {
      width: 1000,
      height: 500,
      schemeWidth: 10,
      schemeHeight: 10,
    };
    const expected = {
      x: containerParams.width / 2,
      y: containerParams.height / 2,
    };
    expect(transformVirtualToCanvas(virtual, containerParams)).toStrictEqual(expected);
  });
});

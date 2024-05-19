import { describe, expect, test as it } from "vitest";
import { branchesEqual } from "../lib";
import { Branch } from "../types";

describe("branches equality", () => {
  // Should return true if two branches have the same starting and ending points and the same components
  it("should return true when two branches have the same starting and ending points and the same components", () => {
    const branch1: Branch = {
      id: 1,
      a: { x: 0, y: 0 },
      b: { x: 2, y: 2 },
      components: [
        { _type: "wire", a: { x: 0, y: 0 }, b: { x: 1, y: 1 }, id: 0 },
        { _type: "resistor", a: { x: 1, y: 1 }, b: { x: 2, y: 2 }, resistance: 10, id: 1 },
      ],
    };

    const branch2: Branch = {
      id: 1,
      a: { x: 0, y: 0 },
      b: { x: 2, y: 2 },
      components: [
        { _type: "wire", a: { x: 0, y: 0 }, b: { x: 1, y: 1 }, id: 1 },
        { _type: "resistor", a: { x: 1, y: 1 }, b: { x: 2, y: 2 }, resistance: 10, id: 2 },
      ],
    };

    const result = branchesEqual(branch1, branch2);
    expect(result).toBe(true);
  });

  it("should return true when two branches have inversed starting and ending points and the same components", () => {
    const branch1: Branch = {
      id: 1,
      a: { x: 0, y: 0 },
      b: { x: 2, y: 2 },
      components: [
        { _type: "wire", a: { x: 0, y: 0 }, b: { x: 1, y: 1 }, id: 0 },
        { _type: "resistor", a: { x: 1, y: 1 }, b: { x: 2, y: 2 }, resistance: 10, id: 1 },
      ],
    };

    const branch2: Branch = {
      id: 2,
      b: { x: 0, y: 0 },
      a: { x: 2, y: 2 },
      components: [
        { _type: "resistor", a: { x: 1, y: 1 }, b: { x: 2, y: 2 }, resistance: 10, id: 0 },
        { _type: "wire", a: { x: 0, y: 0 }, b: { x: 1, y: 1 }, id: 1 },
      ],
    };

    const result = branchesEqual(branch1, branch2);
    expect(result).toBe(true);
  });
});

import { expect, test as it, describe } from "vitest";
import { componentsEqual } from "../lib";
import { ElectricalComponent } from "../types";

describe("components equality", () => {
  // Given two identical ElectricalComponent objects, the function should return true.
  it("should return true when given two identical ElectricalComponent objects", () => {
    const component1: ElectricalComponent = {
      _type: "wire",
      a: { x: 0, y: 0 },
      b: { x: 1, y: 1 },
    };
    const component2: ElectricalComponent = {
      _type: "wire",
      a: { x: 0, y: 0 },
      b: { x: 1, y: 1 },
    };
    const result = componentsEqual(component1, component2);
    expect(result).toBe(true);
  });

  // Given two ElectricalComponent objects with different types of components and different coordinates, the function should return false.
  it("should return false when given two ElectricalComponent objects with different types and coordinates", () => {
    const component1: ElectricalComponent = {
      _type: "wire",
      a: { x: 0, y: 0 },
      b: { x: 1, y: 1 },
    };
    const component2: ElectricalComponent = {
      _type: "resistor",
      resistance: 10,
      a: { x: 2, y: 2 },
      b: { x: 3, y: 3 },
    };
    const result = componentsEqual(component1, component2);
    expect(result).toBe(false);
  });

  // Given two ElectricalComponent objects with same types of components and different coordinates, the function should return false.
  it("should return false when given two ElectricalComponent objects with same types and different coordinates", () => {
    const component1: ElectricalComponent = {
      _type: "wire",
      a: { x: 0, y: 0 },
      b: { x: 1, y: 1 },
    };
    const component2: ElectricalComponent = {
      _type: "wire",
      a: { x: 2, y: 2 },
      b: { x: 3, y: 3 },
    };
    const result = componentsEqual(component1, component2);
    expect(result).toBe(false);
  });

});

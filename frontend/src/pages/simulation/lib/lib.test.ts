import { describe, test as it, expect } from "vitest";
import { Resistor } from "@/shared/simulation";
import { SourceDC } from "@/shared/simulation/types";
import { updateComponentCoords } from ".";

describe("Update component coords", () => {
  it("updates resistor correctly", () => {
    const before: Resistor = {
      _type: "resistor",
      a: {
        x: 1,
        y: 1,
      },
      b: {
        x: 2,
        y: 1,
      },
      resistance: 10,
    };
    const actual = updateComponentCoords(before, 10, -10);
    expect(actual.a).toStrictEqual({ x: 11, y: -9 });
    expect(actual.b).toStrictEqual({ x: 12, y: -9 });
  });

  it("updates source DC", () => {
    const before: SourceDC = {
      _type: "sourceDC",
      plus: {
        x: 1,
        y: 1,
      },
      minus: {
        x: 2,
        y: 1,
      },
      internalResistance: 5,
      electromotiveForce: 10,
    };
    const actual = updateComponentCoords(before, 10, -10);
    expect(actual.plus).toStrictEqual({ x: 11, y: -9 });
    expect(actual.minus).toStrictEqual({ x: 12, y: -9 });
  });
});

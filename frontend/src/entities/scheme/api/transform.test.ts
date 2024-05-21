import { describe, expect, it } from "vitest";
import { SourceDC, WithID } from "@/shared/simulation";
import { componentFromDTO } from "./transform";

describe("fromDTO function", () => {
  it("correctly parses SOURCE_DC", () => {
    const source = {
      componentId: 1,
      type: "SOURCE_DC",
      resistance: 5.0,
      emf: 20.0,
      a: {
        x: -1,
        y: 7,
      },
      b: {
        x: -2,
        y: 7,
      },
    } as const;

    const expected: WithID<SourceDC> = {
      id: 1,
      _type: "sourceDC",
      internalResistance: 5,
      electromotiveForce: 20,
      plus: {
        x: -1,
        y: 7,
      },
      minus: {
        x: -2,
        y: 7,
      },
    };
    expect(componentFromDTO(source)).toStrictEqual(expected);
  });
});

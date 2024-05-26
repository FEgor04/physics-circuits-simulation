import { describe, expect, it } from "vitest";
import { Rheostat, SourceDC, WithID } from "@/shared/simulation";
import { componentFromDTO, componentToDTO } from "./transform";

describe("fromDTO function", () => {
  it("correctly parses SOURCE_DC", () => {
    const source = {
      componentId: 1,
      type: "SOURCE_DC",
      resistance: 5.0,
      emf: 1,
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
      currentForce: 1,
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

  it("correctly parses rheostat", () => {
    const from: WithID<Rheostat> = {
      id: 1,
      _type: "rheostat",
      resistance: 5,
      a: {
        x: -1,
        y: 7,
      },
      b: {
        x: -2,
        y: 7,
      },
    };
    const dto = componentToDTO(from);
    expect(dto.type).toBe("RHEOSTAT");
    expect(dto.resistance).toBe(5);
    const actual = componentFromDTO(dto);
    expect(actual).toStrictEqual(from);
  });
});

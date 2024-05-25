import { componentFromDTO, componentToDTO } from "@/entities/scheme/api/transform";
import { ElectricalComponentDto } from "@/shared/api/index.schemas";
import { ElectricalComponentWithID } from "@/shared/simulation";
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useSimulationState } from "../model/state";

describe("scheme rebuild", () => {
  it("doesn't mutate the scheme", async () => {
    // DTO's since they were made from an actual scheme on the website
    const componentsDtos: Array<ElectricalComponentDto> = [
      {
        componentId: 1,
        type: "SOURCE_DC",
        resistance: 5.0,
        emf: 20.0,
        a: {
          x: 0,
          y: 4,
        },
        b: {
          x: -1,
          y: 4,
        },
      },
      {
        componentId: 2,
        type: "WIRE",
        resistance: 0.0,
        emf: 0.0,
        a: {
          x: 0,
          y: 4,
        },
        b: {
          x: 1,
          y: 4,
        },
      },
      {
        componentId: 3,
        type: "WIRE",
        resistance: 0.0,
        emf: 0.0,
        a: {
          x: 1,
          y: 4,
        },
        b: {
          x: 2,
          y: 4,
        },
      },
      {
        componentId: 4,
        type: "WIRE",
        resistance: 0.0,
        emf: 0.0,
        a: {
          x: 2,
          y: 4,
        },
        b: {
          x: 3,
          y: 4,
        },
      },
      {
        componentId: 5,
        type: "WIRE",
        resistance: 0.0,
        emf: 0.0,
        a: {
          x: 3,
          y: 4,
        },
        b: {
          x: 4,
          y: 4,
        },
      },
      {
        componentId: 6,
        type: "WIRE",
        resistance: 0.0,
        emf: 0.0,
        a: {
          x: 4,
          y: 4,
        },
        b: {
          x: 4,
          y: 3,
        },
      },
      {
        componentId: 7,
        type: "WIRE",
        resistance: 0.0,
        emf: 0.0,
        a: {
          x: 4,
          y: 3,
        },
        b: {
          x: 4,
          y: 2,
        },
      },
      {
        componentId: 8,
        type: "WIRE",
        resistance: 0.0,
        emf: 0.0,
        a: {
          x: 4,
          y: 2,
        },
        b: {
          x: 4,
          y: 1,
        },
      },
      {
        componentId: 9,
        type: "WIRE",
        resistance: 0.0,
        emf: 0.0,
        a: {
          x: 4,
          y: 1,
        },
        b: {
          x: 3,
          y: 1,
        },
      },
      {
        componentId: 10,
        type: "WIRE",
        resistance: 0.0,
        emf: 0.0,
        a: {
          x: 3,
          y: 1,
        },
        b: {
          x: 2,
          y: 1,
        },
      },
      {
        componentId: 11,
        type: "WIRE",
        resistance: 0.0,
        emf: 0.0,
        a: {
          x: 2,
          y: 1,
        },
        b: {
          x: 1,
          y: 1,
        },
      },
      {
        componentId: 12,
        type: "WIRE",
        resistance: 0.0,
        emf: 0.0,
        a: {
          x: 1,
          y: 1,
        },
        b: {
          x: 0,
          y: 1,
        },
      },
      {
        componentId: 13,
        type: "RESISTOR",
        resistance: 10.0,
        emf: 0.0,
        a: {
          x: -1,
          y: 1,
        },
        b: {
          x: 0,
          y: 1,
        },
      },
      {
        componentId: 14,
        type: "WIRE",
        resistance: 0.0,
        emf: 0.0,
        a: {
          x: -1,
          y: 1,
        },
        b: {
          x: -2,
          y: 1,
        },
      },
      {
        componentId: 15,
        type: "WIRE",
        resistance: 0.0,
        emf: 0.0,
        a: {
          x: -2,
          y: 1,
        },
        b: {
          x: -3,
          y: 1,
        },
      },
      {
        componentId: 16,
        type: "WIRE",
        resistance: 0.0,
        emf: 0.0,
        a: {
          x: -3,
          y: 1,
        },
        b: {
          x: -4,
          y: 1,
        },
      },
      {
        componentId: 17,
        type: "WIRE",
        resistance: 0.0,
        emf: 0.0,
        a: {
          x: -4,
          y: 1,
        },
        b: {
          x: -5,
          y: 1,
        },
      },
      {
        componentId: 18,
        type: "WIRE",
        resistance: 0.0,
        emf: 0.0,
        a: {
          x: -5,
          y: 1,
        },
        b: {
          x: -5,
          y: 2,
        },
      },
      {
        componentId: 19,
        type: "WIRE",
        resistance: 0.0,
        emf: 0.0,
        a: {
          x: -5,
          y: 2,
        },
        b: {
          x: -5,
          y: 3,
        },
      },
      {
        componentId: 20,
        type: "WIRE",
        resistance: 0.0,
        emf: 0.0,
        a: {
          x: -5,
          y: 3,
        },
        b: {
          x: -5,
          y: 4,
        },
      },
      {
        componentId: 21,
        type: "WIRE",
        resistance: 0.0,
        emf: 0.0,
        a: {
          x: -5,
          y: 4,
        },
        b: {
          x: -4,
          y: 4,
        },
      },
      {
        componentId: 22,
        type: "WIRE",
        resistance: 0.0,
        emf: 0.0,
        a: {
          x: -4,
          y: 4,
        },
        b: {
          x: -3,
          y: 4,
        },
      },
      {
        componentId: 23,
        type: "WIRE",
        resistance: 0.0,
        emf: 0.0,
        a: {
          x: -3,
          y: 4,
        },
        b: {
          x: -2,
          y: 4,
        },
      },
      {
        componentId: 24,
        type: "WIRE",
        resistance: 0.0,
        emf: 0.0,
        a: {
          x: -2,
          y: 4,
        },
        b: {
          x: -1,
          y: 4,
        },
      },
      {
        componentId: 25,
        type: "VOLTMETER",
        resistance: 0.0,
        emf: 0.0,
        a: {
          x: -1,
          y: 5,
        },
        b: {
          x: 0,
          y: 5,
        },
      },
      {
        componentId: 26,
        type: "VOLTMETER",
        resistance: 0.0,
        emf: 0.0,
        a: {
          x: -1,
          y: -2,
        },
        b: {
          x: 0,
          y: -2,
        },
      },
      {
        componentId: 27,
        type: "WIRE",
        resistance: 0.0,
        emf: 0.0,
        a: {
          x: 0,
          y: 1,
        },
        b: {
          x: 0,
          y: 0,
        },
      },
      {
        componentId: 28,
        type: "WIRE",
        resistance: 0.0,
        emf: 0.0,
        a: {
          x: 0,
          y: 0,
        },
        b: {
          x: 0,
          y: -1,
        },
      },
      {
        componentId: 29,
        type: "WIRE",
        resistance: 0.0,
        emf: 0.0,
        a: {
          x: 0,
          y: -1,
        },
        b: {
          x: 0,
          y: -2,
        },
      },
      {
        componentId: 30,
        type: "WIRE",
        resistance: 0.0,
        emf: 0.0,
        a: {
          x: -1,
          y: -2,
        },
        b: {
          x: -3,
          y: 1,
        },
      },
      {
        componentId: 31,
        type: "WIRE",
        resistance: 0.0,
        emf: 0.0,
        a: {
          x: 0,
          y: 5,
        },
        b: {
          x: 2,
          y: 4,
        },
      },
      {
        componentId: 32,
        type: "WIRE",
        resistance: 0.0,
        emf: 0.0,
        a: {
          x: -1,
          y: 5,
        },
        b: {
          x: -3,
          y: 4,
        },
      },
    ];
    const components = componentsDtos.map(componentFromDTO);
    const componentsCopy = componentsDtos.map(componentFromDTO);
    const { result } = renderHook(() => useSimulationState(components));
    await act(() => {
      result.current.simulator.getMeasurementsForComponent(components.find((it) => it._type == "voltmeter")?.id ?? -1);
    });
    expect(result.current.components).toStrictEqual(components);
    expect(result.current.components).toStrictEqual(componentsCopy);
  });
});

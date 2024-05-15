import { act, renderHook } from "@testing-library/react";
import { describe, expect, test as it } from "vitest";
import { Wire, Point, ElectricalComponentWithID } from "src/shared/simulation/types";
import { useSimulationState } from "../model/state";

// Helper function to create a wire component
const createWire = (a: Point, b: Point): Wire => ({
  _type: "wire",
  a,
  b,
});

describe("wire separate test 1 ", () => {
  it("splits a wire passing through multiple integer points into multiple wires", () => {
    const initialComponents: ElectricalComponentWithID[] = [];
    const { result } = renderHook(() => useSimulationState(initialComponents));

    const wire: Wire = createWire({ x: 0, y: 0 }, { x: 3, y: 3 });

    act(() => {
      result.current.onAddComponent(wire);
    });

    const schema = result.current.components;
    expect(schema.length).toBe(3);

    const wire1 = schema[0];
    const wire2 = schema[1];
    const wire3 = schema[2];

    // Verify that the first wire is from (0, 0) to (1, 1)
    if (wire1._type !== "sourceDC") {
      if (wire1._type !== "source") {
        expect(wire1.a).toEqual({ x: 0, y: 0 });
      }
    }
    if (wire1._type !== "sourceDC") {
      if (wire1._type !== "source") {
        expect(wire1.b).toEqual({ x: 1, y: 1 });
      }
    }

    // Verify that the second wire is from (1, 1) to (2, 2)
    if (wire2._type !== "sourceDC") {
      if (wire2._type !== "source") {
        expect(wire2.a).toEqual({ x: 1, y: 1 });
      }
    }
    if (wire2._type !== "sourceDC") {
      if (wire2._type !== "source") {
        expect(wire2.b).toEqual({ x: 2, y: 2 });
      }
    }

    // Verify that the third wire is from (2, 2) to (3, 3)
    if (wire3._type !== "sourceDC") {
      if (wire3._type !== "source") {
        expect(wire3.a).toEqual({ x: 2, y: 2 });
      }
    }
    if (wire3._type !== "sourceDC") {
      if (wire3._type !== "source") {
        expect(wire3.b).toEqual({ x: 3, y: 3 });
      }
    }

    // Verify that the ids are consecutive
    expect(wire1.id).toBe(1);
    expect(wire2.id).toBe(2);
    expect(wire3.id).toBe(3);
  });
});

describe("wire separate test 2", () => {
  it("splits a wire passing through multiple integer points into multiple wires", () => {
    const initialComponents: ElectricalComponentWithID[] = [];
    const { result } = renderHook(() => useSimulationState(initialComponents));

    const wire: Wire = createWire({ x: 0, y: 0 }, { x: 2, y: 2 });

    act(() => {
      result.current.onAddComponent(wire);
    });

    const schema = result.current.components;
    expect(schema.length).toBe(2);

    const wire1 = schema[0];
    const wire2 = schema[1];

    // Verify that the first wire is from (0, 0) to (1, 1)
    if (wire1._type !== "sourceDC") {
      if (wire1._type !== "source") {
        expect(wire1.a).toEqual({ x: 0, y: 0 });
      }
    }
    if (wire1._type !== "sourceDC") {
      if (wire1._type !== "source") {
        expect(wire1.b).toEqual({ x: 1, y: 1 });
      }
    }

    // Verify that the second wire is from (1, 1) to (2, 2)
    if (wire2._type !== "sourceDC") {
      if (wire2._type !== "source") {
        expect(wire2.a).toEqual({ x: 1, y: 1 });
      }
    }
    if (wire2._type !== "sourceDC") {
      if (wire2._type !== "source") {
        expect(wire2.b).toEqual({ x: 2, y: 2 });
      }
    }

    // Verify that the ids are consecutive
    expect(wire1.id).toBe(1);
    expect(wire2.id).toBe(2);
  });
});

describe("wire separate test 3", () => {
  it("splits a wire passing through multiple integer points into multiple wires", () => {
    const initialComponents: ElectricalComponentWithID[] = [];
    const { result } = renderHook(() => useSimulationState(initialComponents));

    const wire: Wire = createWire({ x: 0, y: 0 }, { x: 2, y: 3 });

    act(() => {
      result.current.onAddComponent(wire);
    });

    const schema = result.current.components;
    expect(schema.length).toBe(1);

    const wire1 = schema[0];

    // Verify that the first wire is from (0, 0) to (1, 1)
    if (wire1._type !== "sourceDC") {
      if (wire1._type !== "source") {
        expect(wire1.a).toEqual({ x: 0, y: 0 });
      }
    }
    if (wire1._type !== "sourceDC") {
      if (wire1._type !== "source") {
        expect(wire1.b).toEqual({ x: 2, y: 3 });
      }
    }

    // Verify that the ids are consecutive
    expect(wire1.id).toBe(1);
  });
});

describe("wire separate test 4", () => {
  it("splits a wire passing through multiple integer points into multiple wires", () => {
    const initialComponents: ElectricalComponentWithID[] = [];
    const { result } = renderHook(() => useSimulationState(initialComponents));

    const wire: Wire = createWire({ x: 0, y: 0 }, { x: 2, y: 4 });

    act(() => {
      result.current.onAddComponent(wire);
    });

    const schema = result.current.components;
    expect(schema.length).toBe(2);

    const wire1 = schema[0];
    const wire2 = schema[1];

    // Verify that the first wire is from (0, 0) to (1, 1)
    if (wire1._type !== "sourceDC") {
      if (wire1._type !== "source") {
        expect(wire1.a).toEqual({ x: 0, y: 0 });
      }
    }
    if (wire1._type !== "sourceDC") {
      if (wire1._type !== "source") {
        expect(wire1.b).toEqual({ x: 1, y: 2 });
      }
    }

    // Verify that the second wire is from (1, 1) to (2, 2)
    if (wire2._type !== "sourceDC") {
      if (wire2._type !== "source") {
        expect(wire2.a).toEqual({ x: 1, y: 2 });
      }
    }
    if (wire2._type !== "sourceDC") {
      if (wire2._type !== "source") {
        expect(wire2.b).toEqual({ x: 2, y: 4 });
      }
    }

    // Verify that the ids are consecutive
    expect(wire1.id).toBe(1);
    expect(wire2.id).toBe(2);
  });
});

describe("wire separate test 5", () => {
  it("splits a wire passing through multiple integer points into multiple wires", () => {
    const initialComponents: ElectricalComponentWithID[] = [];
    const { result } = renderHook(() => useSimulationState(initialComponents));

    const wire: Wire = createWire({ x: 0, y: 0 }, { x: 2, y: 8 });

    act(() => {
      result.current.onAddComponent(wire);
    });

    const schema = result.current.components;
    expect(schema.length).toBe(2);

    const wire1 = schema[0];
    const wire2 = schema[1];

    // Verify that the first wire is from (0, 0) to (1, 1)
    if (wire1._type !== "sourceDC") {
      if (wire1._type !== "source") {
        expect(wire1.a).toEqual({ x: 0, y: 0 });
      }
    }
    if (wire1._type !== "sourceDC") {
      if (wire1._type !== "source") {
        expect(wire1.b).toEqual({ x: 1, y: 4 });
      }
    }

    // Verify that the second wire is from (1, 1) to (2, 2)
    if (wire2._type !== "sourceDC") {
      if (wire2._type !== "source") {
        expect(wire2.a).toEqual({ x: 1, y: 4 });
      }
    }
    if (wire2._type !== "sourceDC") {
      if (wire2._type !== "source") {
        expect(wire2.b).toEqual({ x: 2, y: 8 });
      }
    }

    // Verify that the ids are consecutive
    expect(wire1.id).toBe(1);
    expect(wire2.id).toBe(2);
  });
});

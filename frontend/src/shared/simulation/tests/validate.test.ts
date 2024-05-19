import { expect, test } from "vitest";
import { SimpleSimulator } from "../simulator";
import { ElectricalComponentWithID } from "../types";

test("test closed loop 1", () => {
  const components: ElectricalComponentWithID[] = [
    { id: 0, _type: "wire", a: { x: 0, y: 3 }, b: { x: 0, y: 4 } },
    { id: 1, _type: "resistor", a: { x: 0, y: 4 }, b: { x: 0, y: 5 }, resistance: 10 },
    { id: 2, _type: "wire", a: { x: 0, y: 5 }, b: { x: 0, y: 6 } },
    { id: 3, _type: "wire", a: { x: 0, y: 6 }, b: { x: 2, y: 6 } },
    { id: 4, _type: "resistor", a: { x: 2, y: 6 }, b: { x: 3, y: 6 }, resistance: 10 },
    { id: 5, _type: "wire", a: { x: 3, y: 6 }, b: { x: 5, y: 6 } },
    { id: 6, _type: "wire", a: { x: 5, y: 6 }, b: { x: 5, y: 3 } },
    { id: 7, _type: "wire", a: { x: 0, y: 3 }, b: { x: 2, y: 3 } },
    { id: 8, _type: "resistor", a: { x: 2, y: 3 }, b: { x: 3, y: 3 }, resistance: 10 },
    { id: 9, _type: "wire", a: { x: 3, y: 3 }, b: { x: 5, y: 3 } },
    { id: 10, _type: "wire", a: { x: 0, y: 3 }, b: { x: 0, y: 2 } },
    { id: 11, _type: "resistor", a: { x: 0, y: 2 }, b: { x: 0, y: 1 }, resistance: 10 },
    { id: 12, _type: "wire", a: { x: 0, y: 1 }, b: { x: 0, y: 0 } },
    { id: 13, _type: "wire", a: { x: 0, y: 0 }, b: { x: 3, y: 0 } },
    { id: 14, _type: "wire", a: { x: 0, y: 3 }, b: { x: 1, y: 2 } },
    { id: 15, _type: "resistor", a: { x: 1, y: 2 }, b: { x: 2, y: 1 }, resistance: 10 },
    { id: 16, _type: "wire", a: { x: 2, y: 1 }, b: { x: 3, y: 0 } },
    { id: 17, _type: "wire", a: { x: 3, y: 0 }, b: { x: 5, y: 0 } },
    { id: 18, _type: "wire", a: { x: 5, y: 0 }, b: { x: 5, y: 1 } },
    { id: 19, _type: "resistor", a: { x: 5, y: 1 }, b: { x: 5, y: 2 }, resistance: 10 },
    { id: 20, _type: "wire", a: { x: 5, y: 2 }, b: { x: 5, y: 3 } },
    { id: 21, _type: "wire", a: { x: 3, y: 0 }, b: { x: 3, y: 1 } },
    { id: 22, _type: "resistor", a: { x: 3, y: 1 }, b: { x: 4, y: 2 }, resistance: 10 },
    { id: 23, _type: "wire", a: { x: 4, y: 2 }, b: { x: 5, y: 3 } },
  ];

  const simulation = new SimpleSimulator(components);
  const error = simulation.validateSchema();
  expect(error).toBe(undefined);
});

test("test closed loop 2", () => {
  const components: ElectricalComponentWithID[] = [
    { id: 0, _type: "wire", a: { x: 0, y: 3 }, b: { x: 0, y: 4 } },
    { id: 1, _type: "resistor", a: { x: 0, y: 4 }, b: { x: 0, y: 5 }, resistance: 10 },
    { id: 2, _type: "wire", a: { x: 0, y: 5 }, b: { x: 0, y: 6 } },
  ];

  const simulation = new SimpleSimulator(components);
  const error = simulation.validateSchema();
  expect(error).toBe("noClosedLoop");
});

test("test closed loop 3", () => {
  const components: ElectricalComponentWithID[] = [
    { id: 0, _type: "wire", a: { x: 0, y: 0 }, b: { x: 0, y: 1 } },
    { id: 1, _type: "resistor", a: { x: 0, y: 1 }, b: { x: 1, y: 1 }, resistance: 10 },
    { id: 2, _type: "wire", a: { x: 1, y: 1 }, b: { x: 1, y: 0 } },
    { id: 2, _type: "wire", a: { x: 1, y: 0 }, b: { x: 0, y: 0 } },
    { id: 2, _type: "wire", a: { x: 0, y: 1 }, b: { x: 0, y: 2 } },
  ];

  const simulation = new SimpleSimulator(components);
  const error = simulation.validateSchema();
  expect(error).toBe(undefined);
});

import { expect, test } from "vitest";
import { SimpleSimulator } from "../simulator";
import { ElectricalComponent, Point } from "../types";

test("simple scheme with nodes 1", () => {
  const node: Point[] = [
    { x: 3, y: 3 },
    { x: 3, y: 0 },
  ];

  const components: ElectricalComponent[] = [
    { _type: "wire", a: { x: 0, y: 0 }, b: { x: 0, y: 3 } },
    { _type: "wire", a: { x: 0, y: 3 }, b: { x: 1, y: 3 } },
    { _type: "resistor", a: { x: 1, y: 3 }, b: { x: 2, y: 3 }, resistance: 10 },
    { _type: "wire", a: { x: 2, y: 3 }, b: { x: 3, y: 3 } },
    { _type: "wire", a: { x: 3, y: 3 }, b: { x: 3, y: 2 } },
    { _type: "resistor", a: { x: 3, y: 2 }, b: { x: 3, y: 1 }, resistance: 10 },
    { _type: "wire", a: { x: 3, y: 1 }, b: { x: 3, y: 0 } },
    { _type: "wire", a: { x: 3, y: 0 }, b: { x: 0, y: 0 } },
    { _type: "wire", a: { x: 3, y: 0 }, b: { x: 6, y: 0 } },
    { _type: "wire", a: { x: 6, y: 0 }, b: { x: 6, y: 3 } },
    { _type: "wire", a: { x: 6, y: 3 }, b: { x: 5, y: 3 } },
    { _type: "resistor", a: { x: 5, y: 3 }, b: { x: 4, y: 3 }, resistance: 10 },
    { _type: "wire", a: { x: 4, y: 3 }, b: { x: 3, y: 3 } },
  ];

  const simulator = new SimpleSimulator(components);

  const nodes = simulator.findNodes();
  expect(nodes).toStrictEqual(node);
});

test("simple scheme with nodes 2", () => {
  const node: Point[] = [
    { x: 0, y: 3 },
    { x: 5, y: 3 },
    { x: 3, y: 0 },
  ];

  const components: ElectricalComponent[] = [
    { _type: "wire", a: { x: 0, y: 3 }, b: { x: 0, y: 4 } },
    { _type: "resistor", a: { x: 0, y: 4 }, b: { x: 0, y: 5 }, resistance: 10 },
    { _type: "wire", a: { x: 0, y: 5 }, b: { x: 0, y: 6 } },
    { _type: "wire", a: { x: 0, y: 6 }, b: { x: 2, y: 6 } },
    { _type: "resistor", a: { x: 2, y: 6 }, b: { x: 3, y: 6 }, resistance: 10 },
    { _type: "wire", a: { x: 3, y: 6 }, b: { x: 5, y: 6 } },
    { _type: "wire", a: { x: 5, y: 6 }, b: { x: 5, y: 3 } },
    { _type: "wire", a: { x: 0, y: 3 }, b: { x: 2, y: 3 } },
    { _type: "resistor", a: { x: 2, y: 3 }, b: { x: 3, y: 3 }, resistance: 10 },
    { _type: "wire", a: { x: 3, y: 3 }, b: { x: 5, y: 3 } },
    { _type: "wire", a: { x: 0, y: 3 }, b: { x: 0, y: 2 } },
    { _type: "resistor", a: { x: 0, y: 2 }, b: { x: 0, y: 1 }, resistance: 10 },
    { _type: "wire", a: { x: 0, y: 1 }, b: { x: 0, y: 0 } },
    { _type: "wire", a: { x: 0, y: 0 }, b: { x: 3, y: 0 } },
    { _type: "wire", a: { x: 0, y: 3 }, b: { x: 1, y: 2 } },
    { _type: "resistor", a: { x: 1, y: 2 }, b: { x: 2, y: 1 }, resistance: 10 },
    { _type: "wire", a: { x: 2, y: 1 }, b: { x: 3, y: 0 } },
    { _type: "wire", a: { x: 3, y: 0 }, b: { x: 5, y: 0 } },
    { _type: "wire", a: { x: 5, y: 0 }, b: { x: 5, y: 1 } },
    { _type: "resistor", a: { x: 5, y: 1 }, b: { x: 5, y: 2 }, resistance: 10 },
    { _type: "wire", a: { x: 5, y: 2 }, b: { x: 5, y: 3 } },
    { _type: "wire", a: { x: 3, y: 0 }, b: { x: 3, y: 1 } },
    { _type: "resistor", a: { x: 3, y: 1 }, b: { x: 4, y: 2 }, resistance: 10 },
    { _type: "wire", a: { x: 4, y: 2 }, b: { x: 5, y: 3 } },
  ];

  const simulator = new SimpleSimulator(components);

  const nodes = simulator.findNodes();
  expect(nodes).toStrictEqual(node);
});

test("simple scheme with nodes 3", () => {
  const node: Point[] = [
    { x: 0, y: 1 },
    { x: 3, y: 4 },
    { x: 3, y: 1 },
    { x: 6, y: 1 },
  ];

  const components: ElectricalComponent[] = [
    { _type: "wire", a: { x: 0, y: 1 }, b: { x: 0, y: 4 } },
    { _type: "wire", a: { x: 0, y: 4 }, b: { x: 1, y: 4 } },
    { _type: "resistor", a: { x: 1, y: 4 }, b: { x: 2, y: 4 }, resistance: 10 },
    { _type: "wire", a: { x: 2, y: 4 }, b: { x: 3, y: 4 } },
    { _type: "wire", a: { x: 3, y: 1 }, b: { x: 3, y: 2 } },
    { _type: "resistor", a: { x: 3, y: 2 }, b: { x: 3, y: 3 }, resistance: 10 },
    { _type: "wire", a: { x: 3, y: 3 }, b: { x: 3, y: 4 } },
    { _type: "wire", a: { x: 0, y: 1 }, b: { x: 1, y: 1 } },
    { _type: "resistor", a: { x: 1, y: 1 }, b: { x: 2, y: 1 }, resistance: 10 },
    { _type: "wire", a: { x: 2, y: 1 }, b: { x: 3, y: 1 } },
    { _type: "wire", a: { x: 3, y: 4 }, b: { x: 4, y: 4 } },
    { _type: "resistor", a: { x: 4, y: 4 }, b: { x: 5, y: 4 }, resistance: 10 },
    { _type: "wire", a: { x: 5, y: 4 }, b: { x: 6, y: 4 } },
    { _type: "wire", a: { x: 6, y: 4 }, b: { x: 6, y: 1 } },
    { _type: "wire", a: { x: 3, y: 1 }, b: { x: 4, y: 1 } },
    { _type: "resistor", a: { x: 4, y: 1 }, b: { x: 5, y: 1 }, resistance: 10 },
    { _type: "wire", a: { x: 5, y: 1 }, b: { x: 6, y: 1 } },
    { _type: "wire", a: { x: 0, y: 1 }, b: { x: 0, y: 0 } },
    { _type: "wire", a: { x: 0, y: 0 }, b: { x: 1, y: 0 } },
    { _type: "resistor", a: { x: 1, y: 0 }, b: { x: 2, y: 0 }, resistance: 10 },
    { _type: "wire", a: { x: 2, y: 0 }, b: { x: 6, y: 0 } },
    { _type: "resistor", a: { x: 6, y: 0 }, b: { x: 6, y: 1 }, resistance: 10 },
  ];

  const simulator = new SimpleSimulator(components);

  const nodes = simulator.findNodes();
  expect(nodes).toStrictEqual(node);
});

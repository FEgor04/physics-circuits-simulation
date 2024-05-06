import { expect, test } from "vitest";
import { SimpleSimulator } from "./simulator";
import { Node, ElectricalComponent } from "./types";

test.skip("simple scheme with nodes", () => {
  const node: Node[] = [
    { _type: "node", loc: { x: 3, y: 3 } },
    { _type: "node", loc: { x: 3, y: 0 } },
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
  expect(nodes).toBe(node);
});

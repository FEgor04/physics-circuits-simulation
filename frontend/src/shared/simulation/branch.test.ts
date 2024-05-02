import { expect, test } from "vitest";
import { SimpleSimulator } from "./simulator";
import { Branch, ElectricalComponent } from "./types";

test("not simple scheme with branches", () => {
  const branch: Branch[] = [
    {
      id: 0,
      a: { x: 0, y: 0 },
      b: { x: 4, y: 4 },
      components: [
        { _type: "wire", a: { x: 0, y: 0 }, b: { x: 0, y: 1 } },
        { _type: "resistor", a: { x: 0, y: 1 }, b: { x: 0, y: 2 }, resistance: 10 },
        { _type: "wire", a: { x: 0, y: 2 }, b: { x: 0, y: 3 } },
        { _type: "resistor", a: { x: 0, y: 3 }, b: { x: 0, y: 4 }, resistance: 10 },
        { _type: "wire", a: { x: 0, y: 4 }, b: { x: 4, y: 4 } },
      ],
    },
    {
      id: 1,
      a: { x: 0, y: 0 },
      b: { x: 4, y: 4 },
      components: [
        { _type: "wire", a: { x: 0, y: 0 }, b: { x: 1, y: 1 } },
        { _type: "resistor", a: { x: 1, y: 1 }, b: { x: 3, y: 3 }, resistance: 10 },
        { _type: "wire", a: { x: 3, y: 3 }, b: { x: 4, y: 4 } },
      ],
    },
    {
      id: 2,
      a: { x: 0, y: 0 },
      b: { x: 4, y: 0 },
      components: [{ _type: "wire", a: { x: 0, y: 0 }, b: { x: 4, y: 0 } }],
    },
    {
      id: 3,
      a: { x: 4, y: 0 },
      b: { x: 4, y: 4 },
      components: [{ _type: "wire", a: { x: 4, y: 0 }, b: { x: 4, y: 4 } }],
    },
    {
      id: 4,
      a: { x: 4, y: 4 },
      b: { x: 8, y: 4 },
      components: [{ _type: "wire", a: { x: 4, y: 4 }, b: { x: 8, y: 4 } }],
    },
    {
      id: 5,
      a: { x: 4, y: 0 },
      b: { x: 8, y: 4 },
      components: [{ _type: "wire", a: { x: 4, y: 0 }, b: { x: 8, y: 4 } }],
    },
    {
      id: 6,
      a: { x: 4, y: 0 },
      b: { x: 8, y: 4 },
      components: [
        { _type: "wire", a: { x: 4, y: 0 }, b: { x: 8, y: 0 } },
        { _type: "wire", a: { x: 8, y: 0 }, b: { x: 8, y: 4 } },
      ],
    },
  ];
  const expectedNodes = branch.flatMap(({ a, b }) => [a, b]);

  const components: ElectricalComponent[] = [
    { _type: "wire", a: { x: 0, y: 0 }, b: { x: 0, y: 1 } },
    { _type: "resistor", a: { x: 0, y: 1 }, b: { x: 0, y: 2 }, resistance: 10 },
    { _type: "wire", a: { x: 0, y: 2 }, b: { x: 0, y: 3 } },
    { _type: "resistor", a: { x: 0, y: 3 }, b: { x: 0, y: 4 }, resistance: 10 },
    { _type: "wire", a: { x: 0, y: 0 }, b: { x: 4, y: 0 } },
    { _type: "wire", a: { x: 0, y: 0 }, b: { x: 1, y: 1 } },
    { _type: "resistor", a: { x: 1, y: 1 }, b: { x: 3, y: 3 }, resistance: 10 },
    { _type: "wire", a: { x: 3, y: 3 }, b: { x: 4, y: 4 } },
    { _type: "wire", a: { x: 0, y: 4 }, b: { x: 4, y: 4 } },
    { _type: "wire", a: { x: 4, y: 0 }, b: { x: 4, y: 4 } },
    { _type: "wire", a: { x: 4, y: 4 }, b: { x: 8, y: 4 } },
    { _type: "wire", a: { x: 4, y: 0 }, b: { x: 8, y: 4 } },
    { _type: "wire", a: { x: 4, y: 0 }, b: { x: 8, y: 0 } },
    { _type: "wire", a: { x: 8, y: 0 }, b: { x: 8, y: 4 } },
  ];

  const simulator = new SimpleSimulator(components);

  const actualNodes = simulator.findNodes();
  expectedNodes.forEach((node) => expect(actualNodes).toContainEqual(node));
  actualNodes.forEach((node) => expect(expectedNodes).toContainEqual(node));
});

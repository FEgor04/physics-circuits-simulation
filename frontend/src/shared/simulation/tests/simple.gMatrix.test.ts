import { expect, test } from "vitest";
import { SimpleSimulator } from "../simulator";
import { Branch, ElectricalComponent } from "../types";

test("gMatrix test 1", () => {
  const expectedMatrix: number[][] = [
    [0.4, -0.2],
    [-0.2, 0.30000000000000004],
  ];

  const components: ElectricalComponent[] = [
    { _type: "wire", a: { x: 0, y: 0 }, b: { x: 0, y: 1 } },
    { _type: "wire", a: { x: 0, y: 2 }, b: { x: 0, y: 3 } },
    { _type: "wire", a: { x: 0, y: 4 }, b: { x: 0, y: 5 } },
    { _type: "wire", a: { x: 0, y: 5 }, b: { x: 4, y: 5 } },
    { _type: "wire", a: { x: 5, y: 5 }, b: { x: 8, y: 5 } },
    { _type: "wire", a: { x: 8, y: 4 }, b: { x: 8, y: 5 } },
    { _type: "wire", a: { x: 8, y: 2 }, b: { x: 8, y: 3 } },
    { _type: "wire", a: { x: 8, y: 0 }, b: { x: 8, y: 1 } },
    { _type: "wire", a: { x: 6, y: 0 }, b: { x: 8, y: 0 } },
    { _type: "wire", a: { x: 4, y: 0 }, b: { x: 5, y: 0 } },
    { _type: "wire", a: { x: 4, y: 0 }, b: { x: 0, y: 0 } },
    { _type: "wire", a: { x: 4, y: 0 }, b: { x: 2, y: 2 } },
    { _type: "wire", a: { x: 2, y: 3 }, b: { x: 0, y: 5 } },
    { _type: "wire", a: { x: 4, y: 0 }, b: { x: 5, y: 1 } },
    { _type: "wire", a: { x: 6, y: 2 }, b: { x: 7, y: 3 } },
    { _type: "wire", a: { x: 7, y: 4 }, b: { x: 8, y: 5 } },
    { _type: "resistor", a: { x: 4, y: 5 }, b: { x: 5, y: 5 }, resistance: 5 },
    { _type: "resistor", a: { x: 2, y: 2 }, b: { x: 2, y: 3 }, resistance: 10 },
    { _type: "resistor", a: { x: 0, y: 1 }, b: { x: 0, y: 2 }, resistance: 10 },
    { _type: "resistor", a: { x: 5, y: 0 }, b: { x: 6, y: 0 }, resistance: 3 },
    { _type: "resistor", a: { x: 7, y: 3 }, b: { x: 7, y: 4 }, resistance: 40 },
    { _type: "resistor", a: { x: 8, y: 3 }, b: { x: 8, y: 4 }, resistance: 7 },
    { _type: "wire", a: { x: 5, y: 1 }, b: { x: 6, y: 2 } },
    { _type: "sourceDC", plus: { x: 5, y: 1 }, minus: { x: 6, y: 2 }, electromotiveForce: 40 },
    { _type: "source", plus: { x: 0, y: 4 }, minus: { x: 0, y: 3 }, electromotiveForce: 40, internalResistance: 1 },
    { _type: "source", plus: { x: 8, y: 1 }, minus: { x: 8, y: 2 }, electromotiveForce: 10, internalResistance: 1 },
  ];

  const simulator = new SimpleSimulator(components);

  const actualNodes = [
    { x: 0, y: 5 },
    { x: 8, y: 5 },
    { x: 4, y: 0 },
  ];
  const actualBranches: Branch[] = [
    {
      id: 0,
      a: { x: 0, y: 5 },
      b: { x: 4, y: 0 },
      components: [
        { _type: "wire", a: { x: 0, y: 5 }, b: { x: 0, y: 4 } },
        {
          _type: "source",
          plus: { x: 0, y: 4 },
          minus: { x: 0, y: 3 },
          electromotiveForce: 40,
          internalResistance: 1,
        },
        { _type: "wire", a: { x: 0, y: 3 }, b: { x: 0, y: 2 } },
        { _type: "resistor", a: { x: 0, y: 2 }, b: { x: 0, y: 1 }, resistance: 10 },
        { _type: "wire", a: { x: 0, y: 1 }, b: { x: 0, y: 0 } },
        { _type: "wire", a: { x: 0, y: 0 }, b: { x: 4, y: 0 } },
      ],
    },
    {
      id: 1,
      a: { x: 0, y: 5 },
      b: { x: 4, y: 0 },
      components: [
        { _type: "wire", a: { x: 2, y: 3 }, b: { x: 0, y: 5 } },
        { _type: "resistor", a: { x: 2, y: 2 }, b: { x: 2, y: 3 }, resistance: 10 },
        { _type: "wire", a: { x: 4, y: 0 }, b: { x: 2, y: 2 } },
      ],
    },
    {
      id: 2,
      a: { x: 0, y: 5 },
      b: { x: 8, y: 5 },

      components: [
        { _type: "wire", a: { x: 0, y: 5 }, b: { x: 4, y: 5 } },
        { _type: "resistor", a: { x: 4, y: 5 }, b: { x: 5, y: 5 }, resistance: 5 },
        { _type: "wire", a: { x: 5, y: 5 }, b: { x: 8, y: 5 } },
      ],
    },
    {
      id: 3,
      a: { x: 4, y: 0 },
      b: { x: 8, y: 5 },
      components: [
        { _type: "wire", a: { x: 4, y: 0 }, b: { x: 5, y: 1 } },
        { _type: "sourceDC", plus: { x: 5, y: 1 }, minus: { x: 6, y: 2 }, electromotiveForce: 40 },
        { _type: "wire", a: { x: 6, y: 2 }, b: { x: 7, y: 3 } },
        { _type: "resistor", a: { x: 7, y: 3 }, b: { x: 7, y: 4 }, resistance: 40 },
        { _type: "wire", a: { x: 7, y: 4 }, b: { x: 8, y: 5 } },
      ],
    },
    {
      id: 4,
      a: { x: 4, y: 0 },
      b: { x: 8, y: 5 },
      components: [
        { _type: "wire", a: { x: 4, y: 0 }, b: { x: 5, y: 0 } },
        { _type: "resistor", a: { x: 5, y: 0 }, b: { x: 6, y: 0 }, resistance: 3 },
        { _type: "wire", a: { x: 6, y: 0 }, b: { x: 8, y: 0 } },
        { _type: "wire", a: { x: 8, y: 0 }, b: { x: 8, y: 1 } },
        {
          _type: "source",
          plus: { x: 8, y: 1 },
          minus: { x: 8, y: 2 },
          electromotiveForce: 10,
          internalResistance: 1,
        },
        { _type: "wire", a: { x: 8, y: 2 }, b: { x: 8, y: 3 } },
        { _type: "resistor", a: { x: 8, y: 3 }, b: { x: 8, y: 4 }, resistance: 7 },
        { _type: "wire", a: { x: 8, y: 4 }, b: { x: 8, y: 5 } },
      ],
    },
  ];

  const actgMatrix = simulator.buildGMatrix(actualNodes, actualBranches);

  expect(actgMatrix).toStrictEqual(expectedMatrix);
});

test("gMatrix test 2", () => {
  const expectedMatrix: number[][] = [
    [0.25, -0.1],
    [-0.1, 0.3],
  ];

  const components: ElectricalComponent[] = [
    { _type: "wire", a: { x: 0, y: 3 }, b: { x: 0, y: 4 } },
    { _type: "resistor", a: { x: 0, y: 4 }, b: { x: 0, y: 5 }, resistance: 10 },
    { _type: "wire", a: { x: 0, y: 5 }, b: { x: 0, y: 6 } },
    { _type: "source", plus: { x: 0, y: 6 }, minus: { x: 1, y: 6 }, electromotiveForce: 30, internalResistance: 1 },
    { _type: "wire", a: { x: 1, y: 6 }, b: { x: 2, y: 6 } },
    { _type: "resistor", a: { x: 2, y: 6 }, b: { x: 3, y: 6 }, resistance: 20 }, //
    { _type: "wire", a: { x: 3, y: 6 }, b: { x: 5, y: 6 } },
    { _type: "wire", a: { x: 5, y: 6 }, b: { x: 5, y: 3 } },
    { _type: "wire", a: { x: 0, y: 3 }, b: { x: 2, y: 3 } },
    { _type: "resistor", a: { x: 2, y: 3 }, b: { x: 3, y: 3 }, resistance: 15 },
    { _type: "wire", a: { x: 3, y: 3 }, b: { x: 5, y: 3 } },
    { _type: "wire", a: { x: 0, y: 3 }, b: { x: 0, y: 2 } },
    { _type: "resistor", a: { x: 0, y: 2 }, b: { x: 0, y: 1 }, resistance: 40 },
    { _type: "wire", a: { x: 0, y: 1 }, b: { x: 0, y: 0 } },
    { _type: "wire", a: { x: 0, y: 0 }, b: { x: 3, y: 0 } },
    { _type: "resistor", a: { x: 0, y: 3 }, b: { x: 1, y: 2 }, resistance: 8 },
    { _type: "source", plus: { x: 1, y: 2 }, minus: { x: 2, y: 1 }, electromotiveForce: 10, internalResistance: 1 },
    { _type: "wire", a: { x: 2, y: 1 }, b: { x: 3, y: 0 } },
    { _type: "source", plus: { x: 4, y: 0 }, minus: { x: 3, y: 0 }, electromotiveForce: 20, internalResistance: 1 },
    { _type: "wire", a: { x: 4, y: 0 }, b: { x: 5, y: 0 } },
    { _type: "wire", a: { x: 5, y: 0 }, b: { x: 5, y: 1 } },
    { _type: "resistor", a: { x: 5, y: 1 }, b: { x: 5, y: 2 }, resistance: 6 },
    { _type: "wire", a: { x: 5, y: 2 }, b: { x: 5, y: 3 } },
    { _type: "resistor", a: { x: 3, y: 0 }, b: { x: 3, y: 1 }, resistance: 30 },
    { _type: "source", plus: { x: 3, y: 1 }, minus: { x: 4, y: 2 }, electromotiveForce: 40, internalResistance: 1 },
    { _type: "wire", a: { x: 4, y: 2 }, b: { x: 5, y: 3 } },
  ];

  const simulator = new SimpleSimulator(components);

  const actgMatrix = simulator.buildGMatrix(simulator.findNodes(), simulator.findBranches());

  expect(actgMatrix).toStrictEqual(expectedMatrix);
});

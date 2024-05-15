import { expect, test } from "vitest";
import { SimpleSimulator } from "../simulator";
import { Branch } from "../types";

test("branch current test", () => {
  const expectedCurrent: number[] = [3, 1, 2, Infinity, 1];
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
  const acrSolve: number[] = [-10, 0, 0];

  const components = actualBranches.flatMap((it) => it.components);

  const simulator = new SimpleSimulator(components);
  const branchCurr = simulator.branchCurrent(actualBranches, actualNodes, acrSolve);
  expect(branchCurr).toStrictEqual(expectedCurrent);
});

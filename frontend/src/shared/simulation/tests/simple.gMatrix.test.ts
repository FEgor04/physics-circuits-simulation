import { expect, test } from "vitest";
import { SimpleSimulator } from "../simulator";
import { Branch, ElectricalComponentWithID } from "../types";

test("gMatrix test 1", () => {
  const expectedMatrix: number[][] = [
    [0.39090909090909093, -0.2],
    [-0.2, 0.31313131313131315],
  ];

  const components: ElectricalComponentWithID[] = [
    { _type: "wire", a: { x: 0, y: 0 }, b: { x: 0, y: 1 }, id: 0 },
    { _type: "wire", a: { x: 0, y: 2 }, b: { x: 0, y: 3 }, id: 1 },
    { _type: "wire", a: { x: 0, y: 4 }, b: { x: 0, y: 5 }, id: 2 },
    { _type: "wire", a: { x: 0, y: 5 }, b: { x: 4, y: 5 }, id: 3 },
    { _type: "wire", a: { x: 5, y: 5 }, b: { x: 8, y: 5 }, id: 4 },
    { _type: "wire", a: { x: 8, y: 4 }, b: { x: 8, y: 5 }, id: 5 },
    { _type: "wire", a: { x: 8, y: 2 }, b: { x: 8, y: 3 }, id: 6 },
    { _type: "wire", a: { x: 8, y: 0 }, b: { x: 8, y: 1 }, id: 7 },
    { _type: "wire", a: { x: 6, y: 0 }, b: { x: 8, y: 0 }, id: 8 },
    { _type: "wire", a: { x: 4, y: 0 }, b: { x: 5, y: 0 }, id: 9 },
    { _type: "wire", a: { x: 4, y: 0 }, b: { x: 0, y: 0 }, id: 10 },
    { _type: "wire", a: { x: 4, y: 0 }, b: { x: 2, y: 2 }, id: 11 },
    { _type: "wire", a: { x: 2, y: 3 }, b: { x: 0, y: 5 }, id: 12 },
    { _type: "wire", a: { x: 4, y: 0 }, b: { x: 5, y: 1 }, id: 13 },
    { _type: "wire", a: { x: 6, y: 2 }, b: { x: 7, y: 3 }, id: 14 },
    { _type: "wire", a: { x: 7, y: 4 }, b: { x: 8, y: 5 }, id: 15 },
    { _type: "resistor", a: { x: 4, y: 5 }, b: { x: 5, y: 5 }, resistance: 5, id: 16 },
    { _type: "resistor", a: { x: 2, y: 2 }, b: { x: 2, y: 3 }, resistance: 10, id: 17 },
    { _type: "resistor", a: { x: 0, y: 1 }, b: { x: 0, y: 2 }, resistance: 10, id: 18 },
    { _type: "resistor", a: { x: 5, y: 0 }, b: { x: 6, y: 0 }, resistance: 3, id: 19 },
    { _type: "resistor", a: { x: 7, y: 3 }, b: { x: 7, y: 4 }, resistance: 40, id: 20 },
    { _type: "resistor", a: { x: 8, y: 3 }, b: { x: 8, y: 4 }, resistance: 7, id: 21 },

    {
      _type: "sourceDC",
      plus: { x: 6, y: 2 },
      minus: { x: 5, y: 1 },
      internalResistance: 5,
      electromotiveForce: 40,
      id: 22,
    },

    {
      _type: "source",
      plus: { x: 0, y: 4 },
      minus: { x: 0, y: 3 },
      electromotiveForce: 40,
      internalResistance: 1,
      id: 23,
    },
    {
      _type: "source",
      plus: { x: 8, y: 1 },
      minus: { x: 8, y: 2 },
      electromotiveForce: 10,
      internalResistance: 1,
      id: 24,
    },
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
        { _type: "wire", a: { x: 0, y: 5 }, b: { x: 0, y: 4 }, id: 2 },
        {
          _type: "source",
          plus: { x: 0, y: 4 },
          minus: { x: 0, y: 3 },
          electromotiveForce: 40,
          internalResistance: 1,
          id: 23,
        },
        { _type: "wire", a: { x: 0, y: 3 }, b: { x: 0, y: 2 }, id: 1 },
        { _type: "resistor", a: { x: 0, y: 2 }, b: { x: 0, y: 1 }, resistance: 10, id: 18 },
        { _type: "wire", a: { x: 0, y: 1 }, b: { x: 0, y: 0 }, id: 0 },
        { _type: "wire", a: { x: 0, y: 0 }, b: { x: 4, y: 0 }, id: 10 },
      ],
    },
    {
      id: 1,
      a: { x: 0, y: 5 },
      b: { x: 4, y: 0 },
      components: [
        { _type: "wire", a: { x: 2, y: 3 }, b: { x: 0, y: 5 }, id: 12 },
        { _type: "resistor", a: { x: 2, y: 2 }, b: { x: 2, y: 3 }, resistance: 10, id: 17 },
        { _type: "wire", a: { x: 4, y: 0 }, b: { x: 2, y: 2 }, id: 11 },
      ],
    },
    {
      id: 2,
      a: { x: 0, y: 5 },
      b: { x: 8, y: 5 },

      components: [
        { _type: "wire", a: { x: 0, y: 5 }, b: { x: 4, y: 5 }, id: 3 },
        { _type: "resistor", a: { x: 4, y: 5 }, b: { x: 5, y: 5 }, resistance: 5, id: 16 },
        { _type: "wire", a: { x: 5, y: 5 }, b: { x: 8, y: 5 }, id: 4 },
      ],
    },
    {
      id: 3,
      a: { x: 4, y: 0 },
      b: { x: 8, y: 5 },
      components: [
        { _type: "wire", a: { x: 4, y: 0 }, b: { x: 5, y: 1 }, id: 13 },
        {
          _type: "sourceDC",
          plus: { x: 5, y: 1 },
          minus: { x: 6, y: 2 },
          internalResistance: 5,
          electromotiveForce: 40,
          id: 22,
        },
        { _type: "wire", a: { x: 6, y: 2 }, b: { x: 7, y: 3 }, id: 14 },
        { _type: "resistor", a: { x: 7, y: 3 }, b: { x: 7, y: 4 }, resistance: 40, id: 20 },
        { _type: "wire", a: { x: 7, y: 4 }, b: { x: 8, y: 5 }, id: 15 },
      ],
    },
    {
      id: 4,
      a: { x: 4, y: 0 },
      b: { x: 8, y: 5 },
      components: [
        { _type: "wire", a: { x: 4, y: 0 }, b: { x: 5, y: 0 }, id: 9 },
        { _type: "resistor", a: { x: 5, y: 0 }, b: { x: 6, y: 0 }, resistance: 3, id: 19 },
        { _type: "wire", a: { x: 6, y: 0 }, b: { x: 8, y: 0 }, id: 8 },
        { _type: "wire", a: { x: 8, y: 0 }, b: { x: 8, y: 1 }, id: 7 },
        {
          _type: "source",
          plus: { x: 8, y: 1 },
          minus: { x: 8, y: 2 },
          electromotiveForce: 10,
          internalResistance: 1,
          id: 24,
        },
        { _type: "wire", a: { x: 8, y: 2 }, b: { x: 8, y: 3 }, id: 6 },
        { _type: "resistor", a: { x: 8, y: 3 }, b: { x: 8, y: 4 }, resistance: 7, id: 21 },
        { _type: "wire", a: { x: 8, y: 4 }, b: { x: 8, y: 5 }, id: 5 },
      ],
    },
  ];

  const actgMatrix = simulator.buildGMatrix(actualNodes, actualBranches);

  expect(actgMatrix).toStrictEqual(expectedMatrix);
});

test("gMatrix test 2", () => {
  const expectedMatrix: number[][] = [
    [0.2350358422939068, -0.0989247311827957],
    [-0.0989247311827957, 0.27403993855606756],
  ];

  const components: ElectricalComponentWithID[] = [
    { _type: "wire", a: { x: 0, y: 3 }, b: { x: 0, y: 4 }, id: 0 },
    { _type: "resistor", a: { x: 0, y: 4 }, b: { x: 0, y: 5 }, resistance: 10, id: 1 },
    { _type: "wire", a: { x: 0, y: 5 }, b: { x: 0, y: 6 }, id: 2 },
    {
      _type: "source",
      plus: { x: 0, y: 6 },
      minus: { x: 1, y: 6 },
      electromotiveForce: 30,
      internalResistance: 1,
      id: 3,
    },
    { _type: "wire", a: { x: 1, y: 6 }, b: { x: 2, y: 6 }, id: 4 },
    { _type: "resistor", a: { x: 2, y: 6 }, b: { x: 3, y: 6 }, resistance: 20, id: 5 },
    { _type: "wire", a: { x: 3, y: 6 }, b: { x: 5, y: 6 }, id: 6 },
    { _type: "wire", a: { x: 5, y: 6 }, b: { x: 5, y: 3 }, id: 7 },
    { _type: "wire", a: { x: 0, y: 3 }, b: { x: 2, y: 3 }, id: 8 },
    { _type: "resistor", a: { x: 2, y: 3 }, b: { x: 3, y: 3 }, resistance: 15, id: 9 },
    { _type: "wire", a: { x: 3, y: 3 }, b: { x: 5, y: 3 }, id: 10 },
    { _type: "wire", a: { x: 0, y: 3 }, b: { x: 0, y: 2 }, id: 11 },
    { _type: "resistor", a: { x: 0, y: 2 }, b: { x: 0, y: 1 }, resistance: 40, id: 12 },
    { _type: "wire", a: { x: 0, y: 1 }, b: { x: 0, y: 0 }, id: 13 },
    { _type: "wire", a: { x: 0, y: 0 }, b: { x: 3, y: 0 }, id: 14 },
    { _type: "resistor", a: { x: 0, y: 3 }, b: { x: 1, y: 2 }, resistance: 8, id: 15 },
    {
      _type: "source",
      plus: { x: 1, y: 2 },
      minus: { x: 2, y: 1 },
      electromotiveForce: 10,
      internalResistance: 1,
      id: 16,
    },
    { _type: "wire", a: { x: 2, y: 1 }, b: { x: 3, y: 0 }, id: 17 },
    {
      _type: "source",
      plus: { x: 4, y: 0 },
      minus: { x: 3, y: 0 },
      electromotiveForce: 20,
      internalResistance: 1,
      id: 18,
    },
    { _type: "wire", a: { x: 4, y: 0 }, b: { x: 5, y: 0 }, id: 19 },
    { _type: "wire", a: { x: 5, y: 0 }, b: { x: 5, y: 1 }, id: 20 },
    { _type: "resistor", a: { x: 5, y: 1 }, b: { x: 5, y: 2 }, resistance: 6, id: 21 },
    { _type: "wire", a: { x: 5, y: 2 }, b: { x: 5, y: 3 }, id: 22 },
    { _type: "resistor", a: { x: 3, y: 0 }, b: { x: 3, y: 1 }, resistance: 30, id: 23 },
    {
      _type: "source",
      plus: { x: 3, y: 1 },
      minus: { x: 4, y: 2 },
      electromotiveForce: 40,
      internalResistance: 1,
      id: 24,
    },
    { _type: "wire", a: { x: 4, y: 2 }, b: { x: 5, y: 3 }, id: 25 },
  ];

  const simulator = new SimpleSimulator(components);

  const actgMatrix = simulator.buildGMatrix(simulator.findNodes(), simulator.findBranches());

  expect(actgMatrix).toStrictEqual(expectedMatrix);
});
test("gMatrix test 3", () => {
  const expectedMatrix: number[][] = [
    [0.39090909090909093, -0.19090909090909092],
    [-0.19090909090909092, 0.30404040404040406],
  ];

  const components: ElectricalComponentWithID[] = [
    { _type: "wire", a: { x: 0, y: 1 }, b: { x: 0, y: 0 }, id: 0 },
    { _type: "wire", a: { x: 0, y: 3 }, b: { x: 0, y: 2 }, id: 1 },
    { _type: "wire", a: { x: 0, y: 5 }, b: { x: 0, y: 4 }, id: 2 },
    { _type: "wire", a: { x: 0, y: 5 }, b: { x: 3, y: 5 }, id: 3 },
    { _type: "wire", a: { x: 3, y: 5 }, b: { x: 4, y: 5 }, id: 28 },
    { _type: "wire", a: { x: 5, y: 5 }, b: { x: 6, y: 5 }, id: 4 },
    { _type: "wire", a: { x: 6, y: 5 }, b: { x: 8, y: 5 }, id: 29 },
    { _type: "wire", a: { x: 8, y: 5 }, b: { x: 8, y: 4 }, id: 5 },
    { _type: "wire", a: { x: 8, y: 3 }, b: { x: 8, y: 2 }, id: 6 },
    { _type: "wire", a: { x: 8, y: 1 }, b: { x: 8, y: 0 }, id: 7 },
    { _type: "wire", a: { x: 8, y: 0 }, b: { x: 6, y: 0 }, id: 8 },
    { _type: "wire", a: { x: 5, y: 0 }, b: { x: 4, y: 0 }, id: 9 },
    { _type: "wire", a: { x: 0, y: 0 }, b: { x: 4, y: 0 }, id: 10 },
    { _type: "wire", a: { x: 2, y: 2 }, b: { x: 4, y: 0 }, id: 11 },
    { _type: "wire", a: { x: 0, y: 5 }, b: { x: 2, y: 3 }, id: 12 },
    { _type: "wire", a: { x: 5, y: 1 }, b: { x: 4, y: 0 }, id: 13 },
    { _type: "wire", a: { x: 7, y: 3 }, b: { x: 6, y: 2 }, id: 14 },
    { _type: "wire", a: { x: 8, y: 5 }, b: { x: 7, y: 4 }, id: 15 },
    { _type: "wire", a: { x: 3, y: 5 }, b: { x: 4, y: 7 }, id: 25 },
    { _type: "wire", a: { x: 5, y: 7 }, b: { x: 6, y: 5 }, id: 26 },
    { _type: "voltmeter", a: { x: 4, y: 7 }, b: { x: 5, y: 7 }, id: 27, voltage: "unknown" },
    { _type: "resistor", a: { x: 4, y: 5 }, b: { x: 5, y: 5 }, resistance: 5, id: 16 },
    { _type: "resistor", a: { x: 2, y: 3 }, b: { x: 2, y: 2 }, resistance: 10, id: 17 },
    { _type: "resistor", a: { x: 0, y: 2 }, b: { x: 0, y: 1 }, resistance: 10, id: 18 },
    { _type: "resistor", a: { x: 6, y: 0 }, b: { x: 5, y: 0 }, resistance: 3, id: 19 },
    { _type: "resistor", a: { x: 7, y: 4 }, b: { x: 7, y: 3 }, resistance: 40, id: 20 },
    { _type: "resistor", a: { x: 8, y: 4 }, b: { x: 8, y: 3 }, resistance: 7, id: 21 },
    {
      _type: "sourceDC",
      plus: { x: 5, y: 1 },
      minus: { x: 6, y: 2 },
      internalResistance: 5,
      electromotiveForce: 40,
      id: 22,
    },
    {
      _type: "source",
      plus: { x: 0, y: 4 },
      minus: { x: 0, y: 3 },
      electromotiveForce: 40,
      internalResistance: 1,
      id: 23,
    },
    {
      _type: "source",
      plus: { x: 8, y: 1 },
      minus: { x: 8, y: 2 },
      electromotiveForce: 10,
      internalResistance: 1,
      id: 24,
    },
  ];

  const simulator = new SimpleSimulator(components);
  const newCompomemts = simulator.rebuildShema(simulator.findBranches());
  const newSimulator = new SimpleSimulator(newCompomemts);
  const actgMatrix = newSimulator.buildGMatrix(newSimulator.findNodes(), newSimulator.findBranches());

  expect(actgMatrix).toStrictEqual(expectedMatrix);
});

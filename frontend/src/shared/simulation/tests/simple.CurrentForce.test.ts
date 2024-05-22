import { expect, test } from "vitest";
import { SimpleSimulator } from "../simulator";
import { Branch, ElectricalComponentWithID } from "../types";

test("current force test", () => {
  const expectedCurrentVector: number[] = [-3.6363636363636362, 1.797979797979798];
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
          plus: { x: 6, y: 2 },
          minus: { x: 5, y: 1 },
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

  const components = actualBranches.flatMap((it) => it.components);

  const simulator = new SimpleSimulator(components);

  const actCurrVect = simulator.findCurrentForce(actualNodes, actualBranches);
  expect(actCurrVect).toStrictEqual(expectedCurrentVector);
});

test("current force test 2", () => {
  const expectedCurrentVector: number[] = [-3.6363636363636362, 1.8383838383838382];
  const actualNodes = [
    { x: 0, y: 5 },
    { x: 4, y: 0 },
    { x: 6, y: 5 },
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
  const newCompomemts = simulator.rebuildShema(simulator.findBranches());
  const newSimulator = new SimpleSimulator(newCompomemts);
  const actualBranches = newSimulator.findBranches();
  const actCurrVect = simulator.findCurrentForce(actualNodes, actualBranches);
  expect(actCurrVect).toStrictEqual(expectedCurrentVector);
});

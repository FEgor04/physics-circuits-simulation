import { expect, test } from "vitest";
import { SimpleSimulator } from "../simulator";
import { Branch, ElectricalComponentWithID } from "../types";
import { expectBranchesToBe } from "./lib";

test("simple scheme with branches", () => {
  const expectedBranches: Branch[] = [
    {
      id: 0,
      a: { x: 3, y: 3 },
      b: { x: 3, y: 0 },
      components: [
        { id: 0, _type: "wire", a: { x: 3, y: 3 }, b: { x: 2, y: 3 } },
        { id: 1, _type: "resistor", a: { x: 2, y: 3 }, b: { x: 1, y: 3 }, resistance: 10 },
        { id: 2, _type: "wire", a: { x: 1, y: 3 }, b: { x: 0, y: 3 } },
        { id: 3, _type: "wire", a: { x: 0, y: 3 }, b: { x: 0, y: 0 } },
        { id: 4, _type: "wire", a: { x: 0, y: 0 }, b: { x: 3, y: 0 } },
      ],
    },
    {
      id: 1,
      a: { x: 3, y: 3 },
      b: { x: 3, y: 0 },
      components: [
        { id: 5, _type: "wire", a: { x: 3, y: 3 }, b: { x: 3, y: 2 } },
        { id: 6, _type: "resistor", a: { x: 3, y: 2 }, b: { x: 3, y: 1 }, resistance: 10 },
        { id: 7, _type: "wire", a: { x: 3, y: 1 }, b: { x: 3, y: 0 } },
      ],
    },
    {
      id: 2,
      a: { x: 3, y: 0 },
      b: { x: 3, y: 3 },
      components: [
        { id: 8, _type: "wire", a: { x: 3, y: 0 }, b: { x: 6, y: 0 } },
        { id: 9, _type: "wire", a: { x: 6, y: 0 }, b: { x: 6, y: 3 } },
        { id: 10, _type: "wire", a: { x: 6, y: 3 }, b: { x: 5, y: 3 } },
        { id: 11, _type: "resistor", a: { x: 5, y: 3 }, b: { x: 4, y: 3 }, resistance: 10 },
        { id: 12, _type: "wire", a: { x: 4, y: 3 }, b: { x: 3, y: 3 } },
      ],
    },
  ];

  const expectedNodes = expectedBranches.flatMap(({ a, b }) => [a, b]);

  const components: ElectricalComponentWithID[] = expectedBranches.flatMap((it) => it.components);

  const simulator = new SimpleSimulator(components);

  const actualNodes = simulator.findNodes();
  expectedNodes.forEach((node) => expect(actualNodes).toContainEqual(node));
  actualNodes.forEach((node) => expect(expectedNodes).toContainEqual(node));

  const actualBranches = simulator.findBranches();
  expectBranchesToBe(actualBranches, expectedBranches);
});

test("simple scheme with branches 2", () => {
  const expectedBranches: Branch[] = [
    {
      id: 0,
      a: { x: 0, y: 3 },
      b: { x: 5, y: 3 },
      components: [
        { id: 0, _type: "wire", a: { x: 0, y: 3 }, b: { x: 0, y: 4 } },
        { id: 1, _type: "resistor", a: { x: 0, y: 4 }, b: { x: 0, y: 5 }, resistance: 10 },
        { id: 2, _type: "wire", a: { x: 0, y: 5 }, b: { x: 0, y: 6 } },
        { id: 3, _type: "wire", a: { x: 0, y: 6 }, b: { x: 2, y: 6 } },
        { id: 4, _type: "resistor", a: { x: 2, y: 6 }, b: { x: 3, y: 6 }, resistance: 10 },
        { id: 5, _type: "wire", a: { x: 3, y: 6 }, b: { x: 5, y: 6 } },
        { id: 6, _type: "wire", a: { x: 5, y: 6 }, b: { x: 5, y: 3 } },
      ],
    },
    {
      id: 1,
      a: { x: 0, y: 3 },
      b: { x: 5, y: 3 },
      components: [
        { id: 7, _type: "wire", a: { x: 0, y: 3 }, b: { x: 2, y: 3 } },
        { id: 8, _type: "resistor", a: { x: 2, y: 3 }, b: { x: 3, y: 3 }, resistance: 10 },
        { id: 9, _type: "wire", a: { x: 3, y: 3 }, b: { x: 5, y: 3 } },
      ],
    },
    {
      id: 2,
      a: { x: 0, y: 3 },
      b: { x: 3, y: 0 },
      components: [
        { id: 10, _type: "wire", a: { x: 0, y: 3 }, b: { x: 0, y: 2 } },
        { id: 11, _type: "resistor", a: { x: 0, y: 2 }, b: { x: 0, y: 1 }, resistance: 10 },
        { id: 12, _type: "wire", a: { x: 0, y: 1 }, b: { x: 0, y: 0 } },
        { id: 13, _type: "wire", a: { x: 0, y: 0 }, b: { x: 3, y: 0 } },
      ],
    },
    {
      id: 3,
      a: { x: 0, y: 3 },
      b: { x: 3, y: 0 },
      components: [
        { id: 14, _type: "wire", a: { x: 0, y: 3 }, b: { x: 1, y: 2 } },
        { id: 15, _type: "resistor", a: { x: 1, y: 2 }, b: { x: 2, y: 1 }, resistance: 10 },
        { id: 16, _type: "wire", a: { x: 2, y: 1 }, b: { x: 3, y: 0 } },
      ],
    },
    {
      id: 4,
      a: { x: 3, y: 0 },
      b: { x: 5, y: 3 },
      components: [
        { id: 17, _type: "wire", a: { x: 3, y: 0 }, b: { x: 5, y: 0 } },
        { id: 18, _type: "wire", a: { x: 5, y: 0 }, b: { x: 5, y: 1 } },
        { id: 19, _type: "resistor", a: { x: 5, y: 1 }, b: { x: 5, y: 2 }, resistance: 10 },
        { id: 20, _type: "wire", a: { x: 5, y: 2 }, b: { x: 5, y: 3 } },
      ],
    },
    {
      id: 5,
      a: { x: 3, y: 0 },
      b: { x: 5, y: 3 },
      components: [
        { id: 21, _type: "wire", a: { x: 3, y: 0 }, b: { x: 3, y: 1 } },
        { id: 22, _type: "resistor", a: { x: 3, y: 1 }, b: { x: 4, y: 2 }, resistance: 10 },
        { id: 23, _type: "wire", a: { x: 4, y: 2 }, b: { x: 5, y: 3 } },
      ],
    },
  ];

  const expectedNodes = expectedBranches.flatMap(({ a, b }) => [a, b]);

  const components: ElectricalComponentWithID[] = expectedBranches.flatMap((it) => it.components);

  const simulator = new SimpleSimulator(components);

  const actualNodes = simulator.findNodes();
  expectedNodes.forEach((node) => expect(actualNodes).toContainEqual(node));
  actualNodes.forEach((node) => expect(expectedNodes).toContainEqual(node));

  const actualBranches = simulator.findBranches();
  expectBranchesToBe(actualBranches, expectedBranches);
});

test.skip("simple scheme with branches 3", () => {
  const expectedBranches: Branch[] = [
    {
      id: 0,
      a: { x: 1, y: 6 },
      b: { x: 1, y: 3 },
      components: [
        { id: 0, _type: "wire", a: { x: 1, y: 6 }, b: { x: 1, y: 5 } },
        { id: 1, _type: "resistor", a: { x: 1, y: 5 }, b: { x: 1, y: 4 }, resistance: 10 },
        { id: 2, _type: "wire", a: { x: 1, y: 4 }, b: { x: 1, y: 3 } },
      ],
    },
    {
      id: 1,
      a: { x: 1, y: 3 },
      b: { x: 1, y: 0 },
      components: [
        { id: 3, _type: "wire", a: { x: 1, y: 3 }, b: { x: 1, y: 2 } },
        { id: 4, _type: "resistor", a: { x: 1, y: 2 }, b: { x: 1, y: 1 }, resistance: 10 },
        { id: 5, _type: "wire", a: { x: 1, y: 1 }, b: { x: 1, y: 0 } },
      ],
    },
    {
      id: 2,
      a: { x: 1, y: 6 },
      b: { x: 1, y: 0 },
      components: [
        { id: 6, _type: "wire", a: { x: 1, y: 6 }, b: { x: 0, y: 6 } },
        { id: 7, _type: "wire", a: { x: 0, y: 6 }, b: { x: 0, y: 2 } },
        { id: 8, _type: "resistor", a: { x: 0, y: 2 }, b: { x: 0, y: 1 }, resistance: 10 },
        { id: 9, _type: "wire", a: { x: 0, y: 1 }, b: { x: 0, y: 0 } },
        { id: 10, _type: "wire", a: { x: 0, y: 0 }, b: { x: 1, y: 0 } },
      ],
    },
    {
      id: 3,
      a: { x: 1, y: 6 },
      b: { x: 4, y: 3 },
      components: [
        { id: 11, _type: "wire", a: { x: 1, y: 6 }, b: { x: 2, y: 6 } },
        { id: 12, _type: "resistor", a: { x: 2, y: 6 }, b: { x: 3, y: 6 }, resistance: 10 },
        { id: 13, _type: "wire", a: { x: 3, y: 6 }, b: { x: 4, y: 6 } },
        { id: 14, _type: "wire", a: { x: 4, y: 6 }, b: { x: 4, y: 3 } },
      ],
    },
    {
      id: 4,
      a: { x: 1, y: 3 },
      b: { x: 4, y: 3 },
      components: [
        { id: 15, _type: "wire", a: { x: 1, y: 3 }, b: { x: 2, y: 3 } },
        { id: 16, _type: "resistor", a: { x: 2, y: 3 }, b: { x: 3, y: 3 }, resistance: 10 },
        { id: 17, _type: "wire", a: { x: 3, y: 3 }, b: { x: 4, y: 3 } },
      ],
    },
    {
      id: 5,
      a: { x: 1, y: 0 },
      b: { x: 4, y: 3 },
      components: [
        { id: 18, _type: "wire", a: { x: 1, y: 0 }, b: { x: 2, y: 0 } },
        { id: 19, _type: "resistor", a: { x: 2, y: 0 }, b: { x: 3, y: 0 }, resistance: 10 },
        { id: 20, _type: "wire", a: { x: 3, y: 0 }, b: { x: 4, y: 0 } },
        { id: 21, _type: "wire", a: { x: 4, y: 0 }, b: { x: 4, y: 3 } },
        { id: 22, _type: "wire", a: { x: 3, y: 0 }, b: { x: 3, y: 1 } },
        { id: 23, _type: "wire", a: { x: 3, y: 1 }, b: { x: 2, y: 1 } },
        { id: 24, _type: "wire", a: { x: 2, y: 1 }, b: { x: 2, y: 0 } },
      ],
    },
  ];

  const expectedNodes = expectedBranches.flatMap(({ a, b }) => [a, b]);

  const components: ElectricalComponentWithID[] = expectedBranches.flatMap((it) => it.components);

  const simulator = new SimpleSimulator(components);

  const actualNodes = simulator.findNodes();
  expectedNodes.forEach((node) => expect(actualNodes).toContainEqual(node));
  actualNodes.forEach((node) => expect(expectedNodes).toContainEqual(node));

  const actualBranches = simulator.findBranches();
  expectBranchesToBe(actualBranches, expectedBranches);
});

test("simple scheme with branches 4", () => {
  const expectedBranches: Branch[] = [
    {
      id: 0,
      a: { x: 0, y: 1 },
      b: { x: 3, y: 4 },
      components: [
        { id: 0, _type: "wire", a: { x: 0, y: 1 }, b: { x: 0, y: 4 } },
        { id: 1, _type: "wire", a: { x: 0, y: 4 }, b: { x: 1, y: 4 } },
        { id: 2, _type: "resistor", a: { x: 1, y: 4 }, b: { x: 2, y: 4 }, resistance: 10 },
        { id: 3, _type: "wire", a: { x: 2, y: 4 }, b: { x: 3, y: 4 } },
      ],
    },
    {
      id: 1,
      a: { x: 3, y: 1 },
      b: { x: 3, y: 4 },
      components: [
        { id: 4, _type: "wire", a: { x: 3, y: 1 }, b: { x: 3, y: 2 } },
        { id: 5, _type: "resistor", a: { x: 3, y: 2 }, b: { x: 3, y: 3 }, resistance: 10 },
        { id: 6, _type: "wire", a: { x: 3, y: 3 }, b: { x: 3, y: 4 } },
      ],
    },
    {
      id: 2,
      a: { x: 0, y: 1 },
      b: { x: 3, y: 1 },
      components: [
        { id: 7, _type: "wire", a: { x: 0, y: 1 }, b: { x: 1, y: 1 } },
        { id: 8, _type: "resistor", a: { x: 1, y: 1 }, b: { x: 2, y: 1 }, resistance: 10 },
        { id: 9, _type: "wire", a: { x: 2, y: 1 }, b: { x: 3, y: 1 } },
      ],
    },
    {
      id: 3,
      a: { x: 3, y: 4 },
      b: { x: 6, y: 1 },
      components: [
        { id: 10, _type: "wire", a: { x: 3, y: 4 }, b: { x: 4, y: 4 } },
        { id: 11, _type: "resistor", a: { x: 4, y: 4 }, b: { x: 5, y: 4 }, resistance: 10 },
        { id: 12, _type: "wire", a: { x: 5, y: 4 }, b: { x: 6, y: 4 } },
        { id: 13, _type: "wire", a: { x: 6, y: 4 }, b: { x: 6, y: 1 } },
      ],
    },
    {
      id: 4,
      a: { x: 3, y: 1 },
      b: { x: 6, y: 1 },
      components: [
        { id: 14, _type: "wire", a: { x: 3, y: 1 }, b: { x: 4, y: 1 } },
        { id: 15, _type: "resistor", a: { x: 4, y: 1 }, b: { x: 5, y: 1 }, resistance: 10 },
        { id: 16, _type: "wire", a: { x: 5, y: 1 }, b: { x: 6, y: 1 } },
      ],
    },
    {
      id: 5,
      a: { x: 0, y: 1 },
      b: { x: 6, y: 1 },
      components: [
        { id: 17, _type: "wire", a: { x: 0, y: 1 }, b: { x: 0, y: 0 } },
        { id: 18, _type: "wire", a: { x: 0, y: 0 }, b: { x: 1, y: 0 } },
        { id: 19, _type: "resistor", a: { x: 1, y: 0 }, b: { x: 2, y: 0 }, resistance: 10 },
        { id: 20, _type: "wire", a: { x: 2, y: 0 }, b: { x: 6, y: 0 } },
        { id: 21, _type: "resistor", a: { x: 6, y: 0 }, b: { x: 6, y: 1 }, resistance: 10 },
      ],
    },
  ];

  const expectedNodes = expectedBranches.flatMap(({ a, b }) => [a, b]);

  const components: ElectricalComponentWithID[] = expectedBranches.flatMap((it) => it.components);

  const simulator = new SimpleSimulator(components);

  const actualNodes = simulator.findNodes();
  expectedNodes.forEach((node) => expect(actualNodes).toContainEqual(node));
  actualNodes.forEach((node) => expect(expectedNodes).toContainEqual(node));

  const actualBranches = simulator.findBranches();
  expectBranchesToBe(actualBranches, expectedBranches);
});

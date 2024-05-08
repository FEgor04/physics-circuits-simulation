import { expect, test } from "vitest";
import { SimpleSimulator } from "../simulator";
import { Branch, ElectricalComponent } from "../types";
import { expectBranchesToBe } from "./lib";

test("simple scheme with branches", () => {
  const expectedBranches: Branch[] = [
    {
      id: 0,
      a: { x: 3, y: 3 },
      b: { x: 3, y: 0 },
      components: [
        { _type: "wire", a: { x: 3, y: 3 }, b: { x: 2, y: 3 } },
        { _type: "resistor", a: { x: 2, y: 3 }, b: { x: 1, y: 3 }, resistance: 10 },
        { _type: "wire", a: { x: 1, y: 3 }, b: { x: 0, y: 3 } },
        { _type: "wire", a: { x: 0, y: 3 }, b: { x: 0, y: 0 } },
        { _type: "wire", a: { x: 0, y: 0 }, b: { x: 3, y: 0 } },
      ],
    },
    {
      id: 1,
      a: { x: 3, y: 3 },
      b: { x: 3, y: 0 },
      components: [
        { _type: "wire", a: { x: 3, y: 3 }, b: { x: 3, y: 2 } },
        { _type: "resistor", a: { x: 3, y: 2 }, b: { x: 3, y: 1 }, resistance: 10 },
        { _type: "wire", a: { x: 3, y: 1 }, b: { x: 3, y: 0 } },
      ],
    },
    {
      id: 2,
      a: { x: 3, y: 0 },
      b: { x: 3, y: 3 },
      components: [
        { _type: "wire", a: { x: 3, y: 0 }, b: { x: 6, y: 0 } },
        { _type: "wire", a: { x: 6, y: 0 }, b: { x: 6, y: 3 } },
        { _type: "wire", a: { x: 6, y: 3 }, b: { x: 5, y: 3 } },
        { _type: "resistor", a: { x: 5, y: 3 }, b: { x: 4, y: 3 }, resistance: 10 },
        { _type: "wire", a: { x: 4, y: 3 }, b: { x: 3, y: 3 } },
      ],
    },
  ];

  const expectedNodes = expectedBranches.flatMap(({ a, b }) => [a, b]);

  const components: ElectricalComponent[] = expectedBranches.flatMap((it) => it.components);

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
        { _type: "wire", a: { x: 0, y: 3 }, b: { x: 0, y: 4 } },
        { _type: "resistor", a: { x: 0, y: 4 }, b: { x: 0, y: 5 }, resistance: 10 },
        { _type: "wire", a: { x: 0, y: 5 }, b: { x: 0, y: 6 } },
        { _type: "wire", a: { x: 0, y: 6 }, b: { x: 2, y: 6 } },
        { _type: "resistor", a: { x: 2, y: 6 }, b: { x: 3, y: 6 }, resistance: 10 },
        { _type: "wire", a: { x: 3, y: 6 }, b: { x: 5, y: 6 } },
        { _type: "wire", a: { x: 5, y: 6 }, b: { x: 5, y: 3 } },
      ],
    },
    {
      id: 1,
      a: { x: 0, y: 3 },
      b: { x: 5, y: 3 },
      components: [
        { _type: "wire", a: { x: 0, y: 3 }, b: { x: 2, y: 3 } },
        { _type: "resistor", a: { x: 2, y: 3 }, b: { x: 3, y: 3 }, resistance: 10 },
        { _type: "wire", a: { x: 3, y: 3 }, b: { x: 5, y: 3 } },
      ],
    },
    {
      id: 2,
      a: { x: 0, y: 3 },
      b: { x: 3, y: 0 },
      components: [
        { _type: "wire", a: { x: 0, y: 3 }, b: { x: 0, y: 2 } },
        { _type: "resistor", a: { x: 0, y: 2 }, b: { x: 0, y: 1 }, resistance: 10 },
        { _type: "wire", a: { x: 0, y: 1 }, b: { x: 0, y: 0 } },
        { _type: "wire", a: { x: 0, y: 0 }, b: { x: 3, y: 0 } },
      ],
    },
    {
      id: 3,
      a: { x: 0, y: 3 },
      b: { x: 3, y: 0 },
      components: [
        { _type: "wire", a: { x: 0, y: 3 }, b: { x: 1, y: 2 } },
        { _type: "resistor", a: { x: 1, y: 2 }, b: { x: 2, y: 1 }, resistance: 10 },
        { _type: "wire", a: { x: 2, y: 1 }, b: { x: 3, y: 0 } },
      ],
    },
    {
      id: 4,
      a: { x: 3, y: 0 },
      b: { x: 5, y: 3 },
      components: [
        { _type: "wire", a: { x: 3, y: 0 }, b: { x: 5, y: 0 } },
        { _type: "wire", a: { x: 5, y: 0 }, b: { x: 5, y: 1 } },
        { _type: "resistor", a: { x: 5, y: 1 }, b: { x: 5, y: 2 }, resistance: 10 },
        { _type: "wire", a: { x: 5, y: 2 }, b: { x: 5, y: 3 } },
      ],
    },
    {
      id: 5,
      a: { x: 3, y: 0 },
      b: { x: 5, y: 3 },
      components: [
        { _type: "wire", a: { x: 3, y: 0 }, b: { x: 3, y: 1 } },
        { _type: "resistor", a: { x: 3, y: 1 }, b: { x: 4, y: 2 }, resistance: 10 },
        { _type: "wire", a: { x: 4, y: 2 }, b: { x: 5, y: 3 } },
      ],
    },
  ];

  const expectedNodes = expectedBranches.flatMap(({ a, b }) => [a, b]);

  const components: ElectricalComponent[] = expectedBranches.flatMap((it) => it.components);

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
        { _type: "wire", a: { x: 1, y: 6 }, b: { x: 1, y: 5 } },
        { _type: "resistor", a: { x: 1, y: 5 }, b: { x: 1, y: 4 }, resistance: 10 },
        { _type: "wire", a: { x: 1, y: 4 }, b: { x: 1, y: 3 } },
      ],
    },
    {
      id: 1,
      a: { x: 1, y: 3 },
      b: { x: 1, y: 0 },
      components: [
        { _type: "wire", a: { x: 1, y: 3 }, b: { x: 1, y: 2 } },
        { _type: "resistor", a: { x: 1, y: 2 }, b: { x: 1, y: 1 }, resistance: 10 },
        { _type: "wire", a: { x: 1, y: 1 }, b: { x: 1, y: 0 } },
      ],
    },
    {
      id: 2,
      a: { x: 1, y: 6 },
      b: { x: 1, y: 0 },
      components: [
        { _type: "wire", a: { x: 1, y: 6 }, b: { x: 0, y: 6 } },
        { _type: "wire", a: { x: 0, y: 6 }, b: { x: 0, y: 2 } },
        { _type: "resistor", a: { x: 0, y: 2 }, b: { x: 0, y: 1 }, resistance: 10 },
        { _type: "wire", a: { x: 0, y: 1 }, b: { x: 0, y: 0 } },
        { _type: "wire", a: { x: 0, y: 0 }, b: { x: 1, y: 0 } },
      ],
    },
    {
      id: 3,
      a: { x: 1, y: 6 },
      b: { x: 4, y: 3 },
      components: [
        { _type: "wire", a: { x: 1, y: 6 }, b: { x: 2, y: 6 } },
        { _type: "resistor", a: { x: 2, y: 6 }, b: { x: 3, y: 6 }, resistance: 10 },
        { _type: "wire", a: { x: 3, y: 6 }, b: { x: 4, y: 6 } },
        { _type: "wire", a: { x: 4, y: 6 }, b: { x: 4, y: 3 } },
      ],
    },
    {
      id: 4,
      a: { x: 1, y: 3 },
      b: { x: 4, y: 3 },
      components: [
        { _type: "wire", a: { x: 1, y: 3 }, b: { x: 2, y: 3 } },
        { _type: "resistor", a: { x: 2, y: 3 }, b: { x: 3, y: 3 }, resistance: 10 },
        { _type: "wire", a: { x: 3, y: 3 }, b: { x: 4, y: 3 } },
      ],
    },
    {
      id: 5,
      a: { x: 1, y: 0 },
      b: { x: 4, y: 3 },
      components: [
        { _type: "wire", a: { x: 1, y: 0 }, b: { x: 2, y: 0 } },
        { _type: "resistor", a: { x: 2, y: 0 }, b: { x: 3, y: 0 }, resistance: 10 },
        { _type: "wire", a: { x: 3, y: 0 }, b: { x: 4, y: 0 } },
        { _type: "wire", a: { x: 4, y: 0 }, b: { x: 4, y: 3 } },
        { _type: "wire", a: { x: 3, y: 0 }, b: { x: 3, y: 1 } },
        { _type: "wire", a: { x: 3, y: 1 }, b: { x: 2, y: 1 } },
        { _type: "wire", a: { x: 2, y: 1 }, b: { x: 2, y: 0 } },
      ],
    },
  ];

  const expectedNodes = expectedBranches.flatMap(({ a, b }) => [a, b]);

  const components: ElectricalComponent[] = expectedBranches.flatMap((it) => it.components);

  const simulator = new SimpleSimulator(components);

  const actualNodes = simulator.findNodes();
  expectedNodes.forEach((node) => expect(actualNodes).toContainEqual(node));
  actualNodes.forEach((node) => expect(expectedNodes).toContainEqual(node));

  const actualBranches = simulator.findBranches();
  expectBranchesToBe(actualBranches, expectedBranches);
});

test.skip("simple scheme with branches 4", () => {
  const expectedBranches: Branch[] = [
    {
      id: 0,
      a: { x: 0, y: 1 },
      b: { x: 3, y: 4 },
      components: [
        { _type: "wire", a: { x: 0, y: 1 }, b: { x: 0, y: 4 } },
        { _type: "wire", a: { x: 0, y: 4 }, b: { x: 1, y: 4 } },
        { _type: "resistor", a: { x: 1, y: 4 }, b: { x: 2, y: 4 }, resistance: 10 },
        { _type: "wire", a: { x: 2, y: 4 }, b: { x: 3, y: 4 } },
      ],
    },
    {
      id: 1,
      a: { x: 3, y: 1 },
      b: { x: 3, y: 4 },
      components: [
        { _type: "wire", a: { x: 3, y: 1 }, b: { x: 3, y: 2 } },
        { _type: "resistor", a: { x: 3, y: 2 }, b: { x: 3, y: 3 }, resistance: 10 },
        { _type: "wire", a: { x: 3, y: 3 }, b: { x: 3, y: 4 } },
      ],
    },
    {
      id: 2,
      a: { x: 0, y: 1 },
      b: { x: 3, y: 1 },
      components: [
        { _type: "wire", a: { x: 0, y: 1 }, b: { x: 1, y: 1 } },
        { _type: "resistor", a: { x: 1, y: 1 }, b: { x: 2, y: 1 }, resistance: 10 },
        { _type: "wire", a: { x: 2, y: 1 }, b: { x: 3, y: 1 } },
      ],
    },
    {
      id: 3,
      a: { x: 3, y: 4 },
      b: { x: 6, y: 1 },
      components: [
        { _type: "wire", a: { x: 3, y: 4 }, b: { x: 4, y: 4 } },
        { _type: "resistor", a: { x: 4, y: 4 }, b: { x: 5, y: 4 }, resistance: 10 },
        { _type: "wire", a: { x: 5, y: 4 }, b: { x: 6, y: 4 } },
        { _type: "wire", a: { x: 6, y: 4 }, b: { x: 6, y: 1 } },
      ],
    },
    {
      id: 4,
      a: { x: 3, y: 1 },
      b: { x: 6, y: 1 },
      components: [
        { _type: "wire", a: { x: 3, y: 1 }, b: { x: 4, y: 1 } },
        { _type: "resistor", a: { x: 4, y: 1 }, b: { x: 5, y: 1 }, resistance: 10 },
        { _type: "wire", a: { x: 5, y: 1 }, b: { x: 6, y: 1 } },
      ],
    },
    {
      id: 5,
      a: { x: 0, y: 1 },
      b: { x: 6, y: 1 },
      components: [
        { _type: "wire", a: { x: 0, y: 1 }, b: { x: 0, y: 0 } },
        { _type: "wire", a: { x: 0, y: 0 }, b: { x: 1, y: 0 } },
        { _type: "resistor", a: { x: 1, y: 0 }, b: { x: 2, y: 0 }, resistance: 10 },
        { _type: "wire", a: { x: 2, y: 0 }, b: { x: 6, y: 0 } },
        { _type: "resistor", a: { x: 6, y: 0 }, b: { x: 6, y: 1 }, resistance: 10 },
      ],
    },
  ];

  const expectedNodes = expectedBranches.flatMap(({ a, b }) => [a, b]);

  const components: ElectricalComponent[] = expectedBranches.flatMap((it) => it.components);

  const simulator = new SimpleSimulator(components);

  const actualNodes = simulator.findNodes();
  expectedNodes.forEach((node) => expect(actualNodes).toContainEqual(node));
  actualNodes.forEach((node) => expect(expectedNodes).toContainEqual(node));

  const actualBranches = simulator.findBranches();
  expectBranchesToBe(actualBranches, expectedBranches);
});

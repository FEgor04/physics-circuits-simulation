import { expect, test } from "vitest";
import { SimpleSimulator } from "./simulator";
import { Branch, ElectricalComponent } from "./types";
import { branchToString, branchesEqual, pointsEqual } from "./lib";

test("not simple scheme with branches", () => {
  const expectedBranches: Branch[] = [
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
  const expectedNodes = expectedBranches.flatMap(({ a, b }) => [a, b]);

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

  const actualBranches = simulator.findBranches();

  // TODO: implement deduplication
  expect(actualBranches.length).toBe(expectedBranches.length * 2);

  /**
   * Test that `actualBranches` contain all `expectedBranches`,
   * i.e. that `expectedBranches` \subset `actualBranches`.
   */
  expectedBranches.forEach((branch) => {
    const actualBranchWithSameStartingPoints = actualBranches.find((it) => branchesEqual(branch, it));
    expect(actualBranchWithSameStartingPoints).not.toBeUndefined();
  });

  /**
   * Test that `expectedBranches` contain all `actualBranches`,
   * i.e. that `actualBranches` \subset `expectedBranches`.
   */
  actualBranches.forEach((branch) => {
    const expectedBrach = expectedBranches.find((it) => branchesEqual(branch, it));
    expect(expectedBrach).not.toBeUndefined();
  });

  /**
   * And since `actualBranches` \subset `expectedBranches` and
   * `expectedBranches` \subset `actualBranches`, then
   * `expectedBranches` equals to `actualBranches` (as a set)
   */
});

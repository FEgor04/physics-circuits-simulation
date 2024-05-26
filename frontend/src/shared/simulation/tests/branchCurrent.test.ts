import { expect, test } from "vitest";
import { SimpleSimulator } from "../simulator";
import { ElectricalComponentWithID } from "../types";

test("branch current test", () => {
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
      currentForce: 1,
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
  const newComponents = simulator.rebuildShema(simulator.findBranches());
  const newSimulator = new SimpleSimulator(newComponents);
  const actualBranches = newSimulator.findBranches();
  const g = newSimulator.buildGMatrix(actualNodes, actualBranches);
  const curr = newSimulator.findCurrentForce(actualNodes, actualBranches);
  const arcSolve = newSimulator.solveSLAE(g, curr);
  const phi1 = arcSolve[0];
  const phi2 = arcSolve[1];
  const phi3 = arcSolve[2];
  const R1 = 10;
  const R2 = 10;
  const R3 = 5;
  const R4 = 3;
  const R5 = 7;
  const R6 = 40;
  const E1 = 40;
  const E2 = 10;
  const r1 = 1;
  const r2 = 1;
  const r3 = 5;
  console.log();
  const branchCurr = newSimulator.branchCurrent(actualBranches, actualNodes, arcSolve);

  const expectedCurrent: number[] = [
    (phi1 - phi2 + E1) / (r1 + R1),
    (phi2 - phi1) / R2,
    (phi3 - phi1) / R3,
    Infinity,
    (phi2 - phi3 + E2) / (r2 + R4 + R5),
    (phi3 - phi2) / (r3 + R6),
  ];
  expect(branchCurr).toStrictEqual(expectedCurrent);
});

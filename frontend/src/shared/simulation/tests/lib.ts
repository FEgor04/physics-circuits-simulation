import { expect } from "vitest";
import { branchesEqual } from "../lib";
import { Branch } from "../types";

export function expectBranchesToBe(actualBranches: Array<Branch>, expectedBranches: Array<Branch>) {
  expect(actualBranches.length).toBe(expectedBranches.length);

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
}

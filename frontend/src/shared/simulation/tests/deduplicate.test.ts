import { describe, expect, test } from "vitest";
import { deduplicateArray } from "../lib";

describe("deduplciation", () => {
  test("on integers", () => {
    const input = [1, 1, 1, 3, 3, 4];
    const expected = [1, 3, 4];
    const actual = deduplicateArray(input, (a, b) => a == b);
    expect(actual).toStrictEqual(expected);
  });
});

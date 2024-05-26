import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useSimulationState } from "../model/state";

const setup = () => {
  const { result, ...utils } = renderHook(() => useSimulationState([]));
  return { result, ...utils };
};

describe("isDirty property", () => {
  it("is true if scheme was changed", () => {
    const { result } = setup();
    act(() => {
      result.current.onAddComponent({ _type: "wire", a: { x: 0, y: 0 }, b: { x: 1, y: 1 } });
    });
    expect(result.current.components).toHaveLength(1);
    expect(result.current.isDirty).toStrictEqual(true);
  });
});

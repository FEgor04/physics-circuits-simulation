import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useSimulationState } from "../model/state";

const setup = () => {
  const { result, ...utils } = renderHook(() => useSimulationState([]));
  return { result, ...utils };
};

describe("onAddComponent callback", () => {
  it("doesn't add new wire with 2 equal points", async () => {
    const { result } = setup();
    await act(() => result.current.onAddComponent({ _type: "wire", a: { x: 1, y: 1 }, b: { x: 1, y: 1 } }));
    expect(result.current.components).toHaveLength(0);
  });

  it("adds one wire if it doesn't cross integer points", async () => {
    const { result } = setup();
    await act(() => result.current.onAddComponent({ _type: "wire", a: { x: 1, y: 1 }, b: { x: 1, y: 2 } }));
    expect(result.current.components).toHaveLength(1);
  });
});

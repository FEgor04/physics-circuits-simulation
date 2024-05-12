/* eslint-disable react-refresh/only-export-components */
import { useContext, createContext } from "react";
import { Point } from "@/shared/simulation/types";
import { CanvasParams, transformVirtualToCanvas } from "../lib";

export type CanvasState = {
  canvasParams: CanvasParams;
};

export const CanvasContext = createContext<CanvasState | undefined>(undefined);

function useCanvasContext<T>(selector: (state: CanvasState) => T) {
  const state = useContext(CanvasContext);
  if (state == undefined) {
    throw new Error("CanvasContext is undefined");
  }
  return selector(state);
}

export const useCanvasParams = () => useCanvasContext((state) => state.canvasParams);

export const useTransformVirtualToCanvas = () => {
  const canvasParams = useCanvasParams();
  return (point: Point) => {
    return transformVirtualToCanvas(point, canvasParams);
  };
};

export const useCanvasGrid = () =>
  useCanvasContext(({canvasParams: params}) => {
    const coefficientX = params.width / params.schemeWidth;
    const coefficientY = params.height / params.schemeHeight;
    const coefficient = Math.min(coefficientX, coefficientY);
    return coefficient;
  });

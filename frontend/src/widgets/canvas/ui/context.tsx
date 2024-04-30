import { useContext, createContext } from "react";
import { Point } from "@/shared/simulation/types";
import { transformVirtualToCanvas } from "../lib";

type CanvasParams = {
  width: number;
  height: number;
};

type CanvasContextValue = {
  canvasParams: CanvasParams;
};

export const CanvasContext = createContext<CanvasContextValue | undefined>(
  undefined,
);

// eslint-disable-next-line react-refresh/only-export-components
export const useCanvasParams = () => {
  return useContext(CanvasContext)?.canvasParams;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTransformVirtualToCanvas = () => {
  const canvasParams = useContext(CanvasContext)!.canvasParams;
  return (point: Point) => {
    return transformVirtualToCanvas(point, canvasParams);
  };
};

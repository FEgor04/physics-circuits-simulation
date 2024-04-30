import { useContext, createContext } from "react";
import { Point } from "@/shared/simulation/types";
import { transformVirtualToCanvas } from "../lib";

type CanvasParams = {
  width: number;
  height: number;
};

type SelectedComponent = {
  type: "component";
  id: number;
};

type SelectedPoint = {
  type: "point";
  point: Point;
};

export type CanvasState = {
  canvasParams: CanvasParams;
  /**
   * ID выбранного компонента или координаты выбранной точки
   **/
  selected: SelectedComponent | SelectedPoint | undefined;
};

export const CanvasContext = createContext<CanvasState | undefined>(undefined);

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

export const useSelectedElement = () => {
  return useContext(CanvasContext)!.selected;
};

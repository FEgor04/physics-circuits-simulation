/* eslint-disable react-refresh/only-export-components */
import { useContext, createContext } from "react";
import { ElectricalComponentID, Point } from "@/shared/simulation/types";
import { transformVirtualToCanvas } from "../lib";

type CanvasParams = {
  width: number;
  height: number;
};

export type SelectedComponent = {
  type: "component";
  id: ElectricalComponentID;
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
  onSelect: (component: SelectedComponent | SelectedPoint | undefined) => void;
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

export const useSelectedElement = () => {
  return useContext(CanvasContext)!.selected;
};

export const useOnSelectElement = () => {
  return useContext(CanvasContext)!.onSelect;
};

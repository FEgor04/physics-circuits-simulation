import { Point } from "@/shared/simulation/types";

/**
 * Ширина и высота сетки компонентов
 * Измеряется в количетсве точек, доступных для установки компонентов
 **/
export const schemeWidth = 21;
export const schemeHeight = 21;

export type CanvasParams = {
  width: number;
  height: number;
};

export function transformVirtualToCanvas(point: Point, params: CanvasParams): Point {
  const coefficientX = params.width / schemeWidth;
  const coefficientY = params.height / schemeWidth;
  const coefficient = Math.min(coefficientX, coefficientY);
  return {
    x: point.x * coefficient + params.width / 2,
    y: params.height / 2 - point.y * coefficient,
  };
}

import { Point } from "@/shared/simulation/types";

/**
 * Ширина и высота сетки компонентов
 * Измеряется в количетсве точек, доступных для установки компонентов
 **/
export const schemeWidth = 20;
export const schemeHeight = 20;

export type CanvasParams = {
  width: number;
  height: number;
};

export function transformVirtualToCanvas(
  point: Point,
  params: CanvasParams,
): Point {
  const coefficientX = params.width / schemeWidth;
  const coefficientY = params.height / schemeWidth;
  return {
    x: point.x * coefficientX + params.width / 2 + coefficientX / 2,
    y: params.height / 2 - point.y * coefficientY - coefficientY / 2,
  };
}

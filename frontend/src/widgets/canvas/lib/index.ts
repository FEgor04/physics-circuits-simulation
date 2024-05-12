import { Point } from "@/shared/simulation/types";

/**
 * width, height:
 * Ширина и высота контейнера
 *
 * schemeWidth, schemeHeight:
 * Ширина и высота сетки компонентов
 * Измеряется в количетсве точек, доступных для установки компонентов
 **/

export type CanvasParams = {
  width: number;
  height: number;
  schemeWidth: number;
  schemeHeight: number;
};

export function transformVirtualToCanvas(point: Point, params: CanvasParams): Point {
  const coefficientX = params.width / params.schemeWidth;
  const coefficientY = params.height / params.schemeHeight;
  return {
    x: point.x * coefficientX + params.width / 2,
    y: params.height / 2 - point.y * coefficientY,
  };
}

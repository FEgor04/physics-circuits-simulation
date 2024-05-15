import { svgSize } from "@/shared/assets/circuit";
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
  const coefficient = svgSize;
  return {
    x: point.x * coefficient + params.width / 2,
    y: params.height / 2 - point.y * coefficient,
  };
}

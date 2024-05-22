import { zoomCoefficientValues } from "@/features/zoom-provider";
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
  zoomCoefficient: zoomCoefficientValues;
};

export function transformVirtualToCanvas(point: Point, params: CanvasParams): Point {
  return {
    x: point.x * params.zoomCoefficient + params.width / 2,
    y: params.height / 2 - point.y * params.zoomCoefficient,
  };
}

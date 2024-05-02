import { Branch, ElectricalComponent, Point } from "./types";

export function getComponentContacts(component: ElectricalComponent): Array<Point> {
  if (
    component._type === "wire" ||
    component._type === "resistor" ||
    component._type === "voltmeter" ||
    component._type === "ampermeter"
  ) {
    return [component.a, component.b];
  } else if (component._type === "source") {
    return [component.plus, component.minus];
  }
  throw new Error("not all cases are covered");
}

export function pointsEqual(a: Point, b: Point) {
  return a.x == b.x && a.y == b.y;
}

export function branchFactory(start: Point, end: Point, components: Array<ElectricalComponent>): Branch {
  return {
    id: 0,
    a: start,
    b: end,
    components,
  };
}

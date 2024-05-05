import { Branch, ElectricalComponent, Point } from "./types";

export function getComponentContacts(component: ElectricalComponent): Array<Point> {
  if (
    component.type === "wire" ||
    component.type === "resistor" ||
    component.type === "voltmeter" ||
    component.type === "ampermeter"
  ) {
    return [component.a, component.b];
  } else if (component.type === "source") {
    return [component.a, component.b];
  }
  throw new Error("not all cases are covered");
}

export function pointsEqual(a: Point, b: Point) {
  return a.x == b.x && a.y == b.y;
}

export function branchesEqual(a: Branch, b: Branch, strictEqual: boolean = false) {
  if (pointsEqual(a.a, b.a) && pointsEqual(a.b, b.b)) {
    if (a.components.length != b.components.length) {
      return false;
    }
    return a.components
      .map((element, idx) => componentsEqual(element, b.components[idx]))
      .reduce((a, b) => a && b, true);
  }
  if (pointsEqual(a.a, b.b) && pointsEqual(b.a, a.b) && !strictEqual) {
    if (a.components.length != b.components.length) {
      return false;
    }
    return a.components
      .map((element, idx) => componentsEqual(element, b.components[idx]))
      .reduce((a, b) => a && b, true);
  }
  return false;
}

export function branchToString(a: Branch) {
  return `(${a.a.x}, ${a.a.y}) -- (${a.b.x}, ${a.b.y})`;
}

export function branchFactory(start: Point, end: Point, components: Array<ElectricalComponent>): Branch {
  return {
    id: 0,
    a: start,
    b: end,
    components,
  };
}

export function componentsEqual(a: ElectricalComponent, b: ElectricalComponent): boolean {
  if (a.type != b.type) {
    return false;
  }
  const aContacts = getComponentContacts(a);
  const bContacts = getComponentContacts(b);
  aContacts.forEach((contact) => {
    if (bContacts.find((it) => pointsEqual(it, contact)) === undefined) {
      return false;
    }
  });
  bContacts.forEach((contact) => {
    if (aContacts.find((it) => pointsEqual(it, contact)) === undefined) {
      return false;
    }
  });
  return true;
}

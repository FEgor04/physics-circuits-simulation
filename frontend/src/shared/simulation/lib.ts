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
      .map((element, idx) => componentsEqual(element, b.components[b.components.length - idx - 1]))
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
  if (a._type != b._type) {
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

export function deduplicateArray<T>(array: ReadonlyArray<T>, equality: (a: T, b: T) => boolean): Array<T> {
  const answer: Array<T> = [];
  array.forEach((elem) => {
    if (answer.find((it) => equality(it, elem)) === undefined) {
      answer.push(elem);
    }
  });
  return answer;
}

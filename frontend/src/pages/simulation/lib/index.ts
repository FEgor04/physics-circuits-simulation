import { assertNever } from "@/shared/lib/types";
import { ElectricalComponent, ElectricalComponentID, ElectricalComponentWithID } from "@/shared/simulation";

export function updateComponentCoords<T extends ElectricalComponent>(component: T, dx: number, dy: number): T {
  if (
    component._type == "resistor" ||
    component._type == "wire" ||
    component._type == "voltmeter" ||
    component._type == "ampermeter"
  ) {
    const newA = {
      x: component.a.x + dx,
      y: component.a.y + dy,
    };
    const newB = {
      x: component.b.x + dx,
      y: component.b.y + dy,
    };
    return {
      ...component,
      a: newA,
      b: newB,
    };
  }
  if (component._type == "source") {
    const newPlus = {
      x: component.plus.x + dx,
      y: component.plus.y + dy,
    };
    const newMinus = {
      x: component.minus.x + dx,
      y: component.minus.y + dy,
    };
    return {
      ...component,
      minus: newMinus,
      plus: newPlus,
    };
  }
  return component;
}

function generateComponentId(components: ReadonlyArray<ElectricalComponentWithID>): ElectricalComponentID {
  return (
    components
      .map((it) => it.id)
      .sort()
      .reverse()[0] + 1
  );
}

export function addComponentWithId(
  components: ReadonlyArray<ElectricalComponentWithID>,
  component: ElectricalComponent,
): Array<ElectricalComponentWithID> {
  const newId = generateComponentId(components);
  return [...components, { ...component, id: newId }];
}

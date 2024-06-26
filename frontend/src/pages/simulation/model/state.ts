import { useMemo, useState } from "react";
import { useIsArrayDirty } from "@/shared/lib/is-dirty";
import { schemaErrors } from "@/shared/simulation/errors";
import { componentsEqual, pointsEqual } from "@/shared/simulation/lib";
import { SimpleSimulator } from "@/shared/simulation/simulator";
import {
  ElectricalComponent,
  ElectricalComponentID,
  ElectricalComponentWithID,
  Wire,
  Point,
} from "@/shared/simulation/types";
import { updateComponentCoords } from "../lib";

type SimulationState = {
  components: Array<ElectricalComponentWithID>;
  onAddComponent: (newComponent: ElectricalComponent) => ElectricalComponentWithID;
  onUpdateComponent: (component: ElectricalComponentWithID) => void;
  onUpdateComponentCoords: (id: ElectricalComponentID, dx: number, dy: number) => void;
  onDeleteComponent: (id: ElectricalComponentID) => void;
  simulator: SimpleSimulator;
  errors: keyof typeof schemaErrors | undefined;
  isDirty: boolean;
};

export function useSimulationState(components: Array<ElectricalComponentWithID>): SimulationState {
  const [schema, setSchema] = useState(components);
  const isDirty = useIsArrayDirty(schema, components, componentsEqual);
  const simulator = useMemo(() => {
    const schemaCopy = schema.map((it) => ({ ...it }));
    return new SimpleSimulator(schemaCopy);
  }, [schema]);
  const errors = useMemo(() => {
    return simulator.validateSchema();
  }, [simulator]);
  return {
    errors,
    simulator,
    components: schema,
    isDirty,
    onAddComponent: function (newComponent: ElectricalComponent): ElectricalComponentWithID {
      let id = -1;
      setSchema((old) => {
        id = (old.length ? old.map((it) => it.id).sort((a, b) => b - a)[0] : 0) + 1;

        if (newComponent._type === "wire") {
          if (pointsEqual(newComponent.a, newComponent.b)) {
            return old;
          }
          const intermediatePoints: Point[] = findIntermediatePoints(newComponent.a, newComponent.b);

          if (intermediatePoints.length > 0) {
            const segments: Wire[] = [];
            let currentStart = newComponent.a;
            for (const point of intermediatePoints) {
              segments.push({ _type: "wire", a: currentStart, b: point });
              currentStart = point;
            }
            segments.push({ _type: "wire", a: currentStart, b: newComponent.b });

            return [...old, ...segments.map((segment, index) => ({ ...segment, id: id + index }))];
          }
        }
        return [...old, { ...newComponent, id }];
      });

      return { ...newComponent, id };
    },
    onUpdateComponent: function (component: ElectricalComponentWithID): void {
      setSchema((old) => [...old.filter((it) => it.id != component.id), component]);
    },
    onUpdateComponentCoords: function (id: number, dx: number, dy: number): void {
      setSchema((old) => {
        const oldComponent = old.find((it) => it.id == id)!;
        const newComponent = updateComponentCoords(oldComponent, dx, dy);
        return [...old.filter((it) => it.id != id), newComponent];
      });
    },
    onDeleteComponent(id) {
      setSchema((old) => old.filter((it) => it.id != id));
    },
  };
}

function findIntermediatePoints(a: Point, b: Point): Point[] {
  const points: Point[] = [];

  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
  const step = gcd(Math.abs(dx), Math.abs(dy));

  const stepX = dx / step;
  const stepY = dy / step;

  for (let i = 1; i < step; i++) {
    const x = a.x + stepX * i;
    const y = a.y + stepY * i;

    if (Number.isInteger(x) && Number.isInteger(y)) {
      points.push({ x, y });
    }
  }

  return points;
}

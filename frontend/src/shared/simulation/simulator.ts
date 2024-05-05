/* eslint-disable @typescript-eslint/no-unused-vars */
import { CircuitSimulator } from "./interface";
import { ElectricalComponent } from "./types";

export class SimpleSimulator implements CircuitSimulator {
  addComponent(_component: ElectricalComponent): void {}
  deleteComponent(_component: ElectricalComponent): void {}
  getAllComponents(): ElectricalComponent[] {
    return [
      {
        type: "source",
        id: 0,
        a: { x: 0, y: 0 },
        b: { x: -1, y: 0 },
        electromotiveForce: 220,
        internalResistance: 110,
      },
      {
        type: "wire",
        id: 1,
        a: { x: -1, y: 0 },
        b: { x: -1, y: 5 },
      },
      {
        type: "ampermeter",
        id: 2,
        a: { x: -1, y: 5 },
        b: { x: 0, y: 5 },
        currency: "unknown",
      },
      {
        type: "wire",
        id: 3,
        a: { x: 0, y: 5 },
        b: { x: 0, y: 0 },
      },
    ];
  }
  setComponents(_components: ElectricalComponent[]): void {}
}

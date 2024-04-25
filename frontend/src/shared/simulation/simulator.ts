import { CircuitSimulator } from "./interface";
import { ElectricalComponent } from "./types";

export class SimpleSimulator implements CircuitSimulator {
  addComponent(_component: ElectricalComponent): void {}
  deleteComponent(_component: ElectricalComponent): void {}
  getAllComponents(): ElectricalComponent[] {
    return [
      {
        _type: "source",
        plus: { x: 0, y: 0 },
        minus: { x: -1, y: 0 },
        electromotiveForce: 220,
        internalResistance: 110,
      },
      {
        _type: "wire",
        a: { x: -1, y: 0 },
        b: { x: -1, y: 5 },
      },
      {
        _type: "ampermeter",
        a: { x: -1, y: 5 },
        b: { x: 0, y: 5 },
        currency: "unknown",
      },
      {
        _type: "wire",
        a: { x: 0, y: 5 },
        b: { x: 0, y: 0 },
      },
    ];
  }
  setComponents(_components: ElectricalComponent[]): void {}
}

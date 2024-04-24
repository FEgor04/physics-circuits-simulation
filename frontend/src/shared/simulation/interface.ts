import { ElectricalComponent } from "./types.ts"

export interface CircuitSimulator {
  addComponent(component: ElectricalComponent): void
  deleteComponent(component: ElectricalComponent): void
}

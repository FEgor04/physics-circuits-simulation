import { CircuitSimulator } from "./interface";
import { ElectricalComponent } from "./types";

export class SimpleSimulator implements CircuitSimulator {
    addComponent(_component: ElectricalComponent): void {
    }
    deleteComponent(_component: ElectricalComponent): void {
    }
    getAllComponents(): ElectricalComponent[] {
        throw new Error("Method not implemented.");
    }
    setComponents(_components: ElectricalComponent[]): void {
    }
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { CircuitSimulator } from "./interface";
import { getComponentContacts, pointsEqual } from "./lib";
import { Branch, ElectricalComponent, Node, Point } from "./types";

export class SimpleSimulator implements CircuitSimulator {
  components: ElectricalComponent[];
  // global state, нужен чтобы избежать ада проброски нод в функции
  private nodes: Node[];

  constructor(_component: ElectricalComponent[]) {
    this.components = _component;
    this.nodes = [];
  }

  addComponent(_component: ElectricalComponent) {
    this.components.push(_component);
  }

  deleteComponent(_component: ElectricalComponent): void {}

  getAllComponents(): ElectricalComponent[] {
    return this.components;
  }

  setComponents(_components: ElectricalComponent[]): void {}

  findNodes(): Array<Point> {
    const nodes: Array<Point> = [];
    const nodeMap: Record<string, { count: number; loc: Point }> = {};

    // Проходимся по всем компонентам и считаем, сколько раз каждая точка встречается
    this.components.forEach((component) => {
      const points: Point[] = getComponentContacts(component);

      points.forEach((point) => {
        const key = `${point.x},${point.y}`;
        if (!nodeMap[key]) {
          nodeMap[key] = { count: 1, loc: point };
        } else {
          nodeMap[key].count++;
        }
      });
    });
    // Фильтруем точки, встречающиеся три раза (узлы)

    for (const key in nodeMap) {
      if (nodeMap[key].count >= 3) {
        nodes.push(nodeMap[key].loc);
      }
    }
    return nodes;
  }

  findBranches(): Array<Branch> {
    const nodes = this.findNodes();
    return [];
  }

  private findComponentsAtPoint(point: Point): Array<ElectricalComponent> {
    return this.components.filter(
      (component) => getComponentContacts(component).find((contact) => pointsEqual(contact, point)) !== undefined,
    );
  }

  findBranchesStartingInPoint(root: Point, startingNode: Point): Array<Branch> {
    return [];
  }
}

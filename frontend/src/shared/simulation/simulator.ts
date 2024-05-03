/* eslint-disable @typescript-eslint/no-unused-vars */
import { CircuitSimulator } from "./interface";
import { branchFactory, branchesEqual, getComponentContacts, pointsEqual } from "./lib";
import { Branch, ElectricalComponent, Point } from "./types";

export class SimpleSimulator implements CircuitSimulator {
  components: ElectricalComponent[];
  // global state, нужен чтобы избежать ада проброски нод в функции
  private nodes: Array<Point>;

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

  private was = new Set<string>();

  findBranches(): Array<Branch> {
    this.nodes = this.findNodes();
    const nodes = this.findNodes();
    const branches = nodes.flatMap((node) => {
      this.was.clear();
      this.was.add(`${node.x}-${node.y}`);
      return this.findBranchesStartingInPoint(node, node, []);
    });
    return this.deduplicateBranches(branches);
  }

  private deduplicateBranches(branches: ReadonlyArray<Branch>): Array<Branch> {
    const deduplicated: Array<Branch> = [];
    branches.forEach((it) => {
      if (deduplicated.find((deduplicatedBranch) => branchesEqual(it, deduplicatedBranch)) === undefined) {
        deduplicated.push(it);
      }
    });
    return deduplicated;
  }

  private findComponentsAtPoint(point: Point): Array<ElectricalComponent> {
    return this.components.filter(
      (component) => getComponentContacts(component).find((contact) => pointsEqual(contact, point)) !== undefined,
    );
  }

  private pointIsNode(point: Point) {
    const result = this.nodes.find((it) => pointsEqual(it, point)) !== undefined;
    return result;
  }

  private pointsIsAlreadyVisited(point: Point) {
    return this.was.has(`${point.x}-${point.y}`);
  }

  findBranchesStartingInPoint(
    root: Point,
    startingNode: Point,
    componentsOnWay: Array<ElectricalComponent>,
  ): Array<Branch> {
    if (!pointsEqual(root, startingNode) && this.pointIsNode(root)) {
      return [branchFactory(startingNode, root, componentsOnWay)];
    }

    const components = this.findComponentsAtPoint(root);
    const branches = components.flatMap((component) => {
      const nextPoints = getComponentContacts(component).filter(
        (it) => !this.pointsIsAlreadyVisited(it) || (this.pointIsNode(it) && !pointsEqual(it, startingNode)),
      );
      return nextPoints.flatMap((nextPoint) => {
        this.was.add(`${nextPoint.x}-${nextPoint.y}`);
        return this.findBranchesStartingInPoint(nextPoint, startingNode, [...componentsOnWay, component]);
      });
    });
    return branches;
  }
}

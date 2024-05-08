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

  private sumResistanceOfBranch(branch: Branch): number {
    if (branch === null) {
      return 0;
    }
    let totalResistance = 0;

    for (const component of branch.components) {
      if (component._type === "resistor") {
        totalResistance += component.resistance;
      }
      if (component._type === "sourceDC") {
        return 0;
      }
    }

    return totalResistance;
  }
  private pointsEqual(a: Point, b: Point): boolean {
    return a.x == b.x && a.y == b.y;
  }
  private sumResistanceOfNode(node: Point, branches: Branch[]): number {
    let totalResistance = 0;

    for (const branch of branches) {
      if (this.pointsEqual(branch.a, node) || this.pointsEqual(branch.b, node)) {
        const resist = this.sumResistanceOfBranch(branch);
        if (resist != 0) {
          totalResistance += 1 / resist;
        }
      }
    }

    return totalResistance;
  }

  private findResistansBetweenNodes(node1: Point, node2: Point, branches: Branch[]): number {
    let totalResistance = 0;

    for (const branch of branches) {
      if (
        (branch.a.x === node1.x && branch.a.y === node1.y && branch.b.x === node2.x && branch.b.y === node2.y) ||
        (branch.b.x === node1.x && branch.b.y === node1.y && branch.a.x === node2.x && branch.a.y === node2.y)
      ) {
        const currResist = this.sumResistanceOfBranch(branch);
        if (currResist != 0) {
          totalResistance += 1 / this.sumResistanceOfBranch(branch);
        }
      }
    }

    return -totalResistance;
  }

  public buildGMatrix(nodes: Array<Point>, branches: Branch[]): number[][] {
    const gMatrix: number[][] = [];
    let line: number[] = [];
    for (let i = 0; i < nodes.length - 1; i++) {
      line = [];
      for (let j = 0; j < nodes.length - 1; j++) {
        if (i == j) {
          line.push(this.sumResistanceOfNode(nodes[i], branches));
        } else {
          line.push(this.findResistansBetweenNodes(nodes[i], nodes[j], branches));
        }
      }
      gMatrix.push(line);
    }
    return gMatrix;
  }
}

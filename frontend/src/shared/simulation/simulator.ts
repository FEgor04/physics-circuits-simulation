/* eslint-disable @typescript-eslint/no-unused-vars */

import { CircuitSimulator } from "./interface";
import { branchFactory, branchesEqual, deduplicateArray, getComponentContacts, pointsEqual } from "./lib";
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
    return deduplicateArray(branches, branchesEqual);
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
        const resistance = this.sumResistanceOfBranch(branch);
        if (resistance != 0) {
          totalResistance += 1 / resistance;
        }
      }
    }

    return totalResistance;
  }

  private findResistanceBetweenNodes(node1: Point, node2: Point, branches: Branch[]): number {
    let totalResistance = 0;

    for (const branch of branches) {
      if (
        (pointsEqual(branch.a, node1) && pointsEqual(branch.b, node2)) ||
        (pointsEqual(branch.b, node1) && pointsEqual(branch.a, node2))
      ) {
        const currentResistance = this.sumResistanceOfBranch(branch);
        if (currentResistance != 0) {
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
          line.push(this.findResistanceBetweenNodes(nodes[i], nodes[j], branches));
        }
      }
      gMatrix.push(line);
    }
    return gMatrix;
  }

  /**
     a->b 1
     b->a -1
     */
  private defineDirection(branch: Branch): number {
    const commonDirect = 0;
    let tempA: Point = { x: branch.a.x, y: branch.a.y };

    for (const component of branch.components) {
      if (component._type === "source" || component._type === "sourceDC") {
        if (pointsEqual(component.plus, tempA)) {
          return 1;
        } else {
          return -1;
        }
      } else {
        tempA = component.b;
      }
    }
    return commonDirect;
  }

  private sumResistanceOfBranchForCurrentForse(branch: Branch): number {
    let totalResistance = 0;

    for (const component of branch.components) {
      if (component._type === "resistor") {
        totalResistance += component.resistance;
      }
    }

    return totalResistance;
  }

  private findVoltageOfBranch(branch: Branch): number {
    let voltage = 0;

    for (const component of branch.components) {
      if (component._type === "source" || component._type === "sourceDC") {
        voltage = component.electromotiveForce;
      }
    }

    return voltage;
  }

  public findCurrentForce(nodes: Array<Point>, branches: Branch[]): number[] {
    const branchesDirection: number[] = [];
    const nodesCurrent: number[] = [];
    let nodeCurrent: number = 0;
    for (const branch of branches) {
      branchesDirection.push(this.defineDirection(branch));
    }
    for (let i = 0; i < nodes.length - 1; i++) {
      const tempNode: Point = nodes[i];
      nodeCurrent = 0;
      for (let j = 0; j < branches.length; j++) {
        const tempBranch = branches[j];
        if (branchesDirection[j] != 0) {
          const resistance = this.sumResistanceOfBranchForCurrentForse(tempBranch);
          const voltage = this.findVoltageOfBranch(tempBranch);

          if (branchesDirection[j] == 1) {
            if (pointsEqual(tempNode, tempBranch.a)) {
              nodeCurrent += -voltage / resistance;
            } else if (pointsEqual(tempNode, tempBranch.b)) {
              nodeCurrent += voltage / resistance;
            }
          } else {
            if (pointsEqual(tempNode, tempBranch.a)) {
              nodeCurrent += voltage / resistance;
            } else if (pointsEqual(tempNode, tempBranch.b)) {
              nodeCurrent += -voltage / resistance;
            }
          }
        }
      }
      nodesCurrent.push(nodeCurrent);
    }

    return nodesCurrent;
  }

  public solveSLAE(coefficients: number[][], values: number[]): number[] {
    const n = coefficients.length;
    const augmentedMatrix = coefficients.map((row, index) => [...row, values[index]]);

    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const factor = augmentedMatrix[j][i] / augmentedMatrix[i][i];
        for (let k = i; k < n + 1; k++) {
          augmentedMatrix[j][k] -= augmentedMatrix[i][k] * factor;
        }
      }
    }

    const solution: number[] = new Array(n);
    for (let i = n - 1; i >= 0; i--) {
      solution[i] = augmentedMatrix[i][n] / augmentedMatrix[i][i];
      for (let j = i - 1; j >= 0; j--) {
        augmentedMatrix[j][n] -= augmentedMatrix[j][i] * solution[i];
      }
    }

    return solution;
  }
}

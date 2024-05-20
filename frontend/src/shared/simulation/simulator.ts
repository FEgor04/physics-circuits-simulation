/* eslint-disable @typescript-eslint/no-unused-vars */

import { schemaErrors } from "./errors";
import { CircuitSimulator } from "./interface";
import { branchFactory, branchesEqual, deduplicateArray, getComponentContacts, pointsEqual } from "./lib";
import { Branch, ElectricalComponentID, ElectricalComponentWithID, Point } from "./types";

export class SimpleSimulator implements CircuitSimulator {
  components: ElectricalComponentWithID[];
  // global state, нужен чтобы избежать ада проброски нод в функции
  private nodes: Array<Point>;

  constructor(_component: ElectricalComponentWithID[]) {
    this.components = _component;
    this.nodes = [];
  }

  addComponent(_component: ElectricalComponentWithID) {
    this.components.push(_component);
  }

  deleteComponent(_component: ElectricalComponentWithID): void {}

  getComponentById(id: ElectricalComponentID): ElectricalComponentWithID | undefined {
    for (let i = 0; i < this.components.length; i++) {
      if (this.components[i].id === id) {
        return this.components[i];
      }
    }
  }

  deleteComponentById(id: ElectricalComponentID): void {
    for (let i = 0; i < this.components.length; i++) {
      if (this.components[i].id === id) {
        this.components.splice(i, 1);
        break;
      }
    }
  }

  getNewId(): number {
    let temp_id = 0;
    for (const element of this.components) {
      if (temp_id < element.id) {
        temp_id = element.id;
      }
    }
    temp_id++;
    return temp_id;
  }

  getAllComponents(): ElectricalComponentWithID[] {
    return this.components;
  }

  setComponents(_components: ElectricalComponentWithID[]): void {}

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

  private findComponentsAtPoint(point: Point): Array<ElectricalComponentWithID> {
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
    componentsOnWay: Array<ElectricalComponentWithID>,
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
        if (pointsEqual(tempA, component.a)) {
          tempA = component.b;
        } else if (pointsEqual(tempA, component.b)) tempA = component.a;
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

    solution.push(0); // один из потенциалов принимаем за 0
    return solution;
  }

  public branchCurrent(branches: Branch[], nodes: Array<Point>, tensionList: number[]): number[] {
    const current: number[] = [];

    const branchesDirections = branches.map(this.defineDirection);

    let phiM;
    let phiN;
    let E;
    let R;
    for (let i = 0; i < branches.length; i++) {
      let mIndex = 0;
      let nIndex = 0;
      const m = nodes.findIndex((_, index) => {
        return pointsEqual(branches[i].a, nodes[index]) || pointsEqual(branches[i].b, nodes[index]);
      });

      const n = nodes.findIndex((_, index) => {
        return index > m && (pointsEqual(branches[i].a, nodes[index]) || pointsEqual(branches[i].b, nodes[index]));
      });

      if (branchesDirections[i] === -1) {
        mIndex = n;
        nIndex = m;
      } else {
        mIndex = m;
        nIndex = n;
      }
      phiM = tensionList[mIndex];
      phiN = tensionList[nIndex];
      E = this.findVoltageOfBranch(branches[i]);
      R = this.sumResistanceOfBranch(branches[i]);
      current.push(Math.abs(phiM - phiN + E) / R);
    }
    return current;
  }

  public isBranchFree(branch: Branch): boolean {
    let f = true;
    for (const element of branch.components) {
      if (element._type != "wire") {
        f = false;
        break;
      }
    }
    return f;
  }

  public rebuildShema(branches: Branch[]): ElectricalComponentWithID[] {
    const shema: ElectricalComponentWithID[] = [];
    const deletedNodesA: Point[] = [];
    const deletedNodesB: Point[] = [];
    const tempBranches = branches.slice();

    for (let i = 0; i < tempBranches.length; i++) {
      if (this.isBranchFree(tempBranches[i])) {
        if (
          (!deletedNodesA.some((node) => node === branches[i].a) &&
            !deletedNodesA.some((node) => node === branches[i].b)) ||
          (!deletedNodesB.some((node) => node === branches[i].a) &&
            !deletedNodesB.some((node) => node === branches[i].b))
        ) {
          deletedNodesA.push(branches[i].a);
          deletedNodesB.push(branches[i].b);
        }
      }
    }
    // a <- b
    for (let i = 0; i < deletedNodesA.length; i++) {
      for (let j = 0; j < tempBranches.length; j++) {
        if (pointsEqual(deletedNodesB[i], tempBranches[j].a)) {
          tempBranches[j].a = deletedNodesA[i];
        } else if (pointsEqual(deletedNodesB[i], tempBranches[j].b)) {
          tempBranches[j].b = deletedNodesA[i];
        }
      }
    }

    for (let i = 0; i < tempBranches.length; i++) {
      const k = tempBranches[i].components.length;
      const startOfBranch = tempBranches[i].components[0];
      const seconsElementOfBranch = tempBranches[i].components[1];
      if (startOfBranch._type != "source" && startOfBranch._type != "sourceDC") {
        if (!pointsEqual(startOfBranch.a, tempBranches[i].a)) {
          startOfBranch.a = tempBranches[i].a;
        }
      } else {
        if (seconsElementOfBranch._type != "source" && seconsElementOfBranch._type != "sourceDC") {
          if (pointsEqual(startOfBranch.plus, seconsElementOfBranch.a)) {
            shema.push({ _type: "wire", a: tempBranches[i].a, b: startOfBranch.minus, id: this.getNewId() });
          } else {
            shema.push({ _type: "wire", a: tempBranches[i].a, b: startOfBranch.plus, id: this.getNewId() });
          }
        }
      }
      const endOfBranch = tempBranches[i].components[k - 1];
      const preLastElementOfBranch = tempBranches[i].components[k - 2];
      if (endOfBranch._type != "source" && endOfBranch._type != "sourceDC") {
        if (!pointsEqual(endOfBranch.b, tempBranches[i].b)) {
          endOfBranch.b = tempBranches[i].b;
        }
      } else {
        if (preLastElementOfBranch._type != "source" && preLastElementOfBranch._type != "sourceDC") {
          if (pointsEqual(endOfBranch.plus, preLastElementOfBranch.b)) {
            shema.push({
              _type: "wire",
              a: endOfBranch.minus,
              b: tempBranches[i].b,
              id: this.getNewId(),
            });
          } else {
            shema.push({
              _type: "wire",
              a: endOfBranch.plus,
              b: tempBranches[i].b,
              id: this.getNewId(),
            });
          }
        }
      }
    }
    for (let i = 0; i < tempBranches.length; i++) {
      if (!pointsEqual(tempBranches[i].a, tempBranches[i].b)) {
        for (const element of tempBranches[i].components) {
          shema.push(element);
        }
      }
    }

    return shema;
  }

  public getBranchCurrentForAmpermetr(id: number, branches: Branch[], currents: number[]): number {
    let currentForAmper: number = 0;
    const branchWithGivenComponent = branches.find(
      (branch) => branch.components.find((element) => id == element.id) !== undefined,
    );
    for (let i = 0; i < branches.length; i++) {
      if (branches[i] == branchWithGivenComponent) {
        currentForAmper = currents[i];
        break;
      }
    }
    return currentForAmper;
  }


  public getVoltageForVoltmetr(id: number, branches: Branch[], nodes: Array<Point>, tensionList: number[]): number {
    let voltage: number = 0;
    const branchWithGivenComponent: Branch | undefined = branches.find(
      (branch) => branch.components.find((element) => id == element.id) !== undefined,
    );
    if (branchWithGivenComponent !== undefined) {
      const m = nodes.findIndex((_, index) => {
        return (
          pointsEqual(branchWithGivenComponent.a, nodes[index]) || pointsEqual(branchWithGivenComponent.b, nodes[index])
        );
      });

      const n = nodes.findIndex((_, index) => {
        return (
          index > m &&
          (pointsEqual(branchWithGivenComponent.a, nodes[index]) ||
            pointsEqual(branchWithGivenComponent.b, nodes[index]))
        );
      });

      const phiM = tensionList[m];
      const phiN = tensionList[n];
      voltage = Math.abs(phiM - phiN);
    }
    return voltage;
  }

  public getMeasurementsForComponent(id: ElectricalComponentID): { currency: number; voltage: number } {
    let currency = 0;
    let voltage = 0;
    const nodes = this.findNodes();
    const branches = this.findBranches();
    const gMatrix = this.buildGMatrix(nodes, branches);
    const currentList = this.findCurrentForce(nodes, branches);
    const tensionList = this.solveSLAE(gMatrix, currentList);
    const branchCurrent = this.branchCurrent(branches, nodes, tensionList);
    const element = this.getComponentById(id);
    if (element === undefined) {
      throw new Error("Element is undefined");
    }
    if (element._type == "ampermeter") {
      currency = this.getBranchCurrentForAmpermetr(id, branches, branchCurrent);
      return { currency: currency, voltage: voltage };
    } else if (element._type == "voltmeter") {
      voltage = this.getVoltageForVoltmetr(id, branches, nodes, tensionList);
      return { currency: currency, voltage: voltage };
    } else {
      throw new Error("Element not ampermetr or voltmetr");
    }

  validateSchema(): keyof typeof schemaErrors | undefined {
    const adjacencyList: Map<string, Set<string>> = new Map();

    // Helper function to add edge to the graph
    const addEdge = (a: Point, b: Point) => {
      const aKey = `${a.x},${a.y}`;
      const bKey = `${b.x},${b.y}`;
      if (!adjacencyList.has(aKey)) {
        adjacencyList.set(aKey, new Set());
      }
      if (!adjacencyList.has(bKey)) {
        adjacencyList.set(bKey, new Set());
      }
      adjacencyList.get(aKey)?.add(bKey);
      adjacencyList.get(bKey)?.add(aKey);
    };

    // Build the adjacency list from the components
    for (const component of this.components) {
      if (
        component._type === "wire" ||
        component._type === "resistor" ||
        component._type === "voltmeter" ||
        component._type === "ampermeter"
      ) {
        addEdge(component.a, component.b);
      } else if (component._type === "source" || component._type === "sourceDC") {
        addEdge(component.plus, component.minus);
      }
    }

    // Helper function for DFS to check connectivity
    const dfs = (node: string, visited: Set<string>) => {
      visited.add(node);
      const neighbors = adjacencyList.get(node) || new Set();
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          dfs(neighbor, visited);
        }
      }
    };

    const allNodes = Array.from(adjacencyList.keys());
    if (allNodes.length === 0) {
      return "noClosedLoop";
    }

    const visited: Set<string> = new Set();
    dfs(allNodes[0], visited);

    // Check if all nodes are visited (graph is connected)
    if (visited.size !== allNodes.length) {
      return "noClosedLoop";
    }

    // Check if all nodes have a degree > 1
    for (const node of adjacencyList.keys()) {
      if ((adjacencyList.get(node)?.size || 0) <= 1) {
        return "noClosedLoop";
      }
    }

    return undefined;

  }
}

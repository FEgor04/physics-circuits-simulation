import {
  Point,
  Wire,
  Resistor,
  Source,
  Voltmeter,
  ElectricalComponent,
} from "./types";

class GraphNode {
  id: string;
  component: ElectricalComponent;
  neighbors: GraphNode[];

  constructor(id: string, component: ElectricalComponent) {
    this.id = id;
    this.component = component;
    this.neighbors = [];
  }

  addNeighbor(node: GraphNode) {
    this.neighbors.push(node);
  }
}

class ElectricalGraph {
  nodes: GraphNode[];

  constructor(components: ElectricalComponent[]) {
    this.nodes = [];
    this.buildGraph(components);
  }

  private buildGraph(components: ElectricalComponent[]) {
    const nodeMap: Map<string, GraphNode> = new Map();

    components.forEach((component, index) => {
      const nodeId = `node${index}`;
      const node = new GraphNode(nodeId, component);
      this.nodes.push(node);
      nodeMap.set(nodeId, node);
    });

    this.nodes.forEach((node) => {
      if ("a" in node.component && "b" in node.component) {
        const neighborA = this.findNodeByPoint(nodeMap, node.component.a);
        const neighborB = this.findNodeByPoint(nodeMap, node.component.b);
        if (neighborA) {
          node.addNeighbor(neighborA);
        }
        if (neighborB) {
          node.addNeighbor(neighborB);
        }
      }
    });
  }

  private findNodeByPoint(
    nodeMap: Map<string, GraphNode>,
    point: Point,
  ): GraphNode | undefined {
    for (const [_, node] of nodeMap.entries()) {
      if ("a" in node.component && "b" in node.component) {
        if (
          (node.component.a.x === point.x && node.component.a.y === point.y) ||
          (node.component.b.x === point.x && node.component.b.y === point.y)
        ) {
          return node;
        }
      }
    }
    return undefined;
  }
}

// Пример использования
const wire1: Wire = { _type: "wire", a: { x: 0, y: 0 }, b: { x: 0, y: 1 } };
const wire2: Wire = { _type: "wire", a: { x: 0, y: 1 }, b: { x: 1, y: 1 } };
const resistor: Resistor = {
  _type: "resistor",
  a: { x: 1, y: 1 },
  b: { x: 2, y: 1 },
  resistance: 100,
};
const source: Source = {
  _type: "source",
  plus: { x: 2, y: 1 },
  minus: { x: 2, y: 0 },
  electromotiveForce: 10,
  internalResistance: 5,
};
const voltmeter: Voltmeter = {
  _type: "voltmeter",
  a: { x: 2, y: 1 },
  b: { x: 3, y: 1 },
  voltage: "unknown",
};
const components: ElectricalComponent[] = [
  wire1,
  wire2,
  resistor,
  source,
  voltmeter,
];

const electricalGraph = new ElectricalGraph(components);
console.log(electricalGraph.nodes);

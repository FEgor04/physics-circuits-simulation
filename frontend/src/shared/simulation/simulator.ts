/* eslint-disable @typescript-eslint/no-unused-vars */
import { CircuitSimulator } from "./interface";
import { ElectricalComponent, Node, Point } from "./types";

export class SimpleSimulator implements CircuitSimulator {

  components: ElectricalComponent[];
   nodes:Node[];
  // constructor() {
  //   this.components = [];
  //   this.nodes =[];
  // }
  constructor(_component: ElectricalComponent[]) {
    this.components = _component;
    this.nodes =[];
  }

  addComponent(_component: ElectricalComponent) {
    this.components.push(_component);
  }

  deleteComponent(_component: ElectricalComponent): void {
  }

  getAllComponents(): ElectricalComponent[] {
    return [
      {
        _type: "source",
        plus: { x: 0, y: 0 },
        minus: { x: -1, y: 0 },
        electromotiveForce: 220,
        internalResistance: 110
      },
      {
        _type: "wire",
        a: { x: -1, y: 0 },
        b: { x: -1, y: 5 }
      },
      {
        _type: "ampermeter",
        a: { x: -1, y: 5 },
        b: { x: 0, y: 5 },
        currency: "unknown"
      },
      {
        _type: "wire",
        a: { x: 0, y: 5 },
        b: { x: 0, y: 0 }
      }
    ];
  }

  setComponents(_components: ElectricalComponent[]): void {
  }


  printComp():void{console.log(this.components)}
  printNodes():void{console.log(this.nodes)}

  findNodes(): void {
    const nodeMap: { [key: string]: { count: number; loc: Point } } = {};

    // Проходимся по всем компонентам и считаем, сколько раз каждая точка встречается
    this.components.forEach(component => {
      const points: Point[] = [];
      if (component._type === "wire" || component._type === "resistor" || component._type === "voltmeter" || component._type === "ampermeter") {
        points.push(component.a, component.b);
      } else if (component._type === "source") {
        points.push(component.plus, component.minus);
      }

      points.forEach(point => {
        const key = `${point.x},${point.y}`;
        if (!nodeMap[key]) {
          nodeMap[key] = { count: 1, loc: point };
        } else {
          nodeMap[key].count++;
        }
      });
    });
    let id =0;
    // Фильтруем точки, встречающиеся три раза (узлы)

    for (const key in nodeMap) {
      if (nodeMap[key].count >= 3) {
        this.nodes.push({ _type: "node", id: id++, loc: nodeMap[key].loc });
      }
    }


  }


}

const components: ElectricalComponent[] = [
  { _type: "wire", a: { x: 0, y: 0 }, b: { x: 1, y: 0 } },
  { _type: "wire", a: { x: 1, y: 0 }, b: { x: 1, y: 1 } },
  { _type: "wire", a: { x: 1, y: 1 }, b: { x: 0, y: 1 } },
  { _type: "wire", a: { x: 0, y: 1 }, b: { x: 0, y: 0 } },
  { _type: "resistor", a: { x: 1, y: 1 }, b: { x: 2, y: 1 }, resistance: 10 },
  { _type: "source", plus: { x: 2, y: 1 }, minus: { x: 2, y: 2 }, electromotiveForce: 5, internalResistance: 2 },
  { _type: "voltmeter", a: { x: 2, y: 2 }, b: { x: 1, y: 2 }, voltage: "unknown" },
  { _type: "ampermeter", a: { x: 1, y: 2 }, b: { x: 1, y: 1 }, currency: 3 },
];

const simpleSimulator = new SimpleSimulator(components);
simpleSimulator.findNodes();
simpleSimulator.printComp();
simpleSimulator.printNodes();
console.log("Nodes:", simpleSimulator.nodes);
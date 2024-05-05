/**
 * Точка на сетке
 **/
export type Point = {
  x: number;
  y: number;
};
/**
 * Тип для узла
 */
export type Node = {
  _type: "node";
  loc: Point;
};

export type SelectedPoint = {
  type: "point";
  point: Point;
};

export type Branch = {
  id: number;
  a: Point;
  b: Point;
  components: ElectricalComponent[];
};

/**
 * Провод, соединяющий между собой две точки на стеке
 **/
export type Wire = {
  type: "wire";
  id: number;
  a: Point;
  b: Point;
};

/**
 * Резистор между точками `a` и `b` с внутренним сопротивлением `resistance`
 **/
export type Resistor = Omit<Wire, "type"> & {
  type: "resistor";
  resistance: number;
};

export type Source = Omit<Wire, "type"> & {
  type: "source";
  electromotiveForce: number;
  internalResistance: number;
};

export type Voltmeter = Omit<Wire, "type"> & {
  type: "voltmeter";
  voltage: number | "unknown";
};

export type Ampermeter = Omit<Wire, "type"> & {
  type: "ampermeter";
  currency: number | "unknown";
};

export type ElectricalComponent = Wire | Resistor | Source | Voltmeter | Ampermeter;

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
  _type: "wire";
  a: Point;
  b: Point;
};

export type WithID<T> = T & { id: ElectricalComponentID };

/**
 * Резистор между точками `a` и `b` с внутренним сопротивлением `resistance`
 **/
export type Resistor = Omit<Wire, "_type"> & {
  _type: "resistor";
  resistance: number;
};

export type Source = {
  _type: "source";
  plus: Point;
  minus: Point;
  electromotiveForce: number;
  internalResistance: number;
};

export type Voltmeter = Omit<Wire, "_type"> & {
  _type: "voltmeter";
  voltage: number | "unknown";
};

export type Ampermeter = Omit<Wire, "_type"> & {
  _type: "ampermeter";
  currency: number | "unknown";
};

export type ElectricalComponent = Wire | Resistor | Source | Voltmeter | Ampermeter;

export type ElectricalComponentID = number;

export type ElectricalComponentWithID = ElectricalComponent & { id: ElectricalComponentID };

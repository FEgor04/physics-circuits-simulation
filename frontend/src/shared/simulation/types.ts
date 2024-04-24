/**
 * Точка на сетке
 **/
type Point = {
  x: number
  y: number
}

/**
 * Провод, соединяющий между собой две точки на стеке
 **/
export type Wire = {
  a: Point,
  b: Point
}

/**
 * Резистор между точками `a` и `b` с внутренним сопротивлением `resistance`
 **/
export type Resistor = Wire & {
  resistance: number
}

export type Source = {
  plus: Point,
  minus: Point
  electromotiveForce: number,
  internalResistance: number,
}

export type Voltmeter = Wire & {
  voltage: number
}

export type Ampermeter = Wire & {
  currency: number
}

export type ElectricalComponent = Wire | Resistor | Source | Voltmeter | Ampermeter

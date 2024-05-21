import z from "zod";

const componentBase = z.object({
  id: z.number(),
});

const zPoint = z.object({
  x: z.number(),
  y: z.number(),
});

export const zWire = componentBase.extend({
  _type: z.literal("wire"),
  a: zPoint,
  b: zPoint,
});

export const zResistor = zWire.extend({
  _type: z.literal("resistor"),
  resistance: z.number(),
});

export const zSourceDC = componentBase.extend({
  _type: z.literal("source"),
  electromotiveForce: z.number(),
  internalResistance: z.number(),
  plus: zPoint,
  minus: zPoint,
});

export const zSource = zSourceDC.extend({
  _type: z.literal("sourceDC"),
});

export const zAmpermeter = zWire.extend({
  _type: z.literal("ampermeter"),
});

export const zVoltmeter = zWire.extend({
  _type: z.literal("voltmeter"),
});

export const zElectricalComponent = z.discriminatedUnion("_type", [
  zWire,
  zResistor,
  zSource,
  zSourceDC,
  zAmpermeter,
  zVoltmeter,
]);

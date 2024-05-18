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

export const zSource = componentBase.extend({
  _type: z.literal("source"),
  electromotiveForce: z.number(),
  plus: zPoint,
  minus: zPoint,
});

export const zSourceDC = zSource.extend({
  _type: z.literal("source_dc"),
  internalResistance: z.number(),
});

export const zAmpermeter = zWire.extend({
  _type: z.literal("ampermeter"),
});

export const zVoltmeter = zWire.extend({
  _type: z.literal("ampermeter"),
});

export const zElectricalComponent = z.discriminatedUnion("_type", [
  zWire,
  zResistor,
  zSource,
  zSourceDC,
  zAmpermeter,
  zVoltmeter,
]);

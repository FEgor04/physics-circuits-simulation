import { expect, test } from "vitest";
import { SimpleSimulator } from "../simulator";
import { Ampermeter, ElectricalComponentWithID } from "../types";

test.skip("simple scheme with voltmeter only", () => {
  const u = 220;
  const r = 110;

  const simulator = new SimpleSimulator([]);
  // Источник, у которого плюс расположен в точке (0, 0).
  // Минус -- в точке (-1, 0)
  simulator.addComponent({
    id: 0,
    _type: "source",
    plus: { x: 0, y: 0 },
    minus: { x: -1, y: 0 },
    electromotiveForce: u, // 220 В
    internalResistance: r, // 100 Ом
  });

  simulator.addComponent({
    id: 1,
    _type: "wire",
    a: { x: -1, y: 0 },
    b: { x: -1, y: 5 },
  });
  simulator.addComponent({
    id: 2,
    _type: "ampermeter",
    a: { x: -1, y: 5 },
    b: { x: 0, y: 5 },
    currency: "unknown",
  });
  simulator.addComponent({
    id: 3,
    _type: "wire",
    a: { x: 0, y: 5 },
    b: { x: 0, y: 0 },
  });

  const ampermeter = simulator.getAllComponents().find((it) => it._type == "ampermeter") as Ampermeter;
  expect(ampermeter.currency).toBe(u / r);
});

test("test 1", () => {
  const expectedVoltage = { currency: 0, voltage: 36.36363636363636 };

  const components: ElectricalComponentWithID[] = [
    { _type: "wire", a: { x: 0, y: 0 }, b: { x: 1, y: 0 }, id: 0 },
    {
      _type: "source",
      plus: { x: 1, y: 0 },
      minus: { x: 2, y: 0 },
      electromotiveForce: 40,
      internalResistance: 1,
      id: 1,
    },
    { _type: "wire", a: { x: 2, y: 0 }, b: { x: 3, y: 0 }, id: 2 },
    { _type: "ampermeter", a: { x: 3, y: 0 }, b: { x: 4, y: 0 }, currency: "unknown", id: 3 },
    { _type: "wire", a: { x: 4, y: 0 }, b: { x: 4, y: 2 }, id: 4 },
    { _type: "wire", a: { x: 4, y: 2 }, b: { x: 3, y: 2 }, id: 5 },
    { _type: "resistor", a: { x: 3, y: 2 }, b: { x: 2, y: 2 }, resistance: 5, id: 6 },
    { _type: "wire", a: { x: 2, y: 2 }, b: { x: 1, y: 2 }, id: 7 },
    { _type: "resistor", a: { x: 1, y: 2 }, b: { x: 0, y: 2 }, resistance: 5, id: 8 },
    { _type: "wire", a: { x: 0, y: 2 }, b: { x: 0, y: 0 }, id: 9 },
    { _type: "wire", a: { x: 0, y: 2 }, b: { x: 1, y: 3 }, id: 10 },
    { _type: "voltmeter", a: { x: 1, y: 3 }, b: { x: 2, y: 3 }, id: 11, voltage: "unknown" },
    { _type: "wire", a: { x: 2, y: 3 }, b: { x: 4, y: 2 }, id: 12 },
  ];

  const simulator = new SimpleSimulator(components);

  const voltage = simulator.getMeasurementsForComponent(11);

  expect(voltage).toStrictEqual(expectedVoltage);
});

test("test 2", () => {
  const expectedVoltage = { currency: 0, voltage: 2.816901408450705 };

  const components: ElectricalComponentWithID[] = [
    { _type: "wire", a: { x: 0, y: 0 }, b: { x: 0, y: 5 }, id: 0 },
    {
      _type: "sourceDC",
      plus: { x: 4, y: 0 },
      minus: { x: 3, y: 0 },
      currentForce: 40,
      internalResistance: 1,
      id: 1,
    },
    {
      _type: "source",
      plus: { x: 1, y: 6 },
      minus: { x: 2, y: 6 },
      electromotiveForce: 40,
      internalResistance: 1,
      id: 1,
    },
    { _type: "wire", a: { x: 0, y: 0 }, b: { x: 3, y: 0 }, id: 2 },
    { _type: "wire", a: { x: 4, y: 0 }, b: { x: 7, y: 0 }, id: 4 },
    { _type: "wire", a: { x: 7, y: 0 }, b: { x: 7, y: 5 }, id: 5 },
    { _type: "resistor", a: { x: 3, y: 6 }, b: { x: 4, y: 6 }, resistance: 5, id: 6 },
    { _type: "wire", a: { x: 1, y: 4 }, b: { x: 3, y: 4 }, id: 7 },
    { _type: "wire", a: { x: 4, y: 4 }, b: { x: 6, y: 4 }, id: 7 },
    { _type: "wire", a: { x: 0, y: 5 }, b: { x: 1, y: 5 }, id: 9 },
    { _type: "wire", a: { x: 6, y: 5 }, b: { x: 7, y: 5 }, id: 10 },
    { _type: "wire", a: { x: 1, y: 4 }, b: { x: 1, y: 5 }, id: 9 },
    { _type: "wire", a: { x: 1, y: 5 }, b: { x: 1, y: 6 }, id: 9 },
    { _type: "wire", a: { x: 6, y: 4 }, b: { x: 6, y: 5 }, id: 10 },
    { _type: "wire", a: { x: 6, y: 5 }, b: { x: 6, y: 6 }, id: 10 },
    { _type: "wire", a: { x: 2, y: 6 }, b: { x: 3, y: 6 }, id: 7 },
    { _type: "wire", a: { x: 3, y: 6 }, b: { x: 3, y: 7 }, id: 9 },
    { _type: "wire", a: { x: 4, y: 6 }, b: { x: 4, y: 7 }, id: 9 },
    { _type: "wire", a: { x: 4, y: 6 }, b: { x: 5, y: 6 }, id: 10 },
    { _type: "resistor", a: { x: 5, y: 6 }, b: { x: 6, y: 6 }, resistance: 5, id: 6 },
    { _type: "resistor", a: { x: 3, y: 4 }, b: { x: 4, y: 4 }, resistance: 5, id: 6 },
    { _type: "voltmeter", a: { x: 3, y: 7 }, b: { x: 4, y: 7 }, id: 11, voltage: "unknown" },
    // { _type: "ampermeter", a: { x: 1, y: 6 }, b: { x: 2, y: 6 }, currency: "unknown", id: 3 },
  ];

  const simulator = new SimpleSimulator(components);

  const voltage = simulator.getMeasurementsForComponent(11);

  expect(voltage).toStrictEqual(expectedVoltage);
});

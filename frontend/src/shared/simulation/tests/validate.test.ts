import { expect, test } from "vitest";
import { SimpleSimulator } from "../simulator";
import { ElectricalComponentWithID } from "../types";

test("closed loop", () => {
  const components: ElectricalComponentWithID[] = [
    { id: 0, _type: "wire", a: { x: 0, y: 3 }, b: { x: 0, y: 4 } },
    { id: 1, _type: "resistor", a: { x: 0, y: 4 }, b: { x: 0, y: 5 }, resistance: 10 },
    { id: 2, _type: "wire", a: { x: 0, y: 5 }, b: { x: 0, y: 6 } },
    { id: 3, _type: "wire", a: { x: 0, y: 6 }, b: { x: 2, y: 6 } },
    { id: 4, _type: "resistor", a: { x: 2, y: 6 }, b: { x: 3, y: 6 }, resistance: 10 },
    { id: 5, _type: "wire", a: { x: 3, y: 6 }, b: { x: 5, y: 6 } },
    { id: 6, _type: "wire", a: { x: 5, y: 6 }, b: { x: 5, y: 3 } },
    { id: 7, _type: "wire", a: { x: 0, y: 3 }, b: { x: 2, y: 3 } },
    { id: 8, _type: "resistor", a: { x: 2, y: 3 }, b: { x: 3, y: 3 }, resistance: 10 },
    { id: 9, _type: "wire", a: { x: 3, y: 3 }, b: { x: 5, y: 3 } },
    { id: 10, _type: "wire", a: { x: 0, y: 3 }, b: { x: 0, y: 2 } },
    { id: 11, _type: "resistor", a: { x: 0, y: 2 }, b: { x: 0, y: 1 }, resistance: 10 },
    { id: 12, _type: "wire", a: { x: 0, y: 1 }, b: { x: 0, y: 0 } },
    { id: 13, _type: "wire", a: { x: 0, y: 0 }, b: { x: 3, y: 0 } },
    { id: 14, _type: "wire", a: { x: 0, y: 3 }, b: { x: 1, y: 2 } },
    { id: 15, _type: "resistor", a: { x: 1, y: 2 }, b: { x: 2, y: 1 }, resistance: 10 },
    { id: 16, _type: "wire", a: { x: 2, y: 1 }, b: { x: 3, y: 0 } },
    { id: 17, _type: "wire", a: { x: 3, y: 0 }, b: { x: 5, y: 0 } },
    { id: 18, _type: "wire", a: { x: 5, y: 0 }, b: { x: 5, y: 1 } },
    { id: 19, _type: "resistor", a: { x: 5, y: 1 }, b: { x: 5, y: 2 }, resistance: 10 },
    { id: 20, _type: "wire", a: { x: 5, y: 2 }, b: { x: 5, y: 3 } },
    { id: 21, _type: "wire", a: { x: 3, y: 0 }, b: { x: 3, y: 1 } },
    { id: 22, _type: "resistor", a: { x: 3, y: 1 }, b: { x: 4, y: 2 }, resistance: 10 },
    { id: 23, _type: "wire", a: { x: 4, y: 2 }, b: { x: 5, y: 3 } },
  ];

  const simulation = new SimpleSimulator(components);
  const error = simulation.validateSchema();
  expect(error).toBe(undefined);
});

test("open loop", () => {
  const components: ElectricalComponentWithID[] = [
    { id: 0, _type: "wire", a: { x: 0, y: 3 }, b: { x: 0, y: 4 } },
    { id: 1, _type: "resistor", a: { x: 0, y: 4 }, b: { x: 0, y: 5 }, resistance: 10 },
    { id: 2, _type: "wire", a: { x: 0, y: 5 }, b: { x: 0, y: 6 } },
  ];

  const simulation = new SimpleSimulator(components);
  const error = simulation.validateSchema();
  expect(error).toBe("noNodes");
});

test("closed loop with not connected wire", () => {
  const components: ElectricalComponentWithID[] = [
    { id: 0, _type: "wire", a: { x: 0, y: 0 }, b: { x: 0, y: 1 } },
    { id: 1, _type: "resistor", a: { x: 0, y: 1 }, b: { x: 1, y: 1 }, resistance: 10 },
    { id: 2, _type: "wire", a: { x: 1, y: 1 }, b: { x: 1, y: 0 } },
    { id: 2, _type: "wire", a: { x: 1, y: 0 }, b: { x: 0, y: 0 } },
    { id: 2, _type: "wire", a: { x: 0, y: 1 }, b: { x: 0, y: 2 } },
  ];

  const simulation = new SimpleSimulator(components);
  const error = simulation.validateSchema();
  expect(error).toBe("noClosedLoop");
});

test("open loop with other components", () => {
  const components: ElectricalComponentWithID[] = [
    { id: 0, _type: "wire", a: { x: 0, y: 0 }, b: { x: 1, y: 0 } },
    { id: 1, _type: "resistor", a: { x: 1, y: 0 }, b: { x: 1, y: 1 }, resistance: 10 },
    { id: 2, _type: "wire", a: { x: 1, y: 1 }, b: { x: 0, y: 1 } },
    { id: 3, _type: "voltmeter", a: { x: 0, y: 1 }, b: { x: 0, y: 0 }, voltage: 5 },
    {
      id: 4,
      _type: "source",
      plus: { x: 1, y: 1 },
      minus: { x: 2, y: 1 },
      electromotiveForce: 10,
      internalResistance: 1,
    },
  ];

  const simulation = new SimpleSimulator(components);
  const error = simulation.validateSchema();
  expect(error).toBe("noClosedLoop");
});

test("empty scheme", () => {
  const components: ElectricalComponentWithID[] = [];

  const simulation = new SimpleSimulator(components);
  const error = simulation.validateSchema();
  expect(error).toBe("emptyScheme");
});

test("closed loop big scheme", () => {
  const components: ElectricalComponentWithID[] = [
    { _type: "wire", a: { x: 0, y: 0 }, b: { x: 0, y: 1 }, id: 0 },
    { _type: "wire", a: { x: 0, y: 2 }, b: { x: 0, y: 3 }, id: 1 },
    { _type: "wire", a: { x: 0, y: 4 }, b: { x: 0, y: 5 }, id: 2 },
    { _type: "wire", a: { x: 0, y: 5 }, b: { x: 4, y: 5 }, id: 3 },
    { _type: "wire", a: { x: 5, y: 5 }, b: { x: 8, y: 5 }, id: 4 },
    { _type: "wire", a: { x: 8, y: 4 }, b: { x: 8, y: 5 }, id: 5 },
    { _type: "wire", a: { x: 8, y: 2 }, b: { x: 8, y: 3 }, id: 6 },
    { _type: "wire", a: { x: 8, y: 0 }, b: { x: 8, y: 1 }, id: 7 },
    { _type: "wire", a: { x: 6, y: 0 }, b: { x: 8, y: 0 }, id: 8 },
    { _type: "wire", a: { x: 4, y: 0 }, b: { x: 5, y: 0 }, id: 9 },
    { _type: "wire", a: { x: 4, y: 0 }, b: { x: 0, y: 0 }, id: 10 },
    { _type: "wire", a: { x: 4, y: 0 }, b: { x: 2, y: 2 }, id: 11 },
    { _type: "wire", a: { x: 2, y: 3 }, b: { x: 0, y: 5 }, id: 12 },
    { _type: "wire", a: { x: 4, y: 0 }, b: { x: 5, y: 1 }, id: 13 },
    { _type: "wire", a: { x: 6, y: 2 }, b: { x: 7, y: 3 }, id: 14 },
    { _type: "wire", a: { x: 7, y: 4 }, b: { x: 8, y: 5 }, id: 15 },
    { _type: "resistor", a: { x: 4, y: 5 }, b: { x: 5, y: 5 }, resistance: 5, id: 16 },
    { _type: "resistor", a: { x: 2, y: 2 }, b: { x: 2, y: 3 }, resistance: 10, id: 17 },
    { _type: "resistor", a: { x: 0, y: 1 }, b: { x: 0, y: 2 }, resistance: 10, id: 18 },
    { _type: "resistor", a: { x: 5, y: 0 }, b: { x: 6, y: 0 }, resistance: 3, id: 19 },
    { _type: "resistor", a: { x: 7, y: 3 }, b: { x: 7, y: 4 }, resistance: 40, id: 20 },
    { _type: "resistor", a: { x: 8, y: 3 }, b: { x: 8, y: 4 }, resistance: 7, id: 21 },
    {
      _type: "sourceDC",
      plus: { x: 5, y: 1 },
      minus: { x: 6, y: 2 },
      internalResistance: 5,
      currentForce: 1,
      id: 22,
    },
    {
      _type: "source",
      plus: { x: 0, y: 4 },
      minus: { x: 0, y: 3 },
      electromotiveForce: 40,
      internalResistance: 1,
      id: 23,
    },
    {
      _type: "source",
      plus: { x: 8, y: 1 },
      minus: { x: 8, y: 2 },
      electromotiveForce: 10,
      internalResistance: 1,
      id: 24,
    },
  ];

  const simulation = new SimpleSimulator(components);
  const error = simulation.validateSchema();
  expect(error).toBe(undefined);
});

test("closed loop scheme with 2 circuit and ideal wire", () => {
  const components: ElectricalComponentWithID[] = [
    // Внешний контур
    { id: 0, _type: "wire", a: { x: 0, y: 0 }, b: { x: 10, y: 0 } },
    { id: 1, _type: "wire", a: { x: 10, y: 0 }, b: { x: 10, y: 10 } },
    { id: 2, _type: "wire", a: { x: 10, y: 10 }, b: { x: 0, y: 10 } },
    { id: 3, _type: "wire", a: { x: 0, y: 10 }, b: { x: 0, y: 0 } },

    // Внутренний контур 1
    {
      id: 4,
      _type: "sourceDC",
      plus: { x: 2, y: 2 },
      minus: { x: 8, y: 2 },
      internalResistance: 5,
      currentForce: 1,
    },
    { id: 5, _type: "ampermeter", a: { x: 8, y: 2 }, b: { x: 8, y: 8 }, currency: 5 },
    { id: 6, _type: "wire", a: { x: 8, y: 8 }, b: { x: 2, y: 8 } },
    { id: 7, _type: "wire", a: { x: 2, y: 8 }, b: { x: 2, y: 2 } },

    // Соединения между контурами
    { id: 8, _type: "wire", a: { x: 0, y: 0 }, b: { x: 2, y: 2 } },
    { id: 9, _type: "wire", a: { x: 10, y: 0 }, b: { x: 8, y: 2 } },
    { id: 10, _type: "wire", a: { x: 10, y: 10 }, b: { x: 8, y: 8 } },
    { id: 11, _type: "wire", a: { x: 0, y: 10 }, b: { x: 2, y: 8 } },
  ];

  const simulation = new SimpleSimulator(components);
  const error = simulation.validateSchema();
  expect(error).toBe("idealWire");
});

test("closed loop scheme with voltmeter error", () => {
  const components: ElectricalComponentWithID[] = [
    {
      id: 0,
      _type: "source",
      plus: { x: 0, y: 0 },
      minus: { x: 1, y: 0 },
      internalResistance: 5,
      electromotiveForce: 12,
    },

    { id: 1, _type: "wire", a: { x: 1, y: 0 }, b: { x: 5, y: 0 } },
    { id: 2, _type: "wire", a: { x: 5, y: 0 }, b: { x: 5, y: 2 } },

    { id: 3, _type: "ampermeter", a: { x: 5, y: 2 }, b: { x: 4, y: 2 }, currency: 5 },

    { id: 4, _type: "wire", a: { x: 4, y: 2 }, b: { x: 3, y: 2 } },

    { _type: "resistor", a: { x: 3, y: 2 }, b: { x: 2, y: 2 }, resistance: 7, id: 5 },

    { id: 6, _type: "wire", a: { x: 2, y: 2 }, b: { x: 0, y: 2 } },

    { id: 7, _type: "wire", a: { x: 0, y: 2 }, b: { x: 0, y: 0 } },

    { id: 8, _type: "wire", a: { x: 4, y: 2 }, b: { x: 4, y: 3 } },

    { id: 9, _type: "voltmeter", a: { x: 4, y: 3 }, b: { x: 5, y: 3 }, voltage: 5 },

    { id: 10, _type: "wire", a: { x: 5, y: 3 }, b: { x: 5, y: 2 } },
  ];

  const simulation = new SimpleSimulator(components);
  const error = simulation.validateSchema();
  expect(error).toBe("noCorrectScheme");
});

test("closed loop scheme with undefined", () => {
  const components: ElectricalComponentWithID[] = [
    {
      id: 0,
      _type: "source",
      plus: { x: 0, y: 0 },
      minus: { x: 1, y: 0 },
      internalResistance: 5,
      electromotiveForce: 12,
    },

    { id: 1, _type: "wire", a: { x: 1, y: 0 }, b: { x: 5, y: 0 } },
    { id: 2, _type: "wire", a: { x: 5, y: 0 }, b: { x: 5, y: 2 } },

    { id: 3, _type: "ampermeter", a: { x: 5, y: 2 }, b: { x: 4, y: 2 }, currency: 5 },

    { id: 4, _type: "wire", a: { x: 4, y: 2 }, b: { x: 3, y: 2 } },

    { _type: "resistor", a: { x: 3, y: 2 }, b: { x: 2, y: 2 }, resistance: 7, id: 5 },

    { id: 6, _type: "wire", a: { x: 2, y: 2 }, b: { x: 0, y: 2 } },

    { id: 7, _type: "wire", a: { x: 0, y: 2 }, b: { x: 0, y: 0 } },

    { id: 8, _type: "wire", a: { x: 2, y: 2 }, b: { x: 2, y: 3 } },

    { id: 9, _type: "voltmeter", a: { x: 2, y: 3 }, b: { x: 3, y: 3 }, voltage: 5 },

    { id: 10, _type: "wire", a: { x: 3, y: 3 }, b: { x: 3, y: 2 } },
  ];

  const simulation = new SimpleSimulator(components);

  const error = simulation.validateSchema();
  expect(error).toBe(undefined);
});

test("closed loop without nodes", () => {
  const components: ElectricalComponentWithID[] = [
    { id: 0, _type: "wire", a: { x: 0, y: 0 }, b: { x: 1, y: 0 } },
    { _type: "resistor", a: { x: 1, y: 0 }, b: { x: 2, y: 0 }, resistance: 7, id: 1 },
    { id: 2, _type: "wire", a: { x: 2, y: 0 }, b: { x: 3, y: 0 } },

    { id: 3, _type: "wire", a: { x: 3, y: 0 }, b: { x: 3, y: 1 } },

    { id: 4, _type: "wire", a: { x: 3, y: 1 }, b: { x: 2, y: 1 } },

    { id: 5, _type: "wire", a: { x: 2, y: 1 }, b: { x: 1, y: 1 } },

    { id: 6, _type: "wire", a: { x: 1, y: 1 }, b: { x: 0, y: 1 } },

    { id: 7, _type: "wire", a: { x: 0, y: 1 }, b: { x: 0, y: 0 } },
  ];

  const simulation = new SimpleSimulator(components);

  const error = simulation.validateSchema();
  expect(error).toBe("noNodes");
});

test("closed loop without ideal wire", () => {
  const components: ElectricalComponentWithID[] = [
    { id: 0, _type: "wire", a: { x: 0, y: 0 }, b: { x: 2, y: 0 } },
    { id: 1, _type: "wire", a: { x: 2, y: 0 }, b: { x: 3, y: 0 } },
    {
      id: 2,
      _type: "source",
      plus: { x: 3, y: 0 },
      minus: { x: 4, y: 0 },
      internalResistance: 5,
      electromotiveForce: 12,
    },
    { id: 4, _type: "wire", a: { x: 4, y: 0 }, b: { x: 5, y: 0 } },
    { id: 5, _type: "wire", a: { x: 5, y: 0 }, b: { x: 6, y: 0 } },
    { id: 6, _type: "wire", a: { x: 6, y: 0 }, b: { x: 6, y: 3 } },
    { id: 7, _type: "wire", a: { x: 6, y: 3 }, b: { x: 3, y: 3 } },
    { _type: "resistor", a: { x: 3, y: 3 }, b: { x: 2, y: 3 }, resistance: 7, id: 8 },
    { id: 9, _type: "wire", a: { x: 2, y: 3 }, b: { x: 0, y: 3 } },
    { id: 10, _type: "wire", a: { x: 0, y: 3 }, b: { x: 0, y: 0 } },
    { id: 11, _type: "wire", a: { x: 2, y: 0 }, b: { x: 2, y: 1 } },
    { id: 12, _type: "wire", a: { x: 2, y: 1 }, b: { x: 5, y: 1 } },
    { id: 13, _type: "wire", a: { x: 5, y: 1 }, b: { x: 5, y: 0 } },
  ];

  const simulation = new SimpleSimulator(components);

  const error = simulation.validateSchema();
  expect(error).toBe("idealWire");
});

test("closed loop with ideal wire", () => {
  const components: ElectricalComponentWithID[] = [
    {
      id: 0,
      _type: "source",
      plus: { x: 0, y: 0 },
      minus: { x: 1, y: 0 },
      internalResistance: 0,
      electromotiveForce: 12,
    },

    { id: 1, _type: "wire", a: { x: 1, y: 0 }, b: { x: 5, y: 0 } },
    { id: 2, _type: "wire", a: { x: 5, y: 0 }, b: { x: 5, y: 2 } },

    { id: 3, _type: "ampermeter", a: { x: 5, y: 2 }, b: { x: 4, y: 2 }, currency: "unknown" },

    { id: 4, _type: "wire", a: { x: 4, y: 2 }, b: { x: 3, y: 2 } },

    { _type: "resistor", a: { x: 3, y: 2 }, b: { x: 2, y: 2 }, resistance: 0, id: 5 },

    { id: 6, _type: "wire", a: { x: 2, y: 2 }, b: { x: 0, y: 2 } },

    { id: 7, _type: "wire", a: { x: 0, y: 2 }, b: { x: 0, y: 0 } },

    { id: 8, _type: "wire", a: { x: 2, y: 2 }, b: { x: 2, y: 3 } },

    { id: 9, _type: "voltmeter", a: { x: 2, y: 3 }, b: { x: 3, y: 3 }, voltage: "unknown" },

    { id: 10, _type: "wire", a: { x: 3, y: 3 }, b: { x: 3, y: 2 } },
  ];

  const simulation = new SimpleSimulator(components);

  const error = simulation.validateSchema();
  expect(error).toBe("idealWire");
});

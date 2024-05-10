import { expect, test } from "vitest";
import { SimpleSimulator } from "../simulator";
import { Ampermeter } from "../types";

test.skip("simple scheme with voltmeter only", () => {
  const u = 220;
  const r = 110;

  const simulator = new SimpleSimulator([]);
  // Источник, у которого плюс расположен в точке (0, 0).
  // Минус -- в точке (-1, 0)
  simulator.addComponent({
    _type: "source",
    plus: { x: 0, y: 0 },
    minus: { x: -1, y: 0 },
    electromotiveForce: u, // 220 В
    internalResistance: r, // 100 Ом
  });

  simulator.addComponent({
    _type: "wire",
    a: { x: -1, y: 0 },
    b: { x: -1, y: 5 },
  });
  simulator.addComponent({
    _type: "ampermeter",
    a: { x: -1, y: 5 },
    b: { x: 0, y: 5 },
    currency: "unknown",
  });
  simulator.addComponent({
    _type: "wire",
    a: { x: 0, y: 5 },
    b: { x: 0, y: 0 },
  });

  const ampermeter = simulator.getAllComponents().find((it) => it._type == "ampermeter") as Ampermeter;
  expect(ampermeter.currency).toBe(u / r);
});

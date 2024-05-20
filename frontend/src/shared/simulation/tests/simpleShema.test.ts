import { expect, test } from "vitest";
import { SimpleSimulator } from "../simulator";


test("simple scheme with ampermeter and voltmeter only", () => {
    let expectedCurrent = {currency: 4, voltage: 0}
    const simulator = new SimpleSimulator([]);

    simulator.addComponent({ _type: "wire", a: { x: 0, y: 0 }, b: { x: 3, y: 0 }, id: 5 });

    simulator.addComponent({ _type: "wire", a: { x: 8, y: 0 }, b: { x: 4, y: 0 }, id: 6 });

    simulator.addComponent({ _type: "wire", a: { x: 8, y: 2 }, b: { x: 8, y: 0 }, id: 7 });

    simulator.addComponent({ _type: "wire", a: { x: 8, y: 5 }, b: { x: 8, y: 3 }, id: 9 });

    simulator.addComponent({ _type: "wire", a: { x: 5, y: 5 }, b: { x: 8, y: 5 }, id: 10 });

    simulator.addComponent({ _type: "wire", a: { x: 4, y: 5 }, b: { x: 5, y: 5 }, id: 11 });

    simulator.addComponent({ _type: "wire", a: { x: 1, y: 5 }, b: { x: 2, y: 5 }, id: 12 });

    simulator.addComponent({ _type: "wire", a: { x: 0, y: 5 }, b: { x: 1, y: 5 }, id: 13 });

    simulator.addComponent({ _type: "wire", a: { x: 0, y: 0 }, b: { x: 0, y: 5 }, id: 15 });


    simulator.addComponent({
        _type: "sourceDC",
        minus: { x: 3, y: 0 },
        plus: { x: 4, y: 0 },
        electromotiveForce: 20,
        id: 1,
    });

    simulator.addComponent({ _type: "ampermeter", a: { x: 8, y: 3 }, b: { x: 8, y: 2 }, currency: "unknown", id: 4 });

    simulator.addComponent({ _type: "resistor", a: { x: 2, y: 5 }, b: { x: 4, y: 5 }, resistance: 10, id: 20 });



    const current = simulator.getMeasurementsForComponent(4);


     expect(current).toStrictEqual(expectedCurrent);
});
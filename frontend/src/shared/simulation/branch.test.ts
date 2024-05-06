import {expect, test} from "vitest";
import {branchesEqual} from "./lib";
import {SimpleSimulator} from "./simulator";
import {Branch, ElectricalComponent} from "./types";

test.skip("not simple scheme with branches", () => {
    const expectedBranches: Branch[] = [
        {
            id: 0,
            a: {x: 0, y: 5},
            b: {x: 4, y: 0},
            components: [
                {_type: "wire", a: {x: 0, y: 4}, b: {x: 0, y: 5}},
                {_type: "source",plus:{x: 0, y: 4},minus:{x: 0, y: 3},electromotiveForce:40,internalResistance:1},
                {_type: "wire", a: {x: 0, y: 2}, b: {x: 0, y: 3}},
                {_type: "resistor", a: {x: 0, y: 1}, b: {x: 0, y: 2}, resistance: 10},
                {_type: "wire", a: {x: 0, y: 0}, b: {x: 0, y: 1}},
                {_type: "wire", a: {x: 4, y: 0}, b: {x: 0, y: 0}},

            ],
        },
        {
            id: 1,
            a: {x: 0, y: 5},
            b: {x: 4, y: 0},
            components: [
                {_type: "wire", a: {x: 2, y: 3}, b: {x: 0, y: 5}},
                {_type: "resistor", a: {x: 2, y: 2}, b: {x: 2, y: 3}, resistance: 10},
                {_type: "wire", a: {x: 4, y: 0}, b: {x: 2, y: 2}},

            ],
        },
        {
            id: 2,
            a: {x: 0, y: 5},
            b: {x: 8, y: 5},

            components: [
                {_type: "wire", a: {x: 0, y: 5}, b: {x: 4, y: 5}},
                {_type: "resistor", a: {x: 4, y: 5}, b: {x: 5, y: 5}, resistance: 5},
                {_type: "wire", a: {x: 5, y: 5}, b: {x: 8, y: 5}},

            ],
        },
        {
            id: 3,
            a: {x: 4, y: 0},
            b: {x: 8, y: 5},
            components: [
                {_type: "wire", a: {x: 4, y: 0}, b: {x: 5, y: 1}},
                {_type: "sourceDC",plus:{x: 5, y: 1},minus:{x: 6, y: 2},electromotiveForce:40},
                {_type: "wire", a: {x: 6, y: 2}, b: {x: 7, y: 3}},
                {_type: "resistor", a: {x: 7, y: 3}, b: {x: 7, y: 4}, resistance: 40},
                {_type: "wire", a: {x: 7, y: 4}, b: {x: 8, y: 5}},
            ],
        },
        {
            id: 4,
            a: {x: 4, y: 0},
            b: {x: 8, y: 5},
            components: [
                {_type: "wire", a: {x: 4, y: 0}, b: {x: 5, y: 0}},
                {_type: "resistor", a: {x: 5, y: 0}, b: {x: 6, y: 0}, resistance: 3},
                {_type: "wire", a: {x: 6, y: 0}, b: {x: 8, y: 0}},
                {_type: "wire", a: {x: 8, y: 0}, b: {x: 8, y: 1}},
                {_type: "source",plus:{x: 8, y: 1},minus:{x: 8, y: 2},electromotiveForce:10,internalResistance:1},
                {_type: "wire", a: {x: 8, y: 2}, b: {x: 8, y: 3}},
                {_type: "resistor", a: {x: 8, y: 3}, b: {x: 8, y: 4}, resistance: 7},
                {_type: "wire", a: {x: 8, y: 4}, b: {x: 8, y: 5}},


            ],
        },

    ];
    const expectedNodes = expectedBranches.flatMap(({a, b}) => [a, b]);

    const components: ElectricalComponent[] = [
        {_type: "wire", a: {x: 0, y: 0}, b: {x: 0, y: 1}},
        {_type: "wire", a: {x: 0, y: 2}, b: {x: 0, y: 3}},
        {_type: "wire", a: {x: 0, y: 4}, b: {x: 0, y: 5}},
        {_type: "wire", a: {x: 0, y: 5}, b: {x: 4, y: 5}},
        {_type: "wire", a: {x: 5, y: 5}, b: {x: 8, y: 5}},
        {_type: "wire", a: {x: 8, y: 4}, b: {x: 8, y: 5}},
        {_type: "wire", a: {x: 8, y: 2}, b: {x: 8, y: 3}},
        {_type: "wire", a: {x: 8, y: 0}, b: {x: 8, y: 1}},
        {_type: "wire", a: {x: 6, y: 0}, b: {x: 8, y: 0}},
        {_type: "wire", a: {x: 4, y: 0}, b: {x: 5, y: 0}},
        {_type: "wire", a: {x: 4, y: 0}, b: {x: 0, y: 0}},
        {_type: "wire", a: {x: 4, y: 0}, b: {x: 2, y: 2}},
        {_type: "wire", a: {x: 2, y: 3}, b: {x: 0, y: 5}},
        {_type: "wire", a: {x: 4, y: 0}, b: {x: 5, y: 1}},
        {_type: "wire", a: {x: 6, y: 2}, b: {x: 7, y: 3}},
        {_type: "wire", a: {x: 7, y: 4}, b: {x: 8, y: 5}},
        {_type: "resistor", a: {x: 4, y: 5}, b: {x: 5, y: 5}, resistance: 5},
        {_type: "resistor", a: {x: 2, y: 2}, b: {x: 2, y: 3}, resistance: 10},
        {_type: "resistor", a: {x: 0, y: 1}, b: {x: 0, y: 2}, resistance: 10},
        {_type: "resistor", a: {x: 5, y: 0}, b: {x: 6, y: 0}, resistance: 3},
        {_type: "resistor", a: {x: 7, y: 3}, b: {x: 7, y: 4}, resistance: 40},
        {_type: "resistor", a: {x: 8, y: 3}, b: {x: 8, y: 4}, resistance: 7},
        {_type: "wire", a: {x: 5, y: 1}, b: {x: 6, y: 2}},
         // {_type: "sourceDC",plus:{x: 5, y: 1},minus:{x: 6, y: 2},electromotiveForce:40},
        {_type: "source",plus:{x: 0, y: 4},minus:{x: 0, y: 3},electromotiveForce:40,internalResistance:1},
        {_type: "source",plus:{x: 8, y: 1},minus:{x: 8, y: 2},electromotiveForce:10,internalResistance:1},


    ];

    const simulator = new SimpleSimulator(components);

    const actualNodes = simulator.findNodes();
    const actualBranches = simulator.findBranches();

    expectedNodes.forEach((node) => expect(actualNodes).toContainEqual(node));
    actualNodes.forEach((node) => expect(expectedNodes).toContainEqual(node));



    expect(actualBranches.length).toBe(expectedBranches.length);




    const actgMatrix = simulator.buildGMatrix(actualNodes, actualBranches);


    console.log(actgMatrix)
    /**
     * Test that `actualBranches` contain all `expectedBranches`,
     * i.e. that `expectedBranches` \subset `actualBranches`.
     */
    expectedBranches.forEach((branch) => {
        const actualBranchWithSameStartingPoints = actualBranches.find((it) => branchesEqual(branch, it));
        expect(actualBranchWithSameStartingPoints).not.toBeUndefined();
    });

    /**
     * Test that `expectedBranches` contain all `actualBranches`,
     * i.e. that `actualBranches` \subset `expectedBranches`.
     */
    actualBranches.forEach((branch) => {
        const expectedBrach = expectedBranches.find((it) => branchesEqual(branch, it));
        expect(expectedBrach).not.toBeUndefined();
    });

    /**
     * And since `actualBranches` \subset `expectedBranches` and
     * `expectedBranches` \subset `actualBranches`, then
     * `expectedBranches` equals to `actualBranches` (as a set)
     */
});

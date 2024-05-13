import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Resistor, WithID } from "@/shared/simulation";
import { Button } from "@/shared/ui/button";
import { UpdateComponentProvider } from "../../model/provider";
import { UpdateResistor } from "../resistor";

function createResistor(resistance: number): WithID<Resistor> {
  return {
    id: 1,
    _type: "resistor",
    a: { x: 0, y: 0 },
    b: { x: 1, y: 0 },
    resistance,
  };
}

describe("Update Resistor Form", () => {
  it("should render defaultValue", () => {
    const resistance = 420;
    const onUpdateComponent = vi.fn().mockImplementation(console.log);
    render(
      <UpdateComponentProvider onUpdateComponent={onUpdateComponent}>
        <UpdateResistor defaultValue={createResistor(resistance)} />
      </UpdateComponentProvider>,
    );
    const input = screen.getByLabelText("Сопротивление");

    expect(input).toHaveProperty("value", String(resistance));
  });

  it("should allow to enter positive resistance", () => {
    const user = userEvent.setup();
    const onUpdateComponent = vi.fn().mockImplementation(console.log);
    const resistance = 200;
    const newResistance = 420;
    render(
      <UpdateComponentProvider onUpdateComponent={onUpdateComponent}>
        <UpdateResistor defaultValue={createResistor(resistance)} />
        <Button type="submit" form="update-resistor-form">
          Submit
        </Button>
      </UpdateComponentProvider>,
    );

    const input = screen.getByLabelText("Сопротивление");

    user.type(input, String(newResistance));
    user.click(screen.getByText("Submit"));
    expect(screen.getByText("Сопротивление").className).not.toMatch("text-destructive");
    expect(onUpdateComponent).toHaveBeenCalledOnce();
  });
});

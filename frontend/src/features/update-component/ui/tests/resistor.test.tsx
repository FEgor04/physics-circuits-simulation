import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { useState } from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
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

const setup = () => {
  const user = userEvent.setup();
  const resistance = 420;
  const onUpdateComponent = vi.fn().mockImplementation(console.log);
  const utils = render(
    <UpdateComponentProvider onUpdateComponent={onUpdateComponent}>
      <UpdateResistor defaultValue={createResistor(resistance)} />
      <button type="submit" form="update-resistor">
        Submit
      </button>
    </UpdateComponentProvider>,
  );
  const input = screen.getByLabelText("Сопротивление");
  const submit = screen.getByText("Submit");
  const label = screen.getByText("Сопротивление");
  return { ...utils, onUpdateComponent, resistance, input, user, submit, label };
};

describe("Update Resistor Form", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should render defaultValue", () => {
    const { input, resistance } = setup();
    expect(input).toHaveProperty("value", String(resistance));
  });

  it("should allow to enter positive resistance", async () => {
    const { input, onUpdateComponent, user, submit, label } = setup();

    await waitFor(() => user.clear(input));
    await waitFor(() => user.type(input, "228"));
    await waitFor(() => user.click(submit));
    expect(label.className).not.toMatch("text-destructive");
    expect(onUpdateComponent).toHaveBeenCalledWith(createResistor(228));
  });

  it("should not allow to enter negative resistance", async () => {
    const { input, onUpdateComponent, user, submit, label } = setup();

    await waitFor(() => user.clear(input));
    await waitFor(() => user.type(input, "-228"));
    await waitFor(() => user.click(submit));
    expect(label.className).toMatch("text-destructive");
    expect(onUpdateComponent).toHaveBeenCalledTimes(0);
  });

  it("should not allow to enter resistance with letters", async () => {
    const { input, onUpdateComponent, user, submit, label } = setup();

    await waitFor(() => user.clear(input));
    await waitFor(() => user.type(input, "asd321das"));
    await waitFor(() => user.click(submit));
    expect(label.className).toMatch("text-destructive");
    expect(onUpdateComponent).toHaveBeenCalledTimes(0);
  });

  it("should not allow to enter resistance with letters on the end", async () => {
    const { input, onUpdateComponent, user, submit, label } = setup();

    await waitFor(() => user.clear(input));
    await waitFor(() => user.type(input, "321as"));
    await waitFor(() => user.click(submit));
    expect(label.className).toMatch("text-destructive");
    expect(onUpdateComponent).toHaveBeenCalledTimes(0);
  });

  it("should update input value when defaultValue changes", async () => {
    const user = userEvent.setup();
    const onUpdateComponent = vi.fn().mockImplementation(console.log);
    render(
      <UpdateComponentProvider onUpdateComponent={onUpdateComponent}>
        <ChangeDefaultValue />
      </UpdateComponentProvider>,
    );
    const input = screen.getByLabelText("Сопротивление");

    await waitFor(() => user.click(screen.getByTestId("change-default-value")));
    expect(input).toHaveProperty("value", "220");
  });
});

function ChangeDefaultValue() {
  const [defaultValue, setDefaultValue] = useState<WithID<Resistor>>(createResistor(200));
  return (
    <>
      <UpdateResistor defaultValue={defaultValue} />
      <Button
        data-testid="change-default-value"
        onClick={() => {
          setDefaultValue(createResistor(220));
        }}
      ></Button>
    </>
  );
}

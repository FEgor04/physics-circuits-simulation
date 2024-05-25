import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { useState } from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { WithID } from "@/shared/simulation";
import { SourceDC } from "@/shared/simulation/types";
import { Button } from "@/shared/ui/button";
import { UpdateComponentProvider } from "../../model/provider";
import { UpdateSourceDC } from "../source-dc";

function createSourceDC(internalResistance: number = 5, currentForce: number = 100): WithID<SourceDC> {
  return {
    id: 1,
    _type: "sourceDC",
    plus: { x: 0, y: 0 },
    minus: { x: 1, y: 0 },
    internalResistance,
    currentForce,
  };
}

const setup = () => {
  const user = userEvent.setup();
  const force = 420;
  const resistance = 5;
  const onUpdateComponent = vi.fn().mockImplementation(console.log);
  const utils = render(
    <UpdateComponentProvider onUpdateComponent={onUpdateComponent}>
      <UpdateSourceDC defaultValue={createSourceDC(resistance, force)} />
      <button type="submit" form="update-source-dc">
        Submit
      </button>
    </UpdateComponentProvider>,
  );
  const forceInput = screen.getByLabelText("Сила тока");
  const forceLabel = screen.getByText("Сила тока");
  const resistanceInput = screen.getByLabelText("Внутреннее сопротивление");
  const resistanceLabel = screen.getByText("Внутреннее сопротивление");
  const submit = screen.getByText("Submit");
  return {
    ...utils,
    onUpdateComponent,
    force,
    user,
    submit,
    resistance,
    forceInput,
    forceLabel,
    resistanceInput,
    resistanceLabel,
  };
};

describe("Update Source DC Form", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should render default value", () => {
    const { forceInput, force, resistanceInput, resistance } = setup();
    expect(forceInput).toHaveProperty("value", String(force));
    expect(resistanceInput).toHaveProperty("value", String(resistance));
  });

  it("should allow to enter positive currentForce", async () => {
    const { forceInput, onUpdateComponent, user, submit, forceLabel, resistance } = setup();

    await waitFor(() => user.clear(forceInput));
    await waitFor(() => user.type(forceLabel, "228"));
    await waitFor(() => user.click(submit));
    expect(forceLabel.className).not.toMatch("text-destructive");
    expect(onUpdateComponent).toHaveBeenCalledWith(createSourceDC(resistance, 228));
  });

  it("should allow to enter negative currentForce", async () => {
    const { onUpdateComponent, user, submit, forceLabel, forceInput, resistance } = setup();

    await waitFor(() => user.clear(forceInput));
    await waitFor(() => user.type(forceInput, "-228"));
    await waitFor(() => user.click(submit));
    expect(forceLabel.className).not.toMatch("text-destructive");
    expect(onUpdateComponent).toHaveBeenCalledWith(createSourceDC(resistance, -228));
  });

  it("should not allow to enter currentForce with letters", async () => {
    const { onUpdateComponent, user, submit, forceLabel, forceInput } = setup();

    await waitFor(() => user.clear(forceInput));
    await waitFor(() => user.type(forceInput, "asd321das"));
    await waitFor(() => user.click(submit));
    expect(forceLabel.className).toMatch("text-destructive");
    expect(onUpdateComponent).toHaveBeenCalledTimes(0);
  });

  it("should not allow to enter currentForce with letters on the end", async () => {
    const { forceInput, onUpdateComponent, user, submit, forceLabel } = setup();

    await waitFor(() => user.clear(forceInput));
    await waitFor(() => user.type(forceInput, "321as"));
    await waitFor(() => user.click(submit));
    expect(forceLabel.className).toMatch("text-destructive");
    expect(onUpdateComponent).toHaveBeenCalledTimes(0);
  });

  it("should update input value when dforceaultValue changes", async () => {
    const user = userEvent.setup();
    const onUpdateComponent = vi.fn().mockImplementation(console.log);
    render(
      <UpdateComponentProvider onUpdateComponent={onUpdateComponent}>
        <UpdateSourceDCChangeDefaultValue />
      </UpdateComponentProvider>,
    );
    const input = screen.getByLabelText("Сила тока");

    await waitFor(() => user.click(screen.getByTestId("UpdateSourceDCChangeDefaultValue")));
    expect(input).toHaveProperty("value", "220");
  });
});

function UpdateSourceDCChangeDefaultValue() {
  const [dforceaultValue, setDforceaultValue] = useState<WithID<SourceDC>>(createSourceDC(100, 200));
  return (
    <>
      <UpdateSourceDC defaultValue={dforceaultValue} />
      <Button
        data-testid="UpdateSourceDCChangeDefaultValue"
        onClick={() => {
          setDforceaultValue(createSourceDC(100, 220));
        }}
      ></Button>
    </>
  );
}

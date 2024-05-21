import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { useState } from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { WithID } from "@/shared/simulation";
import { SourceDC } from "@/shared/simulation/types";
import { Button } from "@/shared/ui/button";
import { UpdateComponentProvider } from "../../model/provider";
import { UpdateSourceDC } from "../source-dc";

function createSourceDC(internalResistance: number = 5, electromotiveForce: number = 100): WithID<SourceDC> {
  return {
    id: 1,
    _type: "sourceDC",
    plus: { x: 0, y: 0 },
    minus: { x: 1, y: 0 },
    internalResistance,
    electromotiveForce,
  };
}

const setup = () => {
  const user = userEvent.setup();
  const ef = 420;
  const resistance = 5;
  const onUpdateComponent = vi.fn().mockImplementation(console.log);
  const utils = render(
    <UpdateComponentProvider onUpdateComponent={onUpdateComponent}>
      <UpdateSourceDC defaultValue={createSourceDC(resistance, ef)} />
      <button type="submit" form="update-source-dc">
        Submit
      </button>
    </UpdateComponentProvider>,
  );
  const efInput = screen.getByLabelText("Электродвижущая сила");
  const efLabel = screen.getByText("Электродвижущая сила");
  const resistanceInput = screen.getByLabelText("Внутреннее сопротивление");
  const resistanceLabel = screen.getByText("Внутреннее сопротивление");
  const submit = screen.getByText("Submit");
  return {
    ...utils,
    onUpdateComponent,
    ef,
    user,
    submit,
    resistance,
    efInput,
    efLabel,
    resistanceInput,
    resistanceLabel,
  };
};

describe("Update Source DC Form", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should render defaultValue", () => {
    const { efInput, ef, resistanceInput, resistance } = setup();
    expect(efInput).toHaveProperty("value", String(ef));
    expect(resistanceInput).toHaveProperty("value", String(resistance));
  });

  it("should allow to enter positive electromotiveForce", async () => {
    const { efInput, onUpdateComponent, user, submit, efLabel, resistance } = setup();

    await waitFor(() => user.clear(efInput));
    await waitFor(() => user.type(efLabel, "228"));
    await waitFor(() => user.click(submit));
    expect(efLabel.className).not.toMatch("text-destructive");
    expect(onUpdateComponent).toHaveBeenCalledWith(createSourceDC(resistance, 228));
  });

  it("should allow to enter negative electromotiveForce", async () => {
    const { onUpdateComponent, user, submit, efLabel, efInput, resistance } = setup();

    await waitFor(() => user.clear(efInput));
    await waitFor(() => user.type(efInput, "-228"));
    await waitFor(() => user.click(submit));
    expect(efLabel.className).not.toMatch("text-destructive");
    expect(onUpdateComponent).toHaveBeenCalledWith(createSourceDC(resistance, -228));
  });

  it("should not allow to enter electromotiveForce with letters", async () => {
    const { onUpdateComponent, user, submit, efLabel, efInput } = setup();

    await waitFor(() => user.clear(efInput));
    await waitFor(() => user.type(efInput, "asd321das"));
    await waitFor(() => user.click(submit));
    expect(efLabel.className).toMatch("text-destructive");
    expect(onUpdateComponent).toHaveBeenCalledTimes(0);
  });

  it("should not allow to enter electromotiveForce with letters on the end", async () => {
    const { efInput, onUpdateComponent, user, submit, efLabel } = setup();

    await waitFor(() => user.clear(efInput));
    await waitFor(() => user.type(efInput, "321as"));
    await waitFor(() => user.click(submit));
    expect(efLabel.className).toMatch("text-destructive");
    expect(onUpdateComponent).toHaveBeenCalledTimes(0);
  });

  it("should update input value when defaultValue changes", async () => {
    const user = userEvent.setup();
    const onUpdateComponent = vi.fn().mockImplementation(console.log);
    render(
      <UpdateComponentProvider onUpdateComponent={onUpdateComponent}>
        <UpdateSourceDCChangeDefaultValue />
      </UpdateComponentProvider>,
    );
    const input = screen.getByLabelText("Электродвижущая сила");

    await waitFor(() => user.click(screen.getByTestId("update-source-dc-default-value")));
    expect(input).toHaveProperty("value", "220");
  });
});

function UpdateSourceDCChangeDefaultValue() {
  const [defaultValue, setDefaultValue] = useState<WithID<SourceDC>>(createSourceDC(100, 200));
  return (
    <>
      <UpdateSourceDC defaultValue={defaultValue} />
      <Button
        data-testid="update-source-dc-default-value"
        onClick={() => {
          setDefaultValue(createSourceDC(100, 220));
        }}
      ></Button>
    </>
  );
}

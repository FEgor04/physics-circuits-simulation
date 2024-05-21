import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { useState } from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { WithID } from "@/shared/simulation";
import { SourceDC } from "@/shared/simulation/types";
import { Button } from "@/shared/ui/button";
import { UpdateComponentProvider } from "../../model/provider";
import { UpdateSourceDC } from "../source-dc";

function createSourceDC(electromotiveForce: number = 100): WithID<SourceDC> {
  return {
    id: 1,
    _type: "sourceDC",
    plus: { x: 0, y: 0 },
    minus: { x: 1, y: 0 },
    internalResistance: 5,
    electromotiveForce,
  };
}

const setup = () => {
  const user = userEvent.setup();
  const ef = 420;
  const onUpdateComponent = vi.fn().mockImplementation(console.log);
  const utils = render(
    <UpdateComponentProvider onUpdateComponent={onUpdateComponent}>
      <UpdateSourceDC defaultValue={createSourceDC(ef)} />
      <button type="submit" form="update-source-dc">
        Submit
      </button>
    </UpdateComponentProvider>,
  );
  const input = screen.getByLabelText("Электродвижущая сила");
  const submit = screen.getByText("Submit");
  const label = screen.getByText("Электродвижущая сила");
  return { ...utils, onUpdateComponent, ef, input, user, submit, label };
};

describe("Update Source DC Form", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should render defaultValue", () => {
    const { input, ef } = setup();
    expect(input).toHaveProperty("value", String(ef));
  });

  it("should allow to enter positive electromotiveForce", async () => {
    const { input, onUpdateComponent, user, submit, label } = setup();

    await waitFor(() => user.clear(input));
    await waitFor(() => user.type(input, "228"));
    await waitFor(() => user.click(submit));
    expect(label.className).not.toMatch("text-destructive");
    expect(onUpdateComponent).toHaveBeenCalledWith(createSourceDC(228));
  });

  it("should allow to enter negative electromotiveForce", async () => {
    const { input, onUpdateComponent, user, submit, label } = setup();

    await waitFor(() => user.clear(input));
    await waitFor(() => user.type(input, "-228"));
    await waitFor(() => user.click(submit));
    expect(label.className).not.toMatch("text-destructive");
    expect(onUpdateComponent).toHaveBeenCalledWith(createSourceDC(-228));
  });

  it("should not allow to enter electromotiveForce with letters", async () => {
    const { input, onUpdateComponent, user, submit, label } = setup();

    await waitFor(() => user.clear(input));
    await waitFor(() => user.type(input, "asd321das"));
    await waitFor(() => user.click(submit));
    expect(label.className).toMatch("text-destructive");
    expect(onUpdateComponent).toHaveBeenCalledTimes(0);
  });

  it("should not allow to enter electromotiveForce with letters on the end", async () => {
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
        <UpdateSourceDCChangeDefaultValue />
      </UpdateComponentProvider>,
    );
    const input = screen.getByLabelText("Электродвижущая сила");

    await waitFor(() => user.click(screen.getByTestId("update-source-dc-default-value")));
    expect(input).toHaveProperty("value", "220");
  });
});

function UpdateSourceDCChangeDefaultValue() {
  const [defaultValue, setDefaultValue] = useState<WithID<SourceDC>>(createSourceDC(200));
  return (
    <>
      <UpdateSourceDC defaultValue={defaultValue} />
      <Button
        data-testid="update-source-dc-default-value"
        onClick={() => {
          setDefaultValue(createSourceDC(220));
        }}
      ></Button>
    </>
  );
}

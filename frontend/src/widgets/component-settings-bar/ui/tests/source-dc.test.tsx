import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, describe, it, vi } from "vitest";
import { DeleteComponentProvider } from "@/features/delete-component";
import { UpdateComponentProvider } from "@/features/update-component";
import { SourceDC, WithID } from "@/shared/simulation";
import { SourceDCSettings } from "../source-dc-settings";

const setup = () => {
  const component: WithID<SourceDC> = {
    _type: "sourceDC",
    id: 1,
    plus: { x: 0, y: 0 },
    minus: { x: 1, y: 0 },
    currentForce: 10,
    internalResistance: 5,
  };
  const user = userEvent.setup();
  const onDeleteComponent = vi.fn().mockImplementation(console.log);
  const onUpdateComponent = vi.fn().mockImplementation(console.log);
  const utils = render(
    <DeleteComponentProvider onDeleteComponent={onDeleteComponent}>
      <UpdateComponentProvider onUpdateComponent={onUpdateComponent}>
        <SourceDCSettings component={component} />
      </UpdateComponentProvider>
    </DeleteComponentProvider>,
  );
  const submit = screen.getByText("Сохранить");
  return {
    ...utils,
    component,
    submit,
    user,
    onUpdateComponent,
    onDeleteComponent,
  };
};

describe("Source DC settings bar", () => {
  it("calls onUpdate on submit click", async () => {
    const { submit, onUpdateComponent, user, onDeleteComponent } = setup();
    await waitFor(() => user.click(submit));
    expect(onUpdateComponent).toHaveBeenCalledOnce();
    expect(onDeleteComponent).toHaveBeenCalledTimes(0);
  });
});

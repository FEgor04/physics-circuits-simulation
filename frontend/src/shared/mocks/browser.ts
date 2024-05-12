import { setupWorker } from "msw/browser";
import { getPhysicsCircuitsSimulationEngineMock } from "../api/index.msw";

export async function setupMocks(): Promise<void> {
  if (import.meta.env.DEV) {
    const mock = setupWorker(...getPhysicsCircuitsSimulationEngineMock());
    await mock.start();
  }
  return;
}

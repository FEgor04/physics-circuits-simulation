import { afterAll, afterEach, beforeAll, describe, it, expect } from "vitest";
import { setupServer } from "msw/node";
import { HttpResponse, http } from "msw";
import { getCurrentUser } from ".";

export const restHandlers = [http.get("/api/users/me", () => HttpResponse.json("No JWT token", { status: 401 }))];

const server = setupServer(...restHandlers);

describe("authentication error handling", () => {
  beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());
  it("returns axios error when 401", async () => {
    await expect(getCurrentUser).rejects.toThrowError();
  });
});

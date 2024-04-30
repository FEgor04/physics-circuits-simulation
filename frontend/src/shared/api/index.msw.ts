/**
 * Generated by orval v6.27.1 🍺
 * Do not edit manually.
 * Physics circuits simulation Engine
 * Sample API of the Physics project engine
 * OpenAPI spec version: 1.0.0
 */
import { faker } from "@faker-js/faker";
import { HttpResponse, delay, http } from "msw";
import type { GetUserResponse, JwtResponse } from "./index.schemas";

export const getRegisterResponseMock = (
  overrideResponse: any = {},
): JwtResponse => ({
  accessToken: faker.word.sample(),
  id: faker.number.int({ min: undefined, max: undefined }),
  name: faker.word.sample(),
  refreshToken: faker.word.sample(),
  username: faker.word.sample(),
  ...overrideResponse,
});

export const getRegisterAdminResponseMock = (
  overrideResponse: any = {},
): JwtResponse => ({
  accessToken: faker.word.sample(),
  id: faker.number.int({ min: undefined, max: undefined }),
  name: faker.word.sample(),
  refreshToken: faker.word.sample(),
  username: faker.word.sample(),
  ...overrideResponse,
});

export const getRefreshResponseMock = (
  overrideResponse: any = {},
): JwtResponse => ({
  accessToken: faker.word.sample(),
  id: faker.number.int({ min: undefined, max: undefined }),
  name: faker.word.sample(),
  refreshToken: faker.word.sample(),
  username: faker.word.sample(),
  ...overrideResponse,
});

export const getLoginResponseMock = (
  overrideResponse: any = {},
): JwtResponse => ({
  accessToken: faker.word.sample(),
  id: faker.number.int({ min: undefined, max: undefined }),
  name: faker.word.sample(),
  refreshToken: faker.word.sample(),
  username: faker.word.sample(),
  ...overrideResponse,
});

export const getGetUserByIdResponseMock = (
  overrideResponse: any = {},
): GetUserResponse => ({
  email: faker.word.sample(),
  id: faker.number.int({ min: undefined, max: undefined }),
  name: faker.word.sample(),
  ...overrideResponse,
});

export const getGetCurrentUserResponseMock = (
  overrideResponse: any = {},
): GetUserResponse => ({
  email: faker.word.sample(),
  id: faker.number.int({ min: undefined, max: undefined }),
  name: faker.word.sample(),
  ...overrideResponse,
});

export const getRegisterMockHandler = (overrideResponse?: JwtResponse) => {
  return http.post("*/auth/register", async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse ? overrideResponse : getRegisterResponseMock(),
      ),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  });
};

export const getRegisterAdminMockHandler = (overrideResponse?: JwtResponse) => {
  return http.post("*/auth/register/admin", async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse ? overrideResponse : getRegisterAdminResponseMock(),
      ),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  });
};

export const getRefreshMockHandler = (overrideResponse?: JwtResponse) => {
  return http.post("*/auth/refresh", async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse ? overrideResponse : getRefreshResponseMock(),
      ),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  });
};

export const getLoginMockHandler = (overrideResponse?: JwtResponse) => {
  return http.post("*/auth/login", async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse ? overrideResponse : getLoginResponseMock(),
      ),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  });
};

export const getGetUserByIdMockHandler = (
  overrideResponse?: GetUserResponse,
) => {
  return http.get("*/users/:id", async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse ? overrideResponse : getGetUserByIdResponseMock(),
      ),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  });
};

export const getGetCurrentUserMockHandler = (
  overrideResponse?: GetUserResponse,
) => {
  return http.get("*/users/me", async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse ? overrideResponse : getGetCurrentUserResponseMock(),
      ),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  });
};
export const getPhysicsCircuitsSimulationEngineMock = () => [
  getRegisterMockHandler(),
  getRegisterAdminMockHandler(),
  getRefreshMockHandler(),
  getLoginMockHandler(),
  getGetUserByIdMockHandler(),
  getGetCurrentUserMockHandler(),
];

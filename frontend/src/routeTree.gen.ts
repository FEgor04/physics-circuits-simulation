/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from "./app/routes/__root";
import { Route as SignupImport } from "./app/routes/signup";
import { Route as SigninImport } from "./app/routes/signin";
import { Route as EmbedImport } from "./app/routes/embed";
import { Route as AuthenticatedRouteImport } from "./app/routes/_authenticated/route";
import { Route as IndexImport } from "./app/routes/index";
import { Route as AuthenticatedSchemesIndexImport } from "./app/routes/_authenticated/schemes.index";
import { Route as AuthenticatedSchemesSchemeImport } from "./app/routes/_authenticated/schemes.$scheme";

// Create/Update Routes

const SignupRoute = SignupImport.update({
  path: "/signup",
  getParentRoute: () => rootRoute,
} as any);

const SigninRoute = SigninImport.update({
  path: "/signin",
  getParentRoute: () => rootRoute,
} as any);

const EmbedRoute = EmbedImport.update({
  path: "/embed",
  getParentRoute: () => rootRoute,
} as any);

const AuthenticatedRouteRoute = AuthenticatedRouteImport.update({
  id: "/_authenticated",
  getParentRoute: () => rootRoute,
} as any);

const IndexRoute = IndexImport.update({
  path: "/",
  getParentRoute: () => rootRoute,
} as any);

const AuthenticatedSchemesIndexRoute = AuthenticatedSchemesIndexImport.update({
  path: "/schemes/",
  getParentRoute: () => AuthenticatedRouteRoute,
} as any);

const AuthenticatedSchemesSchemeRoute = AuthenticatedSchemesSchemeImport.update(
  {
    path: "/schemes/$scheme",
    getParentRoute: () => AuthenticatedRouteRoute,
  } as any,
);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      id: "/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    "/_authenticated": {
      id: "/_authenticated";
      path: "";
      fullPath: "";
      preLoaderRoute: typeof AuthenticatedRouteImport;
      parentRoute: typeof rootRoute;
    };
    "/embed": {
      id: "/embed";
      path: "/embed";
      fullPath: "/embed";
      preLoaderRoute: typeof EmbedImport;
      parentRoute: typeof rootRoute;
    };
    "/signin": {
      id: "/signin";
      path: "/signin";
      fullPath: "/signin";
      preLoaderRoute: typeof SigninImport;
      parentRoute: typeof rootRoute;
    };
    "/signup": {
      id: "/signup";
      path: "/signup";
      fullPath: "/signup";
      preLoaderRoute: typeof SignupImport;
      parentRoute: typeof rootRoute;
    };
    "/_authenticated/schemes/$scheme": {
      id: "/_authenticated/schemes/$scheme";
      path: "/schemes/$scheme";
      fullPath: "/schemes/$scheme";
      preLoaderRoute: typeof AuthenticatedSchemesSchemeImport;
      parentRoute: typeof AuthenticatedRouteImport;
    };
    "/_authenticated/schemes/": {
      id: "/_authenticated/schemes/";
      path: "/schemes";
      fullPath: "/schemes";
      preLoaderRoute: typeof AuthenticatedSchemesIndexImport;
      parentRoute: typeof AuthenticatedRouteImport;
    };
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  AuthenticatedRouteRoute: AuthenticatedRouteRoute.addChildren({
    AuthenticatedSchemesSchemeRoute,
    AuthenticatedSchemesIndexRoute,
  }),
  EmbedRoute,
  SigninRoute,
  SignupRoute,
});

/* prettier-ignore-end */

// eslint-disable-next-line @conarti/feature-sliced/public-api
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { setupMocks } from "@/shared/mocks/browser";
import { Toaster } from "@/shared/ui/sonner";
import { routeTree } from "@/routeTree.gen";

const queryClient = new QueryClient();

const router = createRouter({ routeTree, context: { queryClient } });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

setupMocks().then(() =>
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster position="bottom-center" />
      </QueryClientProvider>
    </React.StrictMode>,
  ),
);
